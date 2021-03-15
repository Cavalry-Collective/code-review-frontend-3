import { useState, useEffect, useCallback } from "react"
import useLocalStorageState from "./useLocalStorageState"
import { sometimesRejects } from "./utils"

const DELAY = 500

const wait = () => new Promise(resolve => setTimeout(resolve, DELAY))

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
}
const INITIAL_STATUS = {
    statusType: statusTypes.idle,
    action: null,
    payLoad: null,
    errorMessage: null,
}

function useMockFetchToDo() {
    const [toDoItems, setToDoItems] = useLocalStorageState("toDoList", [])
    const [status, setStatus] = useState(INITIAL_STATUS)

    useEffect(() => {
        if (status.statusType !== statusTypes.loading) {
            return
        }

        const doAction = async () => {
            await wait()

            const { isRejected, errorMessage } = sometimesRejects()
            if (isRejected) {
                // prettier-ignore
                setStatus({ ...status, statusType: statusTypes.error, errorMessage })
                return
            }

            const { action, payLoad } = status

            if (action === actionTypes.remove) {
                setToDoItems(toDoItems => mockRemove(toDoItems, payLoad.itemId))
            } else if (action === actionTypes.add) {
                setToDoItems(toDoItems => mockAdd(toDoItems, payLoad.item))
            } else if (action === actionTypes.update) {
                setToDoItems(toDoItems => mockUpdate(toDoItems, payLoad.item))
            } else {
                throw new Error(`Unhandle actionType: ${action}`)
            }

            // prettier-ignore
            setStatus({ ...status, errorMessage: null, statusType: statusTypes.success })
        }

        doAction()
    }, [status, setStatus, setToDoItems])

    const removeItem = itemId => {
        setStatus({
            errorMessage: null,
            statusType: statusTypes.loading,
            action: actionTypes.remove,
            payLoad: { itemId },
        })
    }

    const addItem = useCallback(
        item => {
            setStatus({
                errorMessage: null,
                statusType: statusTypes.loading,
                action: actionTypes.add,
                payLoad: { item },
            })
        },
        [setStatus]
    )

    const updateItem = useCallback(
        item => {
            setStatus({
                errorMessage: null,
                statusType: statusTypes.loading,
                action: actionTypes.update,
                payLoad: { item },
            })
        },
        [setStatus]
    )

    const retry = useCallback(() => {
        setStatus({
            ...status,
            statusType: statusTypes.loading,
            errorMessage: null,
        })
    }, [status, setStatus])

    const reset = useCallback(() => {
        setStatus(INITIAL_STATUS)
    }, [setStatus])

    const { statusType, errorMessage } = status
    return [
        toDoItems,
        { updateItem, addItem, removeItem, reset, retry },
        {
            isLoading: statusType === statusTypes.loading,
            isSuccess: statusType === statusTypes.success,
            isError: statusType === statusTypes.error,
            isIdle: statusType === statusTypes.idle,
            errorMessage: errorMessage,
            statusType,
        },
    ]
}

export { useLocalStorageState, useMockFetchToDo }
