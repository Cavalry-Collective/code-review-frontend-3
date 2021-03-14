import PropTypes from "prop-types"

const totallyCenteredStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}
const editViewContainerStyle = {
    ...totallyCenteredStyle,
    width: "100%",
    flexWrap: "wrap",
}

EditViewLayout.propTypes = {
    editInput: PropTypes.element,
    saveButton: PropTypes.element,
    cancelButton: PropTypes.element,
}

function EditViewLayout({ editInput, saveButton, cancelButton }) {
    return (
        <div style={editViewContainerStyle}>
            <div style={{ flex: 1, minWidth: "175px" }}>{editInput}</div>
            <div style={totallyCenteredStyle}>
                {saveButton}
                {cancelButton}
            </div>
        </div>
    )
}

export default EditViewLayout
