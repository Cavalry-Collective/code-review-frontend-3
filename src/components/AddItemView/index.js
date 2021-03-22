import { useState } from "react"
import PropTypes from "prop-types"
import { Button, Input } from "antd"
import Layout from "./Layout.js"
import { removeAllNotifications } from "../notifications"

const createId = () => (new Date() / 1).toString()

AddItemView.propTypes = {
    addItem: PropTypes.func.isRequired,
    setEditMode: PropTypes.func.isRequired,
    setTrashToolTip: PropTypes.func.isRequired,
}

function AddItemView({ addItem, setEditMode, setTrashToolTip }) {
    const [incompleteValue, setIncompleteValue] = useState("")

    const onSubmit = () => {
        if (incompleteValue === "") {
            return
        }

        addItem({ title: incompleteValue, id: createId(), completed: false })
        setIncompleteValue("")
    }

    const onFocus = () => {
        setEditMode(null)
        setTrashToolTip(null)
        removeAllNotifications()
    }

    const disableSubmit = incompleteValue === ""

    const input = (
        <Input
            rules={[{ required: true, message: "Required" }]}
            placeholder="What do you need to do?"
            size="large"
            onChange={e => setIncompleteValue(e.target.value)}
            onPressEnter={onSubmit}
            value={incompleteValue}
            onFocus={onFocus}
            name={"add todo"}
        />
    )

    const submitButton = (
        <Button
            type="primary"
            style={{ margin: "5px" }}
            onClick={onSubmit}
            disabled={disableSubmit}
        >
            Add
        </Button>
    )

    return <Layout {...{ input, submitButton }} />
}

export default AddItemView
