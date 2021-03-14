import PropTypes from "prop-types"

const defaultViewCheckBoxGroupStyle = {
    display: "flex",
    padding: "5px",
    width: "calc(100vw - 40px)",
    alignItems: "center",
    overflow: "hidden",
}

const defaultViewDivStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
}

ToDoItemLayout.propTypes = {
    checkBox: PropTypes.element.isRequired,
    clickableToDoTitle: PropTypes.element.isRequired,
    editToDoButton: PropTypes.element.isRequired,
    deleteToDoButton: PropTypes.element.isRequired,
}

function ToDoItemLayout({
    checkBox,
    clickableToDoTitle,
    editToDoButton,
    deleteToDoButton,
}) {
    return (
        <div style={defaultViewDivStyle}>
            <div style={defaultViewCheckBoxGroupStyle}>
                {checkBox}
                {clickableToDoTitle}
            </div>
            <div style={{ display: "flex", width: "100px" }}>
                {editToDoButton}
                {deleteToDoButton}
            </div>
        </div>
    )
}

export default ToDoItemLayout
