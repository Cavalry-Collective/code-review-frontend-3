import "antd/dist/antd.css"
import "./App.css"

import { List, Card, Checkbox, Button, Input, Popconfirm, Tooltip } from "antd"
import { DeleteFilled, EditFilled, PlusCircleOutlined } from "@ant-design/icons"

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
    const listItemRenderFunction = item => (
        <List.Item
            style={{
                padding: "20px",
                listStyleType: "none",
                display: "flex",
                justifyContent: "space-between",
            }}
        >
            <div style={{ display: "flex" }}>
                <Checkbox checked={item.completed}>
                    <span style={{ padding: "10px" }}>{item.title}</span>
                </Checkbox>
            </div>
            <div>
                <Tooltip title="Edit this item">
                    <Button
                        icon={<EditFilled />}
                        style={{ margin: "5px" }}
                    ></Button>
                </Tooltip>
                <Popconfirm
                    title="Are you sure to delete this task?"
                    okText="Yes"
                    cancelText="No"
                >
                    <Button
                        danger
                        icon={<DeleteFilled />}
                        style={{ margin: "5px" }}
                    />
                </Popconfirm>
            </div>
        </List.Item>
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
                    <Card
                        style={{
                            display: "flex",
                            width: "100%",
                        }}
                    >
                        <div style={{ display: "flex", margin: "10px" }}>
                            <Input
                                placeholder="What do you need to do?"
                                style={{ width: "250px", flexGrow: 1 }}
                                size="large"
                            />
                            <Tooltip title="Add this item">
                                <Button
                                    type="primary"
                                    icon={<PlusCircleOutlined />}
                                    style={{
                                        margin: "5px",
                                        padding: "15px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                />
                            </Tooltip>
                        </div>
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
