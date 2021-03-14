import "antd/dist/antd.css"
import { useState } from "react"
import { List, Card } from "antd"
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
    let [toDoItems, setToDoItems] = useMockFetchToDo()
    let [currentEditModeItemId, setCurrentEditModeItemId] = useState(null)

    const removeItem = itemId =>
        setToDoItems(toDoItems.filter(item => item.id !== itemId))

    const addItem = item => setToDoItems([...toDoItems, item])

    const removeEditMode = () => setCurrentEditModeItemId(null)
    const setEditMode = id => setCurrentEditModeItemId(id)

    const updateItem = updatedItem => {
        setToDoItems(
            toDoItems.map(item => {
                return item.id === updatedItem.id ? updatedItem : item
            })
        )
        setCurrentEditModeItemId(null)
    }

    const listItemRenderFunction = item => (
        <ToDoListItem
            item={item}
            isEditMode={currentEditModeItemId === item.id}
            removeItem={removeItem}
            updateItem={updateItem}
            removeEditMode={removeEditMode}
            setEditMode={setEditMode}
        />
    )

    return (
        <div style={appContainerStyle}>
            <Card style={{ width: "90%", margin: "10px" }}>
                <div style={divInnerStyle}>
                    <h1>Things to do!</h1>
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
