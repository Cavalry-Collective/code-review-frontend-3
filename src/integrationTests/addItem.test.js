import {
    render,
    screen,
    waitFor,
    waitForElementToBeRemoved,
} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import App from "../App"

import { sometimesRejects, wait } from "../hooks/utils"
jest.mock("../hooks/utils")

const newToDoMessage = "I'm the new todo message"
test("Add item", async () => {
    sometimesRejects.mockReturnValue({ isRejected: false, errorMessage: null })
    wait.mockReturnValue(null)

    render(<App />)
    await waitFor(() =>
        expect(screen.getByText(/things to do/i)).toBeInTheDocument()
    )

    const inputField = screen.getByPlaceholderText(/what do you need to do?/i)
    expect(inputField).toBeInTheDocument()
    expect(inputField).toHaveAttribute("type", "text")
    expect(inputField).toHaveAttribute("value", "")

    expect(
        screen.queryByRole("button", { name: newToDoMessage })
    ).not.toBeInTheDocument()

    userEvent.type(inputField, newToDoMessage)

    const filledInputField = screen.getByPlaceholderText(
        /what do you need to do?/i
    )

    expect(filledInputField).toBeInTheDocument()
    expect(filledInputField).toHaveAttribute("type", "text")
    expect(filledInputField).toHaveAttribute("value", newToDoMessage)

    const addButton = screen.getByRole("button", { name: /add/i })
    expect(addButton).toBeInTheDocument()
    expect(addButton).not.toBeDisabled()

    userEvent.click(addButton)
    expect(screen.getByText(/syncing server/i)).toBeInTheDocument()

    await waitForElementToBeRemoved(() => screen.getByText(/syncing server/i))

    expect(screen.getByText(/request successful!/i)).toBeInTheDocument()
    expect(
        screen.getByRole("button", { name: newToDoMessage })
    ).toBeInTheDocument()
})
