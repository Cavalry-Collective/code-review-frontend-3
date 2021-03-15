import { render, screen } from "@testing-library/react"
import EditView from "."
import userEvent from "@testing-library/user-event"

const updateItem = jest.fn()
const setEditMode = jest.fn()

const oldItem = {
    id: "doesn't matter",
    title: "doesn't matter",
    completed: Math.random() > 0.5 ? true : false,
}

const newTitle = "the new title"

describe("EditView", () => {
    test("Clicking the save button `updateItem` prop", async () => {
        render(
            <EditView
                {...{
                    item: oldItem,
                    updateItem,
                    setEditMode,
                }}
            />
        )
        const inputField = screen.getByRole("textbox", {
            value: oldItem.title,
        })
        expect(inputField).toBeInTheDocument()
        userEvent.type(inputField, newTitle)

        userEvent.click(screen.getByRole("button", { name: /save/i }))
        expect(updateItem).toHaveBeenCalledTimes(1)
    })

    test("Clicking the cancel button `setViewMode` prop to set view mode to null", async () => {
        render(
            <EditView
                {...{
                    item: oldItem,
                    updateItem,
                    setEditMode,
                }}
            />
        )

        userEvent.click(screen.getByRole("button", { name: /cancel/i }))
        expect(setEditMode).toHaveBeenCalledTimes(1)
        expect(setEditMode).toHaveBeenCalledWith(null)
    })
})
