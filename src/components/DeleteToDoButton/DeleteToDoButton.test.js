import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import DeleteToDoButton from "."
import { removeAllNotifications } from "../notifications"
jest.mock("../notifications")

const createId = () => (new Date() / 1).toString()

const removeItem = jest.fn()
const setTrashToolTip = jest.fn()
const setEditMode = jest.fn()

const id = createId()

const openedDeleteToDoButton = (
    <DeleteToDoButton
        {...{
            isTrashToolTipOpen: true,
            removeItem,
            setTrashToolTip,
            setEditMode,
            id,
        }}
    />
)

const closedDeleteToDoButton = (
    <DeleteToDoButton
        {...{
            isTrashToolTipOpen: false,
            removeItem,
            setTrashToolTip,
            setEditMode,
            id,
        }}
    />
)

describe("DeleteToDoButton", () => {
    test("When opened it has the necessary nodes and their state", async () => {
        render(openedDeleteToDoButton)

        const deleteButton = screen.getByRole("button", { name: /delete/i })
        expect(deleteButton).toBeInTheDocument()

        const trashIcon = screen.getByRole("img", { name: /delete/i })
        expect(trashIcon).toBeInTheDocument()

        const confirmToolTip = screen.getByRole("tooltip", {
            title: /Are you sure you want to delete this item?/i,
        })
        expect(confirmToolTip).toBeInTheDocument()

        expect(deleteButton).toContainElement(trashIcon)
        expect(deleteButton).toBeDisabled()

        const cancelText = screen.getByText(/cancel/i)
        expect(cancelText).toBeInTheDocument()
        expect(cancelText.parentElement).toHaveProperty("type", "button")

        const okText = screen.getByText(/ok/i)
        expect(okText).toBeInTheDocument()
        expect(okText.parentElement).toHaveProperty("type", "button")
    })

    test("When closed it doesn't have the tooltip nodes (and button is not disabled)", async () => {
        render(closedDeleteToDoButton)

        const deleteButton = screen.getByRole("button", { name: /delete/i })
        const confirmToolTip = screen.queryByRole("tooltip")

        expect(confirmToolTip).not.toBeInTheDocument()
        expect(deleteButton).not.toBeDisabled()
    })

    test("When delete button is clicked it should remove notifications", () => {
        render(closedDeleteToDoButton)
        const deleteButton = screen.getByRole("button", {
            name: /delete item/i,
        })
        expect(deleteButton).toBeInTheDocument()

        let confirmToolTip = screen.queryByRole("tooltip")
        expect(confirmToolTip).not.toBeInTheDocument()

        userEvent.click(deleteButton)

        expect(removeAllNotifications).toBeCalledTimes(1)
    })

    test("When confirm button is clicked in the tooltip, it should call the removeItem callback prop", () => {
        render(openedDeleteToDoButton)
        const okText = screen.getByText(/ok/i)
        const confirmButton = okText.parentElement
        userEvent.click(confirmButton)
        expect(removeItem).toBeCalledWith(id)
    })
})
