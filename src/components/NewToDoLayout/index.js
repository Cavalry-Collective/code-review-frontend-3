import PropTypes from "prop-types"

const newToDoContainerStyle = {
    display: "flex",
    margin: "10px",
    width: "calc(80vw - 60px)",
    justifyContent: "center",
    alignItems: "center",
}

const buttonContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

NewToDoLayout.propTypes = {
    submitButton: PropTypes.node,
    input: PropTypes.node,
}

function NewToDoLayout({ submitButton, input }) {
    return (
        <div style={newToDoContainerStyle}>
            <div style={{ flex: 1 }}>{input}</div>
            <div style={buttonContainerStyle}>{submitButton}</div>
        </div>
    )
}

export default NewToDoLayout
