import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import DeleteToDoButton from "."

const createId = () => (new Date() / 1).toString()

const mockFunction = jest.fn()

const openedDeleteToDoButton = (
    <DeleteToDoButton
        {...{
            isTrashToolTipOpen: true,
            removeItem: mockFunction,
            setTrashToolTip: mockFunction,
            setEditMode: mockFunction,
            id: createId(),
        }}
    />
)

test("DeleteToDoButton: Expect an opened DeleteToDoButton to have the necessary nodes and their state ", async () => {
    render(openedDeleteToDoButton)

    const deleteButton = screen.getByRole("button", { name: /delete/i })
    expect(deleteButton).toBeInTheDocument()
    const trashIcon = screen.getByRole("img", { name: /delete/i })
    expect(screen.getByRole("tooltip")).toBeInTheDocument()
    expect(trashIcon).toBeInTheDocument()
    expect(deleteButton).toContainElement(trashIcon)
    expect(deleteButton).toBeDisabled()
    expect(screen.getByText("Are you sure you want to delete this item?"))
    const cancelText = screen.getByText(/cancel/i)
    const okText = screen.getByText(/ok/i)
    expect(cancelText).toBeInTheDocument()
    expect(okText).toBeInTheDocument()

    expect(cancelText.parentElement).toHaveProperty("type", "button")
    expect(okText.parentElement).toHaveProperty("type", "button")
})

const closedDeleteToDoButton = (
    <DeleteToDoButton
        {...{
            isTrashToolTipOpen: false,
            removeItem: mockFunction,
            setTrashToolTip: mockFunction,
            setEditMode: mockFunction,
            id: createId(),
        }}
    />
)
test("DeleteToDoButton: Expect anclosed DeleteToDoButton to have the necessary nodes and their state ", async () => {
    render(closedDeleteToDoButton)

    const deleteButton = screen.getByRole("button", { name: /delete/i })
    expect(deleteButton).toBeInTheDocument()
    const trashIcon = screen.getByRole("img", { name: /delete/i })
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument()
    expect(trashIcon).toBeInTheDocument()
    expect(deleteButton).not.toBeDisabled()
})
