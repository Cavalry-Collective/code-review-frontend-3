import { render, screen } from "@testing-library/react"
import DeleteToDoButton from "."

const createId = () => (new Date() / 1).toString()

test("Expect delete button to contain the delete button and trash icon ", async () => {
    const mockFunction = jest.fn()
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
})
