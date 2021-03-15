import { render, screen } from "@testing-library/react"
import EditToDoButton from "."

const mockFunction = jest.fn()
const editToDoButton = (
    <EditToDoButton
        {...{
            setEditMode: mockFunction,
            setTrashToolTip: mockFunction,
            id: "doesn't matter",
        }}
    />
)
describe("EditToDoButton", () => {
    test("Components of edit button are present", async () => {
        render(editToDoButton)

        const editButton = screen.getByRole("button", { name: /edit/i })
        expect(editButton).toBeInTheDocument()
        const editIcon = screen.getByRole("img", { name: /edit/i })
        expect(editIcon).toBeInTheDocument()
        expect(editButton).toContainElement(editIcon)
        expect(editButton).not.toBeDisabled()
    })
})
