import "antd/dist/antd.css"
import PropTypes from "prop-types"
import { Card } from "antd"

const appContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
}

const divInnerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
}

const cardInnerStyle = {
    display: "flex",
    width: "100%",
    margin: "10px",
}

Layout.propTypes = {
    addItemView: PropTypes.element.isRequired,
    itemList: PropTypes.element.isRequired,
}

function Layout({ addItemView, itemList }) {
    return (
        <div style={appContainerStyle}>
            <Card style={{ width: "95%", margin: "5px" }}>
                <div style={divInnerStyle}>
                    <h1>Things To Do</h1>
                    <Card style={cardInnerStyle}>{addItemView}</Card>
                    <Card style={{ width: "100%" }}>{itemList}</Card>
                </div>
            </Card>
        </div>
    )
}

export default Layout
