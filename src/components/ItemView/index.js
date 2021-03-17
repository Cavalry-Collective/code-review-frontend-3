import PropTypes from "prop-types"
import { List, Checkbox, Tooltip } from "antd"
import EditItemView from "../EditItemView"
import DeleteItemButton from "../DeleteItemButton"
import EditItemButton from "../EditItemButton"
import Layout from "./Layout"
import { removeAllNotifications } from "../notifications"

const listItemStyle = {
    listStyleType: "none",
    padding: "5px 0px",
}

const invisibleButtonStyle = {
    padding: "5px 15px",
    margin: "0px 10px",
    width: "calc(100% - 20px)",
    textAlign: "left",
    background: "white",
    border: "1px dotted rgba(200, 200,200, 0.5)",
    cursor: "pointer",
}

const itemShape = PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    completed: PropTypes.bool.isRequired,
})

ItemView.propTypes = {
    item: itemShape.isRequired,
    updateItem: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
    setEditMode: PropTypes.func.isRequired,
    isEditMode: PropTypes.bool.isRequired,
    setTrashToolTip: PropTypes.func.isRequired,
    isTrashToolTipOpen: PropTypes.bool.isRequired,
}

function ItemView({
    item,
    removeItem,
    updateItem,
    isEditMode,
    setEditMode,
    setTrashToolTip,
    isTrashToolTipOpen,
}) {
    const toggleCheckBox = () => {
        updateItem({ ...item, completed: !item.completed })
        setEditMode(null)
        setTrashToolTip(null)
        removeAllNotifications()
    }

    const checkBox = (
        <Checkbox
            checked={item.completed}
            onChange={toggleCheckBox}
            title={item.title}
            style={{ width: "20px" }}
        />
    )

    const onClickTitle = () => {
        setEditMode(item.id)
        setTrashToolTip(null)
        removeAllNotifications()
    }

    const clickableToDoTitle = (
        <Tooltip title="Edit this item">
            <button style={invisibleButtonStyle} onClick={onClickTitle}>
                {item.title}
            </button>
        </Tooltip>
    )

    const editToDoButton = (
        <EditItemButton {...{ setEditMode, setTrashToolTip, id: item.id }} />
    )

    const deleteToDoButton = (
        <DeleteItemButton
            {...{
                isTrashToolTipOpen,
                removeItem,
                setTrashToolTip,
                setEditMode,
                id: item.id,
            }}
        />
    )

    const defaultView = (
        <Layout
            {...{
                checkBox,
                clickableToDoTitle,
                editToDoButton,
                deleteToDoButton,
            }}
        />
    )

    const editView = <EditItemView {...{ item, updateItem, setEditMode }} />

    return (
        <List.Item style={listItemStyle}>
            {isEditMode ? editView : defaultView}
        </List.Item>
    )
}

export default ItemView
