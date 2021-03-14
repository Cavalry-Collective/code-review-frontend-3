import { List, Checkbox } from "antd"
import EditDeleteButtonGroup from "../EditDeleteButtonGroup"
import EditView from "../EditView"

function ToDoListItem({
    item,
    removeItem,
    updateItem,
    isEditMode,
    removeEditMode,
    setEditMode,
}) {
    const toggleCheckBox = () => {
        updateItem({ ...item, completed: !item.completed })
    }

    const defaultView = (
        <>
            <div
                style={{
                    display: "flex",
                    padding: "20px",
                    width: "calc(100vw - 100px)",
                }}
                onClick={() => setEditMode(item.id)}
            >
                <Checkbox checked={item.completed} onChange={toggleCheckBox}>
                    <spa>{item.title}</spa>
                </Checkbox>
            </div>

            <div
                style={{
                    display: "flex",
                    width: "100px",
                }}
            >
                <EditDeleteButtonGroup
                    {...{
                        item,
                        toggleCheckBox,
                        updateItem,
                        removeItem,
                        removeEditMode,
                        setEditMode,
                    }}
                />
            </div>
        </>
    )

    const editView = <EditView {...{ item, updateItem, removeEditMode }} />
    const view = isEditMode ? editView : defaultView

    return (
        <List.Item
            style={{
                listStyleType: "none",
                display: "flex",
                justifyContent: "space-between",
            }}
        >
            {view}
        </List.Item>
    )
}

export default ToDoListItem
