import { List, Checkbox, Button, Popconfirm, Tooltip } from "antd"
import { DeleteFilled, EditFilled } from "@ant-design/icons"

function ToDoListItem({ item }) {
    return (
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
}

export default ToDoListItem
