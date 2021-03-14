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
    const btn = (
        <Button
            type="primary"
            size="small"
            onClick={() => {
                reset()
                notification.close(key)
            }}
        >
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

    notification.error({
        key,
        duration: null,
        message: "Something went wrong.",
        description: (
            <div>
                We were not able to save your action.
                <div style={{ margin: "10px" }}>
                    <Button
                        type="primary"
                        onClick={() => {
                            retry()
                            notification.close(key)
                        }}
                    >
                        Try again
                    </Button>
                    <Button
                        onClick={() => {
                            reset()
                            notification.close(key)
                        }}
                    >
                        Never Mind.
                    </Button>
                </div>
                Reason: {errorMessage}
            </div>
        ),
    })
}

export { successNotification, loadingNotification, errorNotification }
