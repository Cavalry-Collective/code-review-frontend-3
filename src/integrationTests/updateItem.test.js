import {
    render,
    screen,
    waitFor,
    waitForElementToBeRemoved,
} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import App from "../App"

import { sometimesRejects } from "../hooks/utils"
jest.mock("../hooks/utils")

global.matchMedia =
    global.matchMedia ||
    function () {
        return {
            addListener: jest.fn(),
            removeListener: jest.fn(),
        }
    }

const newToDoMessage = "I'm the new todo message"
const updatedToDoMessage = "I'm the updated to do message"

test("Add then Update item", async () => {
    sometimesRejects.mockReturnValue({ isRejected: false, errorMessage: null })

    render(<App />)
    await waitFor(() =>
        expect(screen.getByText(/things to do/i)).toBeInTheDocument()
    )

    // add one item

    const inputField = screen.getByRole("textbox", {
        placeholder: /what do you need to do?/i,
    })

    userEvent.type(inputField, newToDoMessage)

    const addButton = screen.getByRole("button", { name: /add/i })

    userEvent.click(addButton)

    await waitForElementToBeRemoved(() => screen.getByText(/syncing server/i), {
        timeout: 5000,
    })

    const editTaskButton = screen.getByRole("button", { name: /edit/i })

    userEvent.click(editTaskButton)

    const editInputField = screen.getByDisplayValue(newToDoMessage)
    expect(editInputField).toBeInTheDocument()
    expect(editInputField).toHaveProperty("type", "text")
    expect(editInputField).toHaveAttribute("value", newToDoMessage)
    expect(editInputField).toHaveAttribute("placeholder", newToDoMessage)

    editInputField.setSelectionRange(0, newToDoMessage.length)
    userEvent.type(editInputField, "{del}")

    const blankInputField = screen.getByPlaceholderText(newToDoMessage)
    expect(blankInputField).toBeInTheDocument()
    expect(blankInputField).toHaveProperty("type", "text")
    expect(blankInputField).toHaveAttribute("value", "")

    userEvent.type(blankInputField, updatedToDoMessage)

    const updatedInputField = screen.getByDisplayValue(updatedToDoMessage)
    expect(updatedInputField).toBeInTheDocument()
    expect(updatedInputField).toHaveAttribute("value", updatedToDoMessage)
    expect(updatedInputField).toHaveAttribute("placeholder", newToDoMessage)

    const saveButton = screen.getByRole("button", { name: /save/i })

    userEvent.click(saveButton)

    await waitForElementToBeRemoved(() => screen.getByText(newToDoMessage), {
        timeout: 5000,
    })

    expect(screen.getByText(/request successful/i)).toBeInTheDocument()
    expect(screen.getByText(updatedToDoMessage)).toBeInTheDocument()
})