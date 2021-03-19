import "antd/dist/antd.css"
import { useState, useEffect } from "react"
import { List } from "antd"
import AddItemView from "../components/AddItemView"
import ItemView from "../components/ItemView"
import { useMockFetchToDo, statusTypes as fetchStatusTypes } from "../hooks"
import {
    loadingNotification,
    errorNotification,
    successNotification,
} from "../components/notifications"
import Layout from "./Layout"

const showNotification = (fetchStatus, errorMessage, reset) => {
    if (fetchStatus === fetchStatusTypes.loading) {
        loadingNotification()
    } else if (fetchStatus === fetchStatusTypes.error) {
        errorNotification(errorMessage, reset)
    } else if (fetchStatus === fetchStatusTypes.success) {
        successNotification(reset)
    }
}

function App() {
    let [
        toDoItems,
        { updateItem, addItem, removeItem, reset },
        { statusType: fetchStatus, errorMessage },
    ] = useMockFetchToDo()
    let [currentEditModeItemId, setCurrentEditModeItemId] = useState(null)
    let [currentTrashToolTipOpen, setCurrentTrashToolTipOpen] = useState(null)

    useEffect(() => {
        showNotification(fetchStatus, errorMessage, reset)
    }, [fetchStatus, errorMessage, reset])

    const listItemRenderFunction = item => {
        return (
            <ItemView
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

    const addItemView = (
        <AddItemView
            addItem={addItem}
            setEditMode={setCurrentEditModeItemId}
            setTrashToolTip={setCurrentTrashToolTipOpen}
        />
    )

    const itemList = (
        <List
            size="large"
            style={{ width: "100%" }}
            dataSource={toDoItems}
            renderItem={item => listItemRenderFunction(item)}
        />
    )

    return <Layout {...{ addItemView, itemList }} />
}

export default App
