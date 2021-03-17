import PropTypes from "prop-types"
import { Button, Tooltip } from "antd"
import { EditFilled } from "@ant-design/icons"
import { removeAllNotifications } from "../notifications"

EditItemButton.propTypes = {
    setEditMode: PropTypes.func.isRequired,
    setTrashToolTip: PropTypes.func.isRequired,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
}

function EditItemButton({ setEditMode, setTrashToolTip, id }) {
    const clickEdit = () => {
        setEditMode(id)
        setTrashToolTip(null)
        removeAllNotifications()
    }

    return (
        <Tooltip title="Edit this item" placement="left">
            <Button
                icon={<EditFilled />}
                style={{ margin: "5px" }}
                onClick={clickEdit}
            />
        </Tooltip>
    )
}

export default EditItemButton
