import { Button, Input, Tooltip } from "antd"
import { PlusCircleOutlined } from "@ant-design/icons"

function NewToDoForm() {
    return (
        <div style={{ display: "flex", margin: "10px" }}>
            <Input
                placeholder="What do you need to do?"
                style={{ width: "250px", flexGrow: 1 }}
                size="large"
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
                />
            </Tooltip>
        </div>
    )
}

export default NewToDoForm
