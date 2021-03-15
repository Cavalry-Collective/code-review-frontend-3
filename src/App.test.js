import { render, screen } from "@testing-library/react"
import App from "./App"
import { useMockFetchToDo } from "./hooks"

// https://stackoverflow.com/questions/64813447/cannot-read-property-addlistener-of-undefined-react-testing-library
// https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom

global.matchMedia =
    global.matchMedia ||
    function () {
        return {
            addListener: jest.fn(),
            removeListener: jest.fn(),
        }
    }

// ALTERNATIVELY

/*delete window.matchMedia
window.matchMedia = query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
})
*/

const INITIAL_TODO_LIST = [
    {
        title: "Finish KCD Epic React Course",
        completed: false,
        id: "1615786227593",
    },
]

const USE_FETCH_TODO_RETURN_VALUE = [
    INITIAL_TODO_LIST,
    {
        updateItem: () => {},
        addItem: () => {},
        removeItem: () => {},
        reset: () => {},
        retry: () => {},
    },
    {
        isLoading: false,
        isSuccess: true,
        isError: false,
        isIdle: true,
        errorMessage: null,
    },
]

jest.mock("./hooks")

test("Renders To Do Title", async () => {
    useMockFetchToDo.mockReturnValue(USE_FETCH_TODO_RETURN_VALUE)
    render(<App />)
    const textNode = screen.getByText(/things to do/i)
    expect(textNode).toBeInTheDocument()
})
