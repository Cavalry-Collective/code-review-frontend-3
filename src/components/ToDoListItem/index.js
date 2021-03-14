import { useState } from "react"
import { List, Checkbox, Button, Popconfirm, Tooltip, Input } from "antd"
import { DeleteFilled, EditFilled } from "@ant-design/icons"

function CrudButtons({ item, removeItem, setEditMode }) {
    const [visible, setVisible] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)

    const handleOk = () => {
        setConfirmLoading(true)
        setTimeout(() => {
            setVisible(false)
            setConfirmLoading(false)
        }, 2000)

        removeItem(item.id)
    }

    return (
        <>
            <Tooltip title="Edit this item">
                <Button
                    icon={<EditFilled />}
                    style={{ margin: "5px" }}
                    onClick={() => setEditMode(item.id)}
                ></Button>
            </Tooltip>
            <Popconfirm
                title="Are you sure you want to delete this item?"
                visible={visible}
                onConfirm={handleOk}
                okButtonProps={{ loading: confirmLoading }}
                onCancel={() => setVisible(false)}
            >
                <Button
                    danger
                    icon={<DeleteFilled />}
                    style={{ margin: "5px" }}
                    onClick={() => setVisible(true)}
                />
            </Popconfirm>
        </>
    )
}

function EditMode({ item, updateItem, removeEditMode }) {
    const [incompleteValue, setIncompleteValue] = useState(item.title)

    const onSubmit = () => {
        if (item.title === incompleteValue) {
            return
        }
        const updatedItem = { ...item, title: incompleteValue }
        updateItem(updatedItem)
    }

    const disableSubmit = incompleteValue === ""

    return (
        <div
            style={{
                display: "flex",
                margin: "10px",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div style={{ flex: 1 }}>
                <Input
                    rules={[
                        { required: true, message: "This field is required" },
                    ]}
                    placeholder={item.title}
                    size="large"
                    onChange={e => {
                        setIncompleteValue(e.target.value)
                    }}
                    onPressEnter={onSubmit}
                    value={incompleteValue}
                />
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Tooltip
                    title={
                        disableSubmit
                            ? "Please enter text before submitting"
                            : "Update this task"
                    }
                >
                    <Button
                        type="primary"
                        style={{
                            margin: "10px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        onClick={onSubmit}
                        disabled={disableSubmit}
                    >
                        Save
                    </Button>
                </Tooltip>
                <Tooltip
                    title={
                        disableSubmit
                            ? "Please enter text before submitting"
                            : "Cancel"
                    }
                >
                    <Button
                        style={{
                            margin: "10px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        onClick={removeEditMode}
                    >
                        Cancel
                    </Button>
                </Tooltip>
            </div>
        </div>
    )
}

function ToDoListItem({
    item,
    removeItem,
    updateItem,
    isEditMode,
    removeEditMode,
    setEditMode,
}) {
    const toggleCheckBox = () => {
        updateItem({ ...item, completed: !item.completed })
    }

    const view = isEditMode ? (
        <EditMode {...{ item, updateItem, removeEditMode }} />
    ) : (
        <>
            <div
                style={{
                    display: "flex",
                    padding: "20px",
                    width: "calc(100vw - 100px)",
                }}
                onClick={() => setEditMode(item.id)}
            >
                <Checkbox checked={item.completed} onChange={toggleCheckBox}>
                    <spa>{item.title}</spa>
                </Checkbox>
            </div>

            <div
                style={{
                    display: "flex",
                    width: "100px",
                }}
            >
                <CrudButtons
                    {...{
                        item,
                        toggleCheckBox,
                        updateItem,
                        removeItem,
                        removeEditMode,
                        setEditMode,
                    }}
                />
            </div>
        </>
    )
    return (
        <List.Item
            style={{
                listStyleType: "none",
                display: "flex",
                justifyContent: "space-between",
            }}
        >
            {view}
        </List.Item>
    )
}

export default ToDoListItem
