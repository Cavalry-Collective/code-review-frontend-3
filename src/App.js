import "antd/dist/antd.css"
import "./App.css"
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
    const listItemRenderFunction = item => <ToDoListItem item={item} />

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
            <Card style={{ width: "420px", margin: "20px" }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    <h1>Things to do!</h1>
                    <Card style={{ display: "flex", width: "100%" }}>
                        <NewToDoForm />
                    </Card>
                    <Card style={{ width: "100%", margin: "10px" }}>
                        <List
                            size="large"
                            style={{ width: "300px", margin: "10px" }}
                            dataSource={data}
                            renderItem={item => listItemRenderFunction(item)}
                        />
                    </Card>
                </div>
            </Card>
        </div>
    )
}

export default App
