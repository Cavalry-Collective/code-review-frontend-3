import { useState, useEffect, useCallback } from "react"
import useLocalStorageState from "./useLocalStorageState"

const DELAY = 500
const SUCCESS_RATE = 0.8

function wait(ms, value) {
    return new Promise(resolve => setTimeout(resolve, DELAY, value))
}

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
            const willReject = Math.random() > SUCCESS_RATE
            const percent = Math.round((1.0 - SUCCESS_RATE) * 100)
            if (willReject) {
                const errorMessage = `Mock Server randomly rejects ${percent}% of the time`
                setStatus({
                    ...status,
                    statusType: statusTypes.error,
                    errorMessage,
                })
                return
            }

            const { action, payLoad } = status

            if (action === actionTypes.remove) {
                setToDoItems(toDoItems =>
                    toDoItems.filter(item => item.id !== payLoad.itemId)
                )
            } else if (action === actionTypes.add) {
                setToDoItems(toDoItems => [...toDoItems, payLoad.item])
            } else if (action === actionTypes.update) {
                setToDoItems(toDoItems =>
                    toDoItems.map(oldItem =>
                        oldItem.id === payLoad.item.id ? payLoad.item : oldItem
                    )
                )
            } else {
                throw new Error(`Unhandle actionType: ${action}`)
            }

            setStatus({
                ...status,
                errorMessage: null,
                statusType: statusTypes.success,
            })
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
