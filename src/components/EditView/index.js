import { useState } from "react"
import { Button, Tooltip, Input } from "antd"

function EditView({ item, updateItem, removeEditMode }) {
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

export default EditView
