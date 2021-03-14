import { useState } from "react"
import { Button, Input, Tooltip, Form, AutoComplete } from "antd"

function NewToDoForm({ addItem, removeEditMode }) {
    const [incompleteValue, setIncompleteValue] = useState("")

    const onSubmit = () => {
        addItem({
            title: incompleteValue,
            id: (new Date() / 1).toString(),
            complete: false,
        })
        setIncompleteValue("")
    }

    const disableSubmit = incompleteValue === ""

    return (
        <div
            style={{
                display: "flex",
                margin: "10px",
                width: "calc(80vw - 60px)",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div style={{ flex: 1 }}>
                <Input
                    rules={[
                        { required: true, message: "This field is required" },
                    ]}
                    placeholder="What do you need to do?"
                    size="large"
                    onChange={e => {
                        setIncompleteValue(e.target.value)
                    }}
                    onPressEnter={onSubmit}
                    value={incompleteValue}
                    onFocus={removeEditMode}
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
                            : "Add a task"
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
                        Add
                    </Button>
                </Tooltip>
            </div>
        </div>
    )
}

export default NewToDoForm
