import "antd/dist/antd.css"
import { Button, Spin, Space, notification, Alert } from "antd"

const notificationTypes = {
    error: "error",
    success: "success",
    loading: "loading",
}
function Spinner() {
    return (
        <Space size="large">
            <Spin size="small" />
        </Space>
    )
}

const loadingNotification = () => {
    notification.close(notificationTypes.success)
    notification.close(notificationTypes.loading)

    notification.open({
        duration: 2.5,
        message: "Syncing server...",
        icon: <Spinner />,
        key: notificationTypes.loading,
    })
}

const successNotification = reset => {
    notification.close(notificationTypes.success)
    notification.close(notificationTypes.loading)

    const onClose = () => {
        reset()
        notification.close(notificationTypes.success)
    }

    const btn = (
        <Button type="primary" size="small" onClick={onClose}>
            Got it!
        </Button>
    )
    notification.success({
        message: "Request Successful!",
        btn,
        key: notificationTypes.success,
        duration: 2.5,
    })
}

const errorNotification = (errorMessage, reset) => {
    notification.close(notificationTypes.loading)
    notification.close(notificationTypes.error)

    const onClose = () => {
        reset()
        notification.close(notificationTypes.error)
    }

    const btn = (
        <Button type="primary" size="small" onClick={onClose}>
            I understand
        </Button>
    )

    notification.error({
        key: notificationTypes.error,
        duration: null,
        message: "Something went wrong. 😖 ❌",
        description: (
            <>
                We were not able to save your action.
                <Alert
                    type="error"
                    style={{ margin: "10px" }}
                    message={`Reason: ${errorMessage}`}
                />
                Try performing the action again. Hopefully it works this time!
            </>
        ),
        btn,
    })
}

const removeAllNotifications = () => {
    notification.close(notificationTypes.error)
    notification.close(notificationTypes.success)
    notification.close(notificationTypes.loading)
}

export {
    loadingNotification,
    successNotification,
    errorNotification,
    removeAllNotifications,
}
