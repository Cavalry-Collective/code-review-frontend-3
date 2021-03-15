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
    setEditMode: PropTypes.func.isRequired,
}

function EditView({ item, updateItem, setEditMode }) {
    const [incompleteValue, setIncompleteValue] = useState(item.title)

    const noValue = incompleteValue === ""
    const sameValue = item.title === incompleteValue
    const disabledSubmit = noValue || sameValue

    const onSubmit = () => {
        if (disabledSubmit) {
            return
        }

        updateItem({ ...item, title: incompleteValue })
    }

    const saveToolTipText = noValue
        ? "Write something first!"
        : sameValue
        ? "You didn't make any changes!"
        : "Update this item!"

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
                disabled={disabledSubmit}
            >
                Save
            </Button>
        </Tooltip>
    )

    const cancelButton = (
        <Button onClick={() => setEditMode(null)}>Cancel</Button>
    )

    return <EditViewLayout {...{ editInput, saveButton, cancelButton }} />
}

export default EditView
