import { useState } from "react"
import { List, Checkbox, Button, Popconfirm, Tooltip } from "antd"
import { DeleteFilled, EditFilled } from "@ant-design/icons"

function ToDoListItem({ item, removeItem }) {
    const [visible, setVisible] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)

    const showPopconfirm = () => {
        setVisible(true)
    }

    const handleOk = () => {
        setConfirmLoading(true)
        setTimeout(() => {
            setVisible(false)
            setConfirmLoading(false)
        }, 2000)

        removeItem(item.id)
    }

    const handleCancel = () => {
        setVisible(false)
    }

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
                    title="Are you sure you want to delete this item?"
                    visible={visible}
                    onConfirm={handleOk}
                    okButtonProps={{ loading: confirmLoading }}
                    onCancel={handleCancel}
                >
                    <Button
                        danger
                        icon={<DeleteFilled />}
                        style={{ margin: "5px" }}
                        onClick={showPopconfirm}
                    />
                </Popconfirm>
            </div>
        </List.Item>
    )
}

export default ToDoListItem
