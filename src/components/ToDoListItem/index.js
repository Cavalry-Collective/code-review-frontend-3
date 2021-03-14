import PropTypes from "prop-types"
import { List, Checkbox } from "antd"
import EditDeleteButtonGroup from "../EditDeleteButtonGroup"
import EditView from "../EditView"

const defaultViewCheckBoxStyle = {
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

const listItemStyle = {
    listStyleType: "none",
    padding: "10px 0px",
}

const invisibleButtonStyle = {
    padding: "5px 15px",
    margin: "0px 10px",
    width: "calc(100% - 20px)",
    textAlign: "left",
    background: "white",
    border: "1px dotted rgba(200, 200,200, 0.5)",
}

const itemShape = PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    completed: PropTypes.bool.isRequired,
})

ToDoListItem.propTypes = {
    item: itemShape.isRequired,
    updateItem: PropTypes.func.isRequired,
    removeEditMode: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
    setEditMode: PropTypes.func.isRequired,
    isEditMode: PropTypes.bool.isRequired,
    removeTrashToolTip: PropTypes.func.isRequired,
    setTrashToolTip: PropTypes.func.isRequired,
    isTrashToolTipOpen: PropTypes.bool.isRequired,
}

function ToDoListItem({
    item,
    removeItem,
    updateItem,
    isEditMode,
    removeEditMode,
    setEditMode,
    removeTrashToolTip,
    setTrashToolTip,
    isTrashToolTipOpen,
}) {
    const toggleCheckBox = () => {
        updateItem({ ...item, completed: !item.completed })
        removeTrashToolTip()
    }

    const defaultView = (
        <div style={defaultViewDivStyle}>
            <div style={defaultViewCheckBoxStyle}>
                <Checkbox
                    checked={item.completed}
                    onChange={toggleCheckBox}
                    aria-label={item.title}
                    style={{ width: "20px" }}
                />
                <button
                    tabIndex="0"
                    style={invisibleButtonStyle}
                    onClick={() => {
                        setEditMode(item.id)
                        removeTrashToolTip()
                    }}
                >
                    {item.title}
                </button>
            </div>
            <div style={{ display: "flex", width: "100px" }}>
                <EditDeleteButtonGroup
                    {...{
                        item,
                        toggleCheckBox,
                        removeItem,
                        removeEditMode,
                        setEditMode,
                        removeTrashToolTip,
                        setTrashToolTip,
                        isTrashToolTipOpen,
                    }}
                />
            </div>
        </div>
    )

    const editView = <EditView {...{ item, updateItem, removeEditMode }} />

    return (
        <List.Item style={listItemStyle}>
            {isEditMode ? editView : defaultView}
        </List.Item>
    )
}

export default ToDoListItem
