import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import ItemView from "."
import { removeAllNotifications } from "../notifications"
jest.mock("../notifications")

const item = {
    title: "doesn't matter",
    id: "doesn't matter as long as it's unique",
    completed: Math.random() > 0.5 ? true : false,
}

const removeItem = jest.fn()
const updateItem = jest.fn()
const setEditMode = jest.fn()
const setTrashToolTip = jest.fn()

const viewModeToDoItemTrashToolTipClosed = (
    <ItemView
        {...{
            item,
            removeItem,
            updateItem,
            setEditMode,
            setTrashToolTip,
            isEditMode: false,
            isTrashToolTipOpen: false,
        }}
    />
)

const viewModeToDoItemTrashToolTipOpen = (
    <ItemView
        {...{
            item,
            removeItem,
            updateItem,
            setEditMode,
            setTrashToolTip,
            isEditMode: false,
            isTrashToolTipOpen: true,
        }}
    />
)

const editModeToDoItem = (
    <ItemView
        {...{
            item,
            removeItem,
            updateItem,
            setEditMode,
            setTrashToolTip,
            isEditMode: true,
            isTrashToolTipOpen: false,
        }}
    />
)

describe("ToDoListItem", () => {
    test("Render the expected html elements when in edit mode and nothing more", () => {
        render(editModeToDoItem)

        const inputField = screen.getByRole("textbox")
        expect(inputField).toBeInTheDocument()

        const saveButton = screen.getByRole("button", { name: /save/i })
        expect(saveButton).toBeInTheDocument()

        const cancelButton = screen.getByRole("button", {
            name: /cancel/i,
        })
        expect(cancelButton).toBeInTheDocument()

        const checkbox = screen.queryByRole("checkbox")
        expect(checkbox).not.toBeInTheDocument()

        const titleButton = screen.queryByRole("button", { name: item.title })
        expect(titleButton).not.toBeInTheDocument()

        const deleteButton = screen.queryByRole("button", { name: /delete/i })
        expect(deleteButton).not.toBeInTheDocument()

        const editButton = screen.queryByRole("button", { name: /edit/i })
        expect(editButton).not.toBeInTheDocument()

        const trashToolTip = screen.queryByRole("tooltip", {
            title: "Are you sure you want to delete this item?",
        })
        expect(trashToolTip).not.toBeInTheDocument()
    })

    test("Render the expected html elements when in view mode (and trash tooltip is open) and nothing more", () => {
        render(viewModeToDoItemTrashToolTipOpen)

        const checkbox = screen.getByRole("checkbox")
        expect(checkbox).toBeInTheDocument()

        const titleButton = screen.getByRole("button", {
            name: item.title,
        })
        expect(titleButton).toBeInTheDocument()

        const editButton = screen.getByRole("button", { name: /edit/i })
        expect(editButton).toBeInTheDocument()

        const deleteButton = screen.getByRole("button", {
            name: /delete item/i,
        })
        expect(deleteButton).toBeInTheDocument()

        const trashToolTip = screen.getByRole("tooltip", {
            title: "Are you sure you want to delete this item?",
        })
        expect(trashToolTip).toBeInTheDocument()

        const inputField = screen.queryByRole("textbox")
        expect(inputField).not.toBeInTheDocument()

        const saveButton = screen.queryByRole("button", { name: /save/i })
        expect(saveButton).not.toBeInTheDocument()
    })

    test("Render the expected html when  in view mode (and trash tooltip is closed) and nothing more", () => {
        render(viewModeToDoItemTrashToolTipClosed)

        const checkbox = screen.getByRole("checkbox")
        expect(checkbox).toBeInTheDocument()

        const titleButton = screen.getByRole("button", {
            name: item.title,
        })
        expect(titleButton).toBeInTheDocument()

        const editButton = screen.getByRole("button", { name: /edit/i })
        expect(editButton).toBeInTheDocument()

        const deleteButton = screen.getByRole("button", { name: /delete/i })
        expect(deleteButton).toBeInTheDocument()

        const trashToolTip = screen.queryByRole("tooltip", {
            title: "Are you sure you want to delete this item?",
        })

        expect(trashToolTip).not.toBeInTheDocument()

        const inputField = screen.queryByRole("textbox")
        expect(inputField).not.toBeInTheDocument()

        const saveButton = screen.queryByRole("button", { name: /save/i })
        expect(saveButton).not.toBeInTheDocument()
    })

    test("Trigger the expected callbacks when check box is clicked (trash tooltip is closed)", () => {
        render(viewModeToDoItemTrashToolTipClosed)
        const checkbox = screen.getByRole("checkbox", { title: item.title })
        userEvent.click(checkbox)

        expect(updateItem).toHaveBeenCalledTimes(1)
        expect(setEditMode).toHaveBeenCalledTimes(1)
        expect(setEditMode).toHaveBeenCalledWith(null)
        expect(removeAllNotifications).toHaveBeenCalledTimes(1)
    })

    test("Trigger the expected callbacks when check box is clicked (trash tooltip is open)", () => {
        render(viewModeToDoItemTrashToolTipOpen)
        const checkbox = screen.getByRole("checkbox", { title: item.title })
        userEvent.click(checkbox)

        expect(updateItem).toHaveBeenCalledTimes(1)
        expect(setEditMode).toHaveBeenCalledTimes(1)
        expect(setEditMode).toHaveBeenCalledWith(null)
        expect(setTrashToolTip).toHaveBeenCalledTimes(1)
        expect(setTrashToolTip).toHaveBeenCalledWith(null)
        expect(removeAllNotifications).toHaveBeenCalledTimes(1)
    })

    test("Trigger the expected callbacks when clickable title is clicked (trash tooltip is closed)", () => {
        render(viewModeToDoItemTrashToolTipClosed)
        const titleButton = screen.getByRole("button", { name: item.title })
        userEvent.click(titleButton)
        expect(setEditMode).toHaveBeenCalledTimes(1)
        expect(setEditMode).toHaveBeenCalledWith(item.id)
        expect(removeAllNotifications).toHaveBeenCalledTimes(1)
    })

    test("Trigger the expected callbacks when clickable title is clicked (trash tooltip is open)", () => {
        render(viewModeToDoItemTrashToolTipOpen)
        const titleButton = screen.getByRole("button", { name: item.title })
        userEvent.click(titleButton)
        expect(setEditMode).toHaveBeenCalledTimes(1)
        expect(setEditMode).toHaveBeenCalledWith(item.id)
        expect(setTrashToolTip).toHaveBeenCalledTimes(1)
        expect(setTrashToolTip).toHaveBeenCalledWith(null)
        expect(removeAllNotifications).toHaveBeenCalledTimes(1)
    })
})
