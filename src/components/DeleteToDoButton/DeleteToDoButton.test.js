import { render, screen } from "@testing-library/react"
import DeleteToDoButton from "."

const createId = () => (new Date() / 1).toString()

const mockFunction = jest.fn()

test("DeleteToDoButton: contains the delete button and has trash icon as its child ", async () => {
    const id = createId()
    render(
        <DeleteToDoButton
            {...{
                isTrashToolTipOpen: false,
                removeItem: mockFunction,
                setTrashToolTip: mockFunction,
                setEditMode: mockFunction,
                id,
            }}
        />
    )

    const deleteButton = screen.getByRole("button", { Name: /delete/i })
    expect(deleteButton).toBeInTheDocument()
    const trashIcon = screen.getByRole("img", { "aria-label": /delete/i })
    expect(trashIcon).toBeInTheDocument()
    expect(trashIcon.parentElement).toBe(deleteButton)
})
