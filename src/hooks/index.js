import { useState, useEffect, useRef, useCallback } from "react"

const DELAY = 200
const SUCCESS_RATE = 0.8

// from KCD's implementation https://github.com/kentcdodds/react-hooks/blob/main/src/final/02.extra-4.js
function useLocalStorageState(
    key,
    defaultValue = "",
    { serialize = JSON.stringify, deserialize = JSON.parse } = {}
) {
    const [state, setState] = useState(() => {
        const valueInLocalStorage = window.localStorage.getItem(key)
        if (valueInLocalStorage) {
            // the try/catch is here in case the localStorage value was set before
            // we had the serialization in place (like we do in previous extra credits)
            try {
                return deserialize(valueInLocalStorage)
            } catch (error) {
                window.localStorage.removeItem(key)
            }
        }
        return typeof defaultValue === "function"
            ? defaultValue()
            : defaultValue
    })

    const prevKeyRef = useRef(key)

    // Check the example at src/examples/local-state-key-change.js to visualize a key change
    useEffect(() => {
        const prevKey = prevKeyRef.current
        if (prevKey !== key) {
            window.localStorage.removeItem(prevKey)
        }
        prevKeyRef.current = key
        window.localStorage.setItem(key, serialize(state))
    }, [key, state, serialize])

    return [state, setState]
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

        const timer = setTimeout(() => {
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
        }, DELAY)

        return () => clearTimeout(timer)
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
