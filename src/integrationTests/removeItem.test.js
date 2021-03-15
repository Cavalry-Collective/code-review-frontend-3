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

test("Add then Remove Item", async () => {
    sometimesRejects.mockReturnValue({ isRejected: false, errorMessage: null })

    render(<App />)
    await waitFor(() =>
        expect(screen.getByText(/things to do/i)).toBeInTheDocument()
    )

    const inputField = screen.getByRole("textbox", {
        placeholder: /what do you need to do?/i,
    })

    userEvent.type(inputField, newToDoMessage)

    const addButton = screen.getByRole("button", { name: /add/i })

    userEvent.click(addButton)

    await waitForElementToBeRemoved(() => screen.getByText(/syncing server/i), {
        timeout: 5000,
    })

    const deleteButton = screen.getByRole("button", { name: /delete/i })

    userEvent.click(deleteButton)

    expect(
        screen.getByText(/Are you sure you want to delete this item?/i)
    ).toBeInTheDocument()

    const okText = screen.getByText(/ok/i)
    expect(okText).toBeInTheDocument()
    expect(okText.parentElement).toHaveProperty("type", "button")

    userEvent.click(okText.parentElement)

    await waitForElementToBeRemoved(() => screen.getByText(newToDoMessage), {
        timeout: 5000,
    })

    expect(screen.getByText(/request successful/i)).toBeInTheDocument()
})
