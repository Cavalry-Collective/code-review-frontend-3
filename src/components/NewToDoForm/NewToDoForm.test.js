import { render, screen } from "@testing-library/react"
import NewToDoForm from "."
import userEvent from "@testing-library/user-event"
import { removeAllNotifications } from "../notifications"
jest.mock("../notifications")

const newTitle = "doesn't matter"
const addItem = jest.fn()
const setEditMode = jest.fn()
const setTrashToolTip = jest.fn()

const newToDoForm = (
    <NewToDoForm {...{ addItem, setEditMode, setTrashToolTip }} />
)

describe("NewToDoForm", () => {
    test("Clicking the input field will call the necessary callback functions given as prop", () => {
        render(newToDoForm)
        const addButton = screen.getByRole("button", { name: /add/i })
        expect(addButton).toBeInTheDocument()
        expect(addButton).toBeDisabled()

        const inputField = screen.getByRole("textbox", { value: "" })

        expect(inputField).toBeInTheDocument()
        userEvent.click(inputField)

        expect(setEditMode).toHaveBeenCalledTimes(1)
        expect(setEditMode).toHaveBeenCalledWith(null)

        expect(setTrashToolTip).toHaveBeenCalledTimes(1)
        expect(setTrashToolTip).toHaveBeenCalledWith(null)

        expect(removeAllNotifications).toHaveBeenCalledTimes(1)
        expect(addItem).not.toHaveBeenCalled()
    })

    test("Typing and clicking the button will call the necessary callback functions given as prop", () => {
        render(newToDoForm)

        const inputField = screen.getByRole("textbox", { value: "" })
        userEvent.type(inputField, newTitle)

        let addButton = screen.getByRole("button", { name: /add/i })
        expect(addButton).not.toBeDisabled()
        userEvent.click(addButton)

        expect(addItem).toHaveBeenCalled()
    })
})
