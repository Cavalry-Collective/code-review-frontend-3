import { useState } from "react"
import { Button, Popconfirm, Tooltip } from "antd"
import { DeleteFilled, EditFilled } from "@ant-design/icons"

function EditDeleteButtonGroup({ item, removeItem, setEditMode }) {
    const [visible, setVisible] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)

    const handleOk = () => {
        setConfirmLoading(true)
        setTimeout(() => {
            setVisible(false)
            setConfirmLoading(false)
        }, 2000)

        removeItem(item.id)
    }

    return (
        <>
            <Tooltip title="Edit this item">
                <Button
                    icon={<EditFilled />}
                    style={{ margin: "5px" }}
                    onClick={() => setEditMode(item.id)}
                ></Button>
            </Tooltip>
            <Popconfirm
                title="Are you sure you want to delete this item?"
                visible={visible}
                onConfirm={handleOk}
                okButtonProps={{ loading: confirmLoading }}
                onCancel={() => setVisible(false)}
            >
                <Button
                    danger
                    icon={<DeleteFilled />}
                    style={{ margin: "5px" }}
                    onClick={() => setVisible(true)}
                />
            </Popconfirm>
        </>
    )
}

export default EditDeleteButtonGroup