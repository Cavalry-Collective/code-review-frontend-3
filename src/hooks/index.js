import { useState, useEffect, useRef } from "react"

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

function useMockFetchToDo() {
    const [state, setState] = useLocalStorageState("toDoList", () => data)

    return [state, setState]
}

export { useLocalStorageState, useMockFetchToDo }
