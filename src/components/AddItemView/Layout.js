import PropTypes from "prop-types"

const containerStyle = {
    display: "flex",
    margin: "10px",
    width: "calc(80vw - 60px)",
    justifyContent: "center",
    alignItems: "center",
}

const centered = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

Layout.propTypes = {
    submitButton: PropTypes.node,
    input: PropTypes.node,
}

function Layout({ submitButton, input }) {
    return (
        <div style={containerStyle}>
            <div style={{ flex: 1 }}>{input}</div>
            <div style={centered}>{submitButton}</div>
        </div>
    )
}

export default Layout
