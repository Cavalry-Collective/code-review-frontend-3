import { useState } from "react"
import PropTypes from "prop-types"
import { Button, Input, Tooltip } from "antd"
import NewToDoLayout from "../NewToDoLayout"
import { removeAllNotifications } from "../notifications"

const createId = () => (new Date() / 1).toString()

NewToDoForm.propTypes = {
    addItem: PropTypes.func.isRequired,
    setEditMode: PropTypes.func.isRequired,
    setTrashToolTip: PropTypes.func.isRequired,
}

function NewToDoForm({ addItem, setEditMode, setTrashToolTip }) {
    const [incompleteValue, setIncompleteValue] = useState("")

    const onSubmit = () => {
        if (incompleteValue === "") {
            return
        }

        addItem({
            title: incompleteValue,
            id: createId(),
            completed: false,
        })
        setIncompleteValue("")
    }

    const onFocus = () => {
        setEditMode(null)
        setTrashToolTip(null)
        removeAllNotifications()
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
