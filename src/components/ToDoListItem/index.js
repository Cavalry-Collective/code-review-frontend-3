import PropTypes from "prop-types"
import { List, Checkbox } from "antd"
import EditView from "../EditView"
import DeleteToDoButton from "../DeleteToDoButton"
import EditToDoButton from "../EditToDoButton"
import ToDoItemLayout from "../ToDoItemLayout"
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

ToDoListItem.propTypes = {
    item: itemShape.isRequired,
    updateItem: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
    setEditMode: PropTypes.func.isRequired,
    isEditMode: PropTypes.bool.isRequired,
    setTrashToolTip: PropTypes.func.isRequired,
    isTrashToolTipOpen: PropTypes.bool.isRequired,
}

function ToDoListItem({
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
        setTrashToolTip(null)
        removeAllNotifications()
    }

    const checkBox = (
        <Checkbox
            checked={item.completed}
            onChange={toggleCheckBox}
            aria-label={item.title}
            style={{ width: "20px" }}
        />
    )

    const onClickTitle = () => {
        setEditMode(item.id)
        setTrashToolTip(null)
        removeAllNotifications()
    }

    const clickableToDoTitle = (
        <button
            style={invisibleButtonStyle}
            onClick={onClickTitle}
            title="Click to edit"
        >
            {item.title}
        </button>
    )

    const editToDoButton = (
        <EditToDoButton {...{ setEditMode, setTrashToolTip, id: item.id }} />
    )

    const deleteToDoButton = (
        <DeleteToDoButton
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
        <ToDoItemLayout
            {...{
                checkBox,
                clickableToDoTitle,
                editToDoButton,
                deleteToDoButton,
            }}
        />
    )

    const editView = <EditView {...{ item, updateItem, setEditMode }} />

    return (
        <List.Item style={listItemStyle}>
            {isEditMode ? editView : defaultView}
        </List.Item>
    )
}

export default ToDoListItem
