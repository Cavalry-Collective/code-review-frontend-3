import { render, screen } from "@testing-library/react"
import NewToDoForm from "."
import userEvent from "@testing-library/user-event"
import { removeAllNotifications } from "../notifications"
jest.mock("../notifications")

const newTitle = "doesn't matter"
const addItem = jest.fn()
const setEditMode = jest.fn()
const setTrashToolTip = jest.fn()

const addItemView = (
    <NewToDoForm {...{ addItem, setEditMode, setTrashToolTip }} />
)

describe("AddItemView", () => {
    test("Clicking the input field will call all the expected callbacks", () => {
        render(addItemView)
        const addButton = screen.getByRole("button", { name: /add/i })
        expect(addButton).toBeInTheDocument()
        expect(addButton).toBeDisabled()

        const inputField = screen.getByRole("textbox")

        expect(inputField).toBeInTheDocument()
        userEvent.click(inputField)

        expect(setEditMode).toHaveBeenCalledTimes(1)
        expect(setEditMode).toHaveBeenCalledWith(null)

        expect(setTrashToolTip).toHaveBeenCalledTimes(1)
        expect(setTrashToolTip).toHaveBeenCalledWith(null)

        expect(removeAllNotifications).toHaveBeenCalledTimes(1)
        expect(addItem).not.toHaveBeenCalled()
    })

    test("Typing and clicking the button all the expected callbacks", () => {
        render(addItemView)

        const inputField = screen.getByRole("textbox")
        userEvent.type(inputField, newTitle)

        let addButton = screen.getByRole("button", { name: /add/i })
        expect(addButton).not.toBeDisabled()
        userEvent.click(addButton)

        expect(addItem).toHaveBeenCalled()
    })
})
