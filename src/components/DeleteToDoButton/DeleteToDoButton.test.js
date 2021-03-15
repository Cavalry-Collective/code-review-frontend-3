import { render, screen } from "@testing-library/react"
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

describe("DeleteToDoButton", () => {
    test("When opened it has the necessary nodes and their state", async () => {
        render(openedDeleteToDoButton)

        const deleteButton = screen.getByRole("button", { name: /delete/i })
        expect(deleteButton).toBeInTheDocument()
        const trashIcon = screen.getByRole("img", { name: /delete/i })
        expect(
            screen.getByRole("tooltip", {
                title: "Are you sure you want to delete this item?",
            })
        ).toBeInTheDocument()
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

    test("When closed it doesn't have the tooltip nodes", async () => {
        render(closedDeleteToDoButton)

        const deleteButton = screen.getByRole("button", { name: /delete/i })
        expect(deleteButton).toBeInTheDocument()
        expect(screen.queryByRole("tooltip")).not.toBeInTheDocument()
        expect(deleteButton).not.toBeDisabled()
    })
})
