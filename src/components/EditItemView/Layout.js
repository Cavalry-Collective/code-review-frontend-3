import PropTypes from "prop-types"

const totallyCenteredStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}
const containerStyle = {
    ...totallyCenteredStyle,
    width: "100%",
    flexWrap: "wrap",
}

Layout.propTypes = {
    editInput: PropTypes.element,
    saveButton: PropTypes.element,
    cancelButton: PropTypes.element,
}

function Layout({ editInput, saveButton, cancelButton }) {
    return (
        <div style={containerStyle}>
            <div style={{ flex: 1, minWidth: "175px" }}>{editInput}</div>
            <div style={totallyCenteredStyle}>
                {saveButton}
                {cancelButton}
            </div>
        </div>
    )
}

export default Layout
