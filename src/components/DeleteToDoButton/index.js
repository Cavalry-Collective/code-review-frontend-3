import PropTypes from "prop-types"
import { Button, Popconfirm } from "antd"
import { DeleteFilled } from "@ant-design/icons"
import { removeAllNotifications } from "../notifications"

DeleteToDoButton.propTypes = {
    removeItem: PropTypes.func.isRequired,
    setEditMode: PropTypes.func.isRequired,
    setTrashToolTip: PropTypes.func.isRequired,
    isTrashToolTipOpen: PropTypes.bool.isRequired,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
}

function DeleteToDoButton({
    isTrashToolTipOpen,
    removeItem,
    setTrashToolTip,
    setEditMode,
    id,
}) {
    const clickConfirm = () => {
        setTrashToolTip(null)
        removeItem(id)
    }

    const clickTrash = () => {
        setTrashToolTip(id)
        setEditMode(null)
        removeAllNotifications()
    }

    return (
        <Popconfirm
            placement="left"
            title="Are you sure you want to delete this item?"
            visible={isTrashToolTipOpen}
            onConfirm={clickConfirm}
            onCancel={() => setTrashToolTip(null)}
        >
            <Button
                danger
                icon={<DeleteFilled />}
                style={{ margin: "5px" }}
                onClick={clickTrash}
                disabled={isTrashToolTipOpen}
            />
        </Popconfirm>
    )
}

export default DeleteToDoButton
