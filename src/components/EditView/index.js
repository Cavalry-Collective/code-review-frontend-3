import { useState } from "react"
import PropTypes from "prop-types"
import { Button, Tooltip, Input } from "antd"
import EditViewLayout from "../EditViewLayout"

const itemShape = PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    completed: PropTypes.bool.isRequired,
})

EditView.propTypes = {
    item: itemShape.isRequired,
    updateItem: PropTypes.func.isRequired,
    removeEditMode: PropTypes.func.isRequired,
}

function EditView({ item, updateItem, removeEditMode }) {
    const [incompleteValue, setIncompleteValue] = useState(item.title)

    const disableSubmit =
        incompleteValue === "" || item.title === incompleteValue

    const onSubmit = () => {
        if (disableSubmit) {
            return
        }

        updateItem({ ...item, title: incompleteValue })
    }

    const saveToolTipText = disableSubmit
        ? "Please enter text before submitting"
        : "Update this task"

    const cancelToolTipText = disableSubmit
        ? "Please enter text before submitting"
        : "Cancel"

    const editInput = (
        <Input
            rules={[{ required: true, message: "Required" }]}
            placeholder={item.title}
            size="large"
            onChange={e => setIncompleteValue(e.target.value)}
            onPressEnter={onSubmit}
            value={incompleteValue}
        />
    )

    const saveButton = (
        <Tooltip title={saveToolTipText}>
            <Button
                type="primary"
                style={{ margin: "10px" }}
                onClick={onSubmit}
                disabled={disableSubmit}
            >
                Save
            </Button>
        </Tooltip>
    )

    const cancelButton = (
        <Tooltip title={cancelToolTipText}>
            <Button onClick={removeEditMode}>Cancel</Button>
        </Tooltip>
    )

    return <EditViewLayout {...{ editInput, saveButton, cancelButton }} />
}

export default EditView
