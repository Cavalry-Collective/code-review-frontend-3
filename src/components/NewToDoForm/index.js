import { useState } from "react"
import PropTypes from "prop-types"
import { Button, Input, Tooltip } from "antd"
import NewToDoLayout from "../NewToDoLayout"

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
                style={{ margin: "5px" }}
                onClick={onSubmit}
                disabled={disableSubmit}
            >
                Add
            </Button>
        </Tooltip>
    )

    return <NewToDoLayout {...{ input, submitButton }} />
}

export default NewToDoForm
