import { useState } from "react"
import PropTypes from "prop-types"
import { Button, Input, Tooltip } from "antd"

const newToDoContainerStyle = {
    display: "flex",
    margin: "10px",
    width: "calc(80vw - 60px)",
    justifyContent: "center",
    alignItems: "center",
}

const buttonStyle = {
    margin: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

const buttonContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

NewToDoForm.propTypes = {
    addItem: PropTypes.func.isRequired,
    removeEditMode: PropTypes.func.isRequired,
}

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

    const toolTipText = disableSubmit
        ? "Please enter text before submitting"
        : "Add a task"

    return (
        <div style={newToDoContainerStyle}>
            <div style={{ flex: 1 }}>
                <Input
                    rules={[{ required: true, message: "Reqirex" }]}
                    placeholder="What do you need to do?"
                    size="large"
                    onChange={e => setIncompleteValue(e.target.value)}
                    onPressEnter={onSubmit}
                    value={incompleteValue}
                    onFocus={removeEditMode}
                />
            </div>
            <div style={buttonContainerStyle}>
                <Tooltip title={toolTipText}>
                    <Button
                        type="primary"
                        style={buttonStyle}
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
