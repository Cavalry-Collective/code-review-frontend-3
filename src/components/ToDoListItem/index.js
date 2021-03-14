import PropTypes from "prop-types"
import { List, Checkbox } from "antd"
import EditDeleteButtonGroup from "../EditDeleteButtonGroup"
import EditView from "../EditView"

const defaultViewCheckBoxStyle = {
    display: "flex",
    padding: "5px",
    width: "calc(100vw - 50px)",
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
    const toggleCheckBox = () =>
        updateItem({ ...item, completed: !item.completed })

    const defaultView = (
        <div style={defaultViewDivStyle}>
            <div
                style={defaultViewCheckBoxStyle}
                onClick={() => setEditMode(item.id)}
            >
                <Checkbox checked={item.completed} onChange={toggleCheckBox}>
                    {item.title}
                </Checkbox>
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
