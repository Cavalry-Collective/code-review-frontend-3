import { useState } from "react"
import { Button, Input, Tooltip, Form } from "antd"
import { PlusCircleOutlined } from "@ant-design/icons"

function NewToDoForm({ addItem }) {
    const [incompleteValue, setIncompleteValue] = useState("")

    const onSubmit = () => {
        addItem({
            title: incompleteValue,
            id: (new Date() / 1).toString(),
            complete: false,
        })
        setIncompleteValue("")
    }

    return (
        <div style={{ display: "flex", margin: "10px" }}>
            <Input
                rules={[{ required: true, message: "This field is required" }]}
                placeholder="What do you need to do?"
                style={{ width: "250px", flexGrow: 1 }}
                size="large"
                onChange={e => {
                    setIncompleteValue(e.target.value)
                }}
                onPressEnter={onSubmit}
                value={incompleteValue}
            />
            <Tooltip title="Add this item">
                <Button
                    type="primary"
                    icon={<PlusCircleOutlined />}
                    style={{
                        margin: "5px",
                        padding: "15px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    onClick={onSubmit}
                />
            </Tooltip>
        </div>
    )
}

export default NewToDoForm
