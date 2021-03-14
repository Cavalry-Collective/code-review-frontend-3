import PropTypes from "prop-types"
import { Button, Popconfirm, Tooltip } from "antd"
import { DeleteFilled, EditFilled } from "@ant-design/icons"

const itemShape = PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
})

EditDeleteButtonGroup.propTypes = {
    item: itemShape.isRequired,
    removeItem: PropTypes.func.isRequired,
    setEditMode: PropTypes.func.isRequired,
    removeEditMode: PropTypes.func.isRequired,
    removeTrashToolTip: PropTypes.func.isRequired,
    setTrashToolTip: PropTypes.func.isRequired,
    isTrashToolTipOpen: PropTypes.bool.isRequired,
}

function EditDeleteButtonGroup({
    item,
    removeItem,
    setEditMode,
    removeEditMode,
    removeTrashToolTip,
    setTrashToolTip,
    isTrashToolTipOpen,
}) {
    const handleOk = () => {
        removeTrashToolTip()
        removeItem(item.id)
    }

    const handleTrashClick = () => {
        setTrashToolTip(item.id)
        removeEditMode()
    }

    return (
        <>
            <Tooltip title="Edit this item" placement="left">
                <Button
                    icon={<EditFilled />}
                    style={{ margin: "5px" }}
                    onClick={() => {
                        setEditMode(item.id)
                        removeTrashToolTip()
                    }}
                ></Button>
            </Tooltip>
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
        </>
    )
}

export default EditDeleteButtonGroup
