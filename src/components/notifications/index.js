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

const errorNotification = (reset, retry, errorMessage) => {
    const key = `open${Date.now()}`

    const onTryAgain = () => {
        retry()
        notification.close(key)
    }

    const onNeverMind = () => {
        reset()
        notification.close(key)
    }

    const tryAgainButton = (
        <Button type="primary" onClick={onTryAgain}>
            Try again
        </Button>
    )

    const neverMindButton = <Button onClick={onNeverMind}>Never Mind.</Button>

    notification.error({
        key,
        duration: null,
        message: "Something went wrong.",
        description: (
            <>
                We were not able to save your action.
                <div style={{ margin: "10px" }}>
                    {tryAgainButton}
                    {neverMindButton}
                </div>
                Reason: {errorMessage}
            </>
        ),
    })
}

export { successNotification, loadingNotification, errorNotification }
