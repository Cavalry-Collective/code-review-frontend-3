import { useState, useEffect, useRef } from "react"

const DELAY = 5000
const SUCCESS_RATE = 0.9

let data = [
    {
        id: "1615663714830",
        title: "Eat breakfast",
        completed: false,
    },
    {
        id: "1615663714831",
        title: "Do laundry",
        completed: true,
    },
    {
        id: "1615663714832",
        title: "Take out the trash",
        completed: false,
    },
    {
        id: "1615663714833",
        title: "Write a blog post",
        completed: true,
    },
    {
        id: "1615663714834",
        title: "Go out for a walk",
        completed: false,
    },
]

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
    const [toDoItems, setToDoItems] = useLocalStorageState(
        "toDoList",
        () => data
    )
    const [status, setStatus] = useState(INITIAL_STATUS)

    useEffect(() => {
        if (status.statusType !== statusTypes.loading) {
            return
        }
        const timer = setTimeout(() => {
            if (Math.random() > SUCCESS_RATE) {
                setStatus({
                    ...status,
                    statusType: statusTypes.error,
                    errorMessage:
                        "Mock Server randomly rejected 10% of the time",
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

    const addItem = item => {
        setStatus({
            errorMessage: null,
            statusType: statusTypes.loading,
            action: actionTypes.add,
            payLoad: { item },
        })
    }

    const updateItem = item => {
        setStatus({
            errorMessage: null,
            statusType: statusTypes.loading,
            action: actionTypes.update,
            payLoad: { item },
        })
    }

    const retry = () => {
        setStatus({
            ...status,
            statusType: statusTypes.loading,
            errorMessage: null,
        })
    }

    const reset = () => {
        setStatus(INITIAL_STATUS)
    }

    const { statusType, error } = status
    return [
        toDoItems,
        { updateItem, addItem, removeItem, reset, retry },
        {
            isLoading: statusType === statusTypes.loading,
            isSuccess: statusType === statusTypes.success,
            isError: statusType === statusType.error,
            isIdle: statusType === statusType.idle,
            error: error,
        },
    ]
}

export { useLocalStorageState, useMockFetchToDo }
