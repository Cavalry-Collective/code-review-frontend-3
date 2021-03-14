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
    removeTrashToolTip: PropTypes.func.isRequired,
}

function NewToDoForm({ addItem, removeEditMode, removeTrashToolTip }) {
    const [incompleteValue, setIncompleteValue] = useState("")

    const onSubmit = () => {
        if (incompleteValue === "") {
            return
        }

        addItem({
            title: incompleteValue,
            id: (new Date() / 1).toString(),
            completed: false,
        })
        setIncompleteValue("")
    }

    const onFocus = () => {
        removeEditMode()
        removeTrashToolTip()
    }

    const disableSubmit = incompleteValue === ""

    const toolTipText = disableSubmit
        ? "Please enter text before submitting"
        : "Add a task"

    const input = (
        <Input
            rules={[{ required: true, message: "Required" }]}
            placeholder="What do you need to do?"
            size="large"
            onChange={e => setIncompleteValue(e.target.value)}
            onPressEnter={onSubmit}
            value={incompleteValue}
            onFocus={onFocus}
        />
    )

    const submitButton = (
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
    )

    return (
        <div style={newToDoContainerStyle}>
            <div style={{ flex: 1 }}>{input}</div>
            <div style={buttonContainerStyle}>{submitButton}</div>
        </div>
    )
}

export default NewToDoForm
