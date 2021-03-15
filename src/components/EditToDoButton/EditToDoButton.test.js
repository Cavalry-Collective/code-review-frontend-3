import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import EditToDoButton from "."
import { removeAllNotifications } from "../notifications"
jest.mock("../notifications")

const setEditMode = jest.fn()
const setTrashToolTip = jest.fn()
const id = "doesn't matter"

const editToDoButton = (
    <EditToDoButton {...{ setEditMode, setTrashToolTip, id }} />
)
describe("EditToDoButton", () => {
    test("Components of edit button are present", () => {
        render(editToDoButton)

        const editButton = screen.getByRole("button", {
            name: /edit/i,
        })
        expect(editButton).toBeInTheDocument()
        const editIcon = screen.getByRole("img", { name: /edit/i })
        expect(editIcon).toBeInTheDocument()
        expect(editButton).toContainElement(editIcon)
        expect(editButton).not.toBeDisabled()
    })

    test("Clicking the edit button will trigger the necessary callbacks", () => {
        render(editToDoButton)

        const editButton = screen.getByRole("button", {
            name: /edit/i,
        })

        userEvent.click(editButton)

        expect(setEditMode).toBeCalledTimes(1)
        expect(setEditMode).toBeCalledWith(id)
        expect(setTrashToolTip).toBeCalledTimes(1)
        expect(setTrashToolTip).toBeCalledWith(null)
        expect(removeAllNotifications).toBeCalledTimes(1)
    })
})
