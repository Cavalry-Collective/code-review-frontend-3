import "antd/dist/antd.css"
import { useState, useEffect } from "react"
import { List } from "antd"
import NewToDoForm from "./components/NewToDoForm"
import ToDoListItem from "./components/ToDoListItem"
import { useMockFetchToDo } from "./hooks/"
import {
    loadingNotification,
    errorNotification,
    successNotification,
} from "./components/notifications"
import AppLayout from "./AppLayout"

function App() {
    let [
        toDoItems,
        { updateItem, addItem, removeItem, reset },
        { isLoading, isSuccess, isError, errorMessage },
    ] = useMockFetchToDo()
    let [currentEditModeItemId, setCurrentEditModeItemId] = useState(null)
    let [currentTrashToolTipOpen, setCurrentTrashToolTipOpen] = useState(null)

    useEffect(() => {
        if (isLoading) {
            loadingNotification()
        } else if (isError) {
            errorNotification(errorMessage, reset)
        } else if (isSuccess) {
            successNotification(reset)
        }
    }, [isLoading, isError, isSuccess, errorMessage, reset])

    const listItemRenderFunction = item => {
        return (
            <ToDoListItem
                item={item}
                isEditMode={currentEditModeItemId === item.id}
                removeItem={removeItem}
                updateItem={updateItem}
                setEditMode={setCurrentEditModeItemId}
                setTrashToolTip={setCurrentTrashToolTipOpen}
                isTrashToolTipOpen={currentTrashToolTipOpen === item.id}
            />
        )
    }

    const newToDoForm = (
        <NewToDoForm
            addItem={addItem}
            setEditMode={setCurrentEditModeItemId}
            setTrashToolTip={setCurrentTrashToolTipOpen}
        />
    )
    const toDoList = (
        <List
            size="large"
            style={{ width: "100%" }}
            dataSource={toDoItems}
            renderItem={item => listItemRenderFunction(item)}
        />
    )

    return <AppLayout {...{ newToDoForm, toDoList }} />
}

export default App
