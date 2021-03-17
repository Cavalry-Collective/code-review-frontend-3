import { useState } from "react"
import PropTypes from "prop-types"
import { Button, Tooltip, Input } from "antd"
import Layout from "./Layout"

const itemShape = PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    completed: PropTypes.bool.isRequired,
})

EditItemView.propTypes = {
    item: itemShape.isRequired,
    updateItem: PropTypes.func.isRequired,
    setEditMode: PropTypes.func.isRequired,
}

function EditItemView({ item, updateItem, setEditMode }) {
    const [incompleteValue, setIncompleteValue] = useState(item.title)

    const noValue = incompleteValue === ""
    const sameValue = item.title === incompleteValue
    const disabledSubmit = noValue || sameValue

    const onSubmit = () => {
        if (disabledSubmit) {
            return
        }

        updateItem({ ...item, title: incompleteValue })
        setEditMode(null)
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

    return <Layout {...{ editInput, saveButton, cancelButton }} />
}

export default EditItemView
