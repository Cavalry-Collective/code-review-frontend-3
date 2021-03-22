import PropTypes from "prop-types"

const checkBoxGroupStyle = {
    display: "flex",
    padding: "5px",
    width: "calc(100vw - 40px)",
    alignItems: "center",
    overflow: "hidden",
}

const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
}

Layout.propTypes = {
    checkBox: PropTypes.element.isRequired,
    clickableToDoTitle: PropTypes.element.isRequired,
    editToDoButton: PropTypes.element.isRequired,
    deleteToDoButton: PropTypes.element.isRequired,
}

function Layout({
    checkBox,
    clickableToDoTitle,
    editToDoButton,
    deleteToDoButton,
}) {
    return (
        <div style={containerStyle}>
            <div style={checkBoxGroupStyle}>
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

export default Layout
