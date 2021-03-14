import PropTypes from "prop-types"
import { Button, Tooltip } from "antd"
import { EditFilled } from "@ant-design/icons"

EditToDoButton.propTypes = {
    setEditMode: PropTypes.func.isRequired,
    removeTrashToolTip: PropTypes.func.isRequired,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
}

function EditToDoButton({ setEditMode, removeTrashToolTip, id }) {
    return (
        <Tooltip title="Edit this item" placement="left">
            <Button
                icon={<EditFilled />}
                style={{ margin: "5px" }}
                onClick={() => {
                    setEditMode(id)
                    removeTrashToolTip()
                }}
            ></Button>
        </Tooltip>
    )
}

export default EditToDoButton
