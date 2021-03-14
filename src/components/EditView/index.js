import { useState } from "react"
import PropTypes from "prop-types"
import { Button, Tooltip, Input } from "antd"

const editViewContainerStyle = {
    display: "flex",
    margin: "10px",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
}

const totallyCenteredStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

const saveButtonStyle = {
    margin: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

const cancelButtonStyle = {
    margin: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

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

    const onSubmit = () => {
        if (item.title === incompleteValue) {
            return
        }
        updateItem({ ...item, title: incompleteValue })
    }

    const disableSubmit = incompleteValue === ""

    const saveToolTipText = disableSubmit
        ? "Please enter text before submitting"
        : "Update this task"

    const cancelToolTipText = disableSubmit
        ? "Please enter text before submitting"
        : "Cancel"

    return (
        <div style={editViewContainerStyle}>
            <div style={{ flex: 1, minWidth: "175px" }}>
                <Input
                    rules={[{ required: true, message: "Required" }]}
                    placeholder={item.title}
                    size="large"
                    onChange={e => setIncompleteValue(e.target.value)}
                    onPressEnter={onSubmit}
                    value={incompleteValue}
                />
            </div>
            <div style={totallyCenteredStyle}>
                <Tooltip title={saveToolTipText}>
                    <Button
                        type="primary"
                        style={saveButtonStyle}
                        onClick={onSubmit}
                        disabled={disableSubmit}
                    >
                        Save
                    </Button>
                </Tooltip>
                <Tooltip title={cancelToolTipText}>
                    <Button style={cancelButtonStyle} onClick={removeEditMode}>
                        Cancel
                    </Button>
                </Tooltip>
            </div>
        </div>
    )
}

export default EditView
