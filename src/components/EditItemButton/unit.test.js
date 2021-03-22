import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import EditItemButton from "."
import { removeAllNotifications } from "../notifications"
jest.mock("../notifications")

const setEditMode = jest.fn()
const setTrashToolTip = jest.fn()
const id = "doesn't matter"

const editButton = <EditItemButton {...{ setEditMode, setTrashToolTip, id }} />
describe("EditItemButton", () => {
    test("All expected elements within it are present", () => {
        render(editButton)

        const button = screen.getByRole("button", { name: /edit/i })
        expect(button).toBeInTheDocument()
        const editIcon = screen.getByRole("img", { name: /edit/i })
        expect(editIcon).toBeInTheDocument()
        expect(button).toContainElement(editIcon)
        expect(button).not.toBeDisabled()
    })

    test("Clicking it  will trigger the necessary callbacks", () => {
        render(editButton)

        const button = screen.getByRole("button", { name: /edit/i })

        userEvent.click(button)

        expect(setEditMode).toBeCalledTimes(1)
        expect(setEditMode).toBeCalledWith(id)
        expect(setTrashToolTip).toBeCalledTimes(1)
        expect(setTrashToolTip).toBeCalledWith(null)
        expect(removeAllNotifications).toBeCalledTimes(1)
    })
})
