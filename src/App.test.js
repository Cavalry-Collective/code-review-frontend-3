import { render, screen } from "@testing-library/react"
import App from "./App"

test("renders learn react link", () => {
    render(<App />)
    const textNode = screen.getByText(/things to do!/i)
    expect(textNode).toBeInTheDocument()
})
