import { render, screen } from "@testing-library/react"
import EditView from "."
import userEvent from "@testing-library/user-event"

const updateItem = jest.fn()
const setEditMode = jest.fn()
const setTrashToolTip = jest.fn()

const oldItem = {
    id: "doesn't matter",
    title: "doesn't matter",
    completed: Math.random() > 0.5 ? true : false,
}

const newTitle = "the new title"

describe("EditView", () => {
    test("Typing a new title and clicking the save button updates the item and goes out of edit mode", async () => {
        render(
            <EditView
                {...{ item: oldItem, updateItem, setEditMode, setTrashToolTip }}
            />
        )

        const inputField = screen.getByRole("textbox")
        expect(inputField).toBeInTheDocument()
        userEvent.type(inputField, newTitle)

        userEvent.click(screen.getByRole("button", { name: /save/i }))
        expect(updateItem).toHaveBeenCalledTimes(1)
        expect(setEditMode).toHaveBeenCalledTimes(1)
        expect(setEditMode).toHaveBeenCalledWith(null)
    })

    test("Clicking the cancel button removes edit mode  and does not update item", async () => {
        render(
            <EditView
                {...{ item: oldItem, updateItem, setEditMode, setTrashToolTip }}
            />
        )

        userEvent.click(screen.getByRole("button", { name: /cancel/i }))
        expect(updateItem).not.toHaveBeenCalled()
        expect(setEditMode).toHaveBeenCalledTimes(1)
        expect(setEditMode).toHaveBeenCalledWith(null)
    })
})
