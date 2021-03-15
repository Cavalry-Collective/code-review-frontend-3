import { render, screen } from "@testing-library/react"
import NewToDoForm from "."
import userEvent from "@testing-library/user-event"

const newTitle = "doesn't matter"
const addItem = jest.fn()
const setEditMode = jest.fn()
const setTrashToolTip = jest.fn()

const newToDoForm = (
    <NewToDoForm {...{ addItem, setEditMode, setTrashToolTip }} />
)

describe("NewToDoForm", () => {
    test("Clicking the input field will call the necessary callback functions given as prop", async () => {
        render(newToDoForm)
        const inputField = screen.getByRole("textbox", { value: "" })

        expect(inputField).toBeInTheDocument()
        userEvent.click(inputField)

        expect(setEditMode).toHaveBeenCalledTimes(1)
        expect(setTrashToolTip).toHaveBeenCalledTimes(1)
        expect(addItem).not.toHaveBeenCalled()

        userEvent.type(inputField, newTitle)
        userEvent.click(screen.getByRole("button", { name: /add/i }))
        expect(addItem).toHaveBeenCalled()
    })
})
