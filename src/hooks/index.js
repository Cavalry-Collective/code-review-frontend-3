import { useEffect, useReducer } from "react"
import useLocalStorageState from "./useLocalStorageState"
import { sometimesRejects, wait } from "./utils"

const mockRemove = (toDoItems, itemId) =>
    toDoItems.filter(item => item.id !== itemId)

const mockAdd = (toDoItems, item) => [...toDoItems, item]

const mockUpdate = (toDoItems, item) =>
    toDoItems.map(oldItem => (oldItem.id === item.id ? item : oldItem))

const statusTypes = {
    loading: "loading",
    error: "error",
    success: "success",
    idle: "idle",
}

const actionTypes = {
    add: "add",
    remove: "remove",
    update: "update",
    finish: "finish",
    reject: "reject",
    retry: "retry",
    reset: "reset",
}

const INITIAL_STATUS = {
    statusType: statusTypes.idle,
    action: null,
    payLoad: null,
    errorMessage: null,
}

const statusReducer = (previousStatus, action) => {
    const isToStartAction = [
        actionTypes.remove,
        actionTypes.add,
        actionTypes.update,
    ].includes(action.type)

    if (isToStartAction) {
        const loadingParams = {
            errorMessage: null,
            statusType: statusTypes.loading,
            payLoad: action.payLoad,
            action: action.type,
        }
        return loadingParams
    }

    if (action.type === actionTypes.retry) {
        return {
            ...previousStatus,
            statusType: statusTypes.loading,
            errorMessage: null,
        }
    }

    if (action.type === actionTypes.reset) {
        return INITIAL_STATUS
    }

    if (action.type === actionTypes.finish) {
        return {
            ...previousStatus,
            errorMessage: null,
            statusType: statusTypes.success,
        }
    }

    if (action.type === actionTypes.reject) {
        return {
            ...previousStatus,
            statusType: statusTypes.error,
            errorMessage: action.payLoad.errorMessage,
        }
    }

    throw new Error(`Unhandle actionType: ${action}`)
}

const fulfillRequest = (status, setItems) => {
    const { action, payLoad } = status

    if (action === actionTypes.remove) {
        setItems(items => mockRemove(items, payLoad.itemId))
    } else if (action === actionTypes.add) {
        setItems(items => mockAdd(items, payLoad.item))
    } else if (action === actionTypes.update) {
        setItems(items => mockUpdate(items, payLoad.item))
    } else {
        throw new Error(`Unhandle actionType: ${action}`)
    }
}

function useMockFetchToDo() {
    const [toDoItems, setToDoItems] = useLocalStorageState("toDoList", [])
    const [status, statusDispatch] = useReducer(statusReducer, INITIAL_STATUS)

    useEffect(() => {
        if (status.statusType !== statusTypes.loading) {
            return
        }

        const doAction = async () => {
            await wait()

            const { isRejected, errorMessage } = sometimesRejects()
            if (isRejected) {
                statusDispatch({
                    type: actionTypes.reject,
                    payLoad: { errorMessage },
                })
                return
            }

            fulfillRequest(status, setToDoItems)
            statusDispatch({ type: actionTypes.finish })
        }

        doAction()
    }, [status, statusDispatch, setToDoItems])

    const removeItem = itemId =>
        statusDispatch({ type: actionTypes.remove, payLoad: { itemId } })

    const addItem = item =>
        statusDispatch({ type: actionTypes.add, payLoad: { item } })

    const updateItem = item =>
        statusDispatch({ type: actionTypes.update, payLoad: { item } })

    const retry = () => statusDispatch({ type: actionTypes.retry })

    const reset = () => statusDispatch({ type: actionTypes.reset })

    const { statusType, errorMessage } = status
    return [
        toDoItems,
        { updateItem, addItem, removeItem, reset, retry },
        { errorMessage, statusType },
    ]
}

export { useLocalStorageState, useMockFetchToDo, statusTypes }
