import PropTypes from "prop-types"
import { Button, Popconfirm } from "antd"
import { DeleteFilled } from "@ant-design/icons"

DeleteToDoButton.propTypes = {
    removeItem: PropTypes.func.isRequired,
    removeEditMode: PropTypes.func.isRequired,
    removeTrashToolTip: PropTypes.func.isRequired,
    setTrashToolTip: PropTypes.func.isRequired,
    isTrashToolTipOpen: PropTypes.bool.isRequired,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
}

function DeleteToDoButton({
    isTrashToolTipOpen,
    removeTrashToolTip,
    removeItem,
    setTrashToolTip,
    removeEditMode,
    id,
}) {
    const handleOk = () => {
        removeTrashToolTip()
        removeItem(id)
    }

    const handleTrashClick = () => {
        setTrashToolTip(id)
        removeEditMode()
    }

    return (
        <Popconfirm
            placement="left"
            title="Are you sure you want to delete this item?"
            visible={isTrashToolTipOpen}
            onConfirm={handleOk}
            onCancel={() => removeTrashToolTip()}
        >
            <Button
                danger
                icon={<DeleteFilled />}
                style={{ margin: "5px" }}
                onClick={handleTrashClick}
            />
        </Popconfirm>
    )
}

export default DeleteToDoButton
