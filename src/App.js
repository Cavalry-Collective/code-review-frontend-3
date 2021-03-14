import "antd/dist/antd.css"
import "./App.css"
import { useState } from "react"
import { List, Card } from "antd"
import NewToDoForm from "./components/NewToDoForm"
import ToDoListItem from "./components/ToDoListItem"

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
    let [toDoItems, setToDoItems] = useState(data)
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
        <div className="App" style={appContainerStyle}>
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
