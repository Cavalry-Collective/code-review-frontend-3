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
test("Add item", async () => {
    sometimesRejects.mockReturnValue({ isRejected: false, errorMessage: null })

    render(<App />)
    await waitFor(() =>
        expect(screen.getByText(/things to do/i)).toBeInTheDocument()
    )

    const inputField = screen.getByRole("textbox", {
        placeholder: /what do you need to do?/i,
    })
    expect(inputField).toBeInTheDocument()

    expect(
        screen.queryByRole("button", { name: newToDoMessage })
    ).not.toBeInTheDocument()

    userEvent.type(inputField, newToDoMessage)

    const filledInputField = screen.getByRole("textbox", {
        placeholder: /what do you need to do?/i,
        value: newToDoMessage,
    })

    expect(filledInputField).toBeInTheDocument()

    const addButton = screen.getByRole("button", { name: /add/i })
    expect(addButton).toBeInTheDocument()
    expect(addButton).not.toBeDisabled()

    userEvent.click(addButton)
    expect(screen.getByText(/syncing server/i)).toBeInTheDocument()

    await waitForElementToBeRemoved(() => screen.getByText(/syncing server/i), {
        timeout: 5000,
    })

    expect(screen.getByText(/request successful!/i)).toBeInTheDocument()
    expect(
        screen.getByRole("button", { name: newToDoMessage })
    ).toBeInTheDocument()
})
