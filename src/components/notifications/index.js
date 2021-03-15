import "antd/dist/antd.css"
import { Button, Spin, Space, notification } from "antd"

function Spinner() {
    return (
        <Space size="large">
            <Spin size="small" />
        </Space>
    )
}

const successNotification = reset => {
    const key = `open${Date.now()}`

    const onClose = () => {
        reset()
        notification.close(key)
    }

    const btn = (
        <Button type="primary" size="small" onClick={onClose}>
            Ok
        </Button>
    )
    notification.success({
        message: "Request Successful!",
        btn,
        key,
        duration: 2.5,
    })
}

const loadingNotification = () => {
    notification.open({
        duration: 1,
        message: "Syncing server... please wait",
        icon: <Spinner />,
    })
}

const errorNotification = errorMessage => {
    notification.error({
        duration: null,
        message: "Something went wrong. 😖 ❌",
        description: (
            <>
                We were not able to save your action.
                <div style={{ margin: "10px" }}>Reason: {errorMessage}</div>
                Try performing the action again. Hopefully it works this time!
            </>
        ),
    })
}

export { successNotification, loadingNotification, errorNotification }
