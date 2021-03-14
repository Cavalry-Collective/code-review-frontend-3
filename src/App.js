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

function App() {
    let [toDoItems, setToDoItems] = useState(data)

    const removeItem = itemId =>
        setToDoItems(toDoItems.filter(item => item.id !== itemId))

    const addItem = item => setToDoItems([...toDoItems, item])

    const updateItem = updatedItem =>
        setToDoItems(
            toDoItems.map(item => {
                return item.id === updatedItem.id ? updatedItem : item
            })
        )

    const listItemRenderFunction = item => (
        <ToDoListItem
            item={item}
            removeItem={removeItem}
            updateItem={updateItem}
        />
    )

    return (
        <div
            className="App"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <Card style={{ width: "100%", margin: "20px" }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    <h1>Things to do!</h1>
                    <Card
                        style={{
                            display: "flex",
                            width: "100%",
                            margin: "10px",
                        }}
                    >
                        <NewToDoForm addItem={addItem} />
                    </Card>
                    <Card style={{ width: "100%", margin: "10px" }}>
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
