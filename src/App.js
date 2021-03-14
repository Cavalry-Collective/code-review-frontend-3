import "antd/dist/antd.css"
import { useState } from "react"
import { List, Card, Button } from "antd"
import NewToDoForm from "./components/NewToDoForm"
import ToDoListItem from "./components/ToDoListItem"
import { useMockFetchToDo } from "./hooks/"

const appContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
}

const divInnerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
}

const cardInnerStyle = {
    display: "flex",
    width: "100%",
    margin: "10px",
}

function App() {
    let [
        toDoItems,
        { updateItem: serverUpdateItem, addItem, removeItem, reset, retry },
        { isLoading, isSuccess, isError, isIdle, errorMessage },
    ] = useMockFetchToDo()
    let [currentEditModeItemId, setCurrentEditModeItemId] = useState(null)
    let [currentTrashToolTipOpen, setCurrentTrashToolTipOpen] = useState(null)

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

    let message = null
    if (isLoading) {
        message = "Syncing server... please wait!"
    } else if (isError) {
        message = (
            <span>
                `Something went wrong (error: {errorMessage})`
                <Button onClick={retry}>Try again</Button> or{" "}
                <Button onClick={reset}>Reset</Button>
            </span>
        )
    } else if (isSuccess) {
        message = (
            <span>
                Request Successful! <Button onClick={reset}>Ok!</Button>
            </span>
        )
    } else if (isIdle) {
        message = <span>:)</span>
    }

    return (
        <div style={appContainerStyle}>
            <Card style={{ width: "95%", margin: "5px" }}>
                <div style={divInnerStyle}>
                    <h1>Things to do!</h1>
                    {message}
                    <Card style={cardInnerStyle}>
                        <NewToDoForm
                            addItem={addItem}
                            removeEditMode={removeEditMode}
                        />
                    </Card>
                    <Card style={{ width: "100%" }}>
                        <List
                            size="large"
                            style={{ width: "100%" }}
                            dataSource={toDoItems}
                            renderItem={item => listItemRenderFunction(item)}
                        />
                    </Card>
                </div>
            </Card>
        </div>
    )
}

export default App
