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
        { updateItem: serverUpdateItem, addItem, removeItem, reset, retry },
        { isLoading, isSuccess, isError, isIdle, errorMessage },
    ] = useMockFetchToDo()
    let [currentEditModeItemId, setCurrentEditModeItemId] = useState(null)
    let [currentTrashToolTipOpen, setCurrentTrashToolTipOpen] = useState(null)

    useEffect(() => {
        if (isLoading) {
            loadingNotification()
        } else if (isError) {
            errorNotification(reset, retry, errorMessage)
        } else if (isSuccess) {
            successNotification(reset)
        }
    }, [isLoading, isError, isSuccess, errorMessage, isIdle, reset, retry])

    const updateItem = updatedItem => {
        serverUpdateItem(updatedItem)
        setCurrentEditModeItemId(null)
    }

    const removeEditMode = () => setCurrentEditModeItemId(null)
    const setEditMode = id => setCurrentEditModeItemId(id)

    const removeTrashToolTip = () => setCurrentTrashToolTipOpen(null)
    const setTrashToolTip = id => setCurrentTrashToolTipOpen(id)

    const listItemRenderFunction = item => {
        return (
            <ToDoListItem
                item={item}
                isEditMode={currentEditModeItemId === item.id}
                removeItem={removeItem}
                updateItem={updateItem}
                removeEditMode={removeEditMode}
                setEditMode={setEditMode}
                removeTrashToolTip={removeTrashToolTip}
                setTrashToolTip={setTrashToolTip}
                isTrashToolTipOpen={currentTrashToolTipOpen === item.id}
            />
        )
    }

    const newToDoForm = (
        <NewToDoForm
            addItem={addItem}
            removeEditMode={removeEditMode}
            removeTrashToolTip={removeTrashToolTip}
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
