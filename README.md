# To Do Client

## Objective

-   [x] Write a web app to manage a To-Do List

## Preview

![ezgif com-gif-maker](https://user-images.githubusercontent.com/1670421/111079608-a3097900-8535-11eb-9a09-816875d8eb03.gif)

## Requirements

-   [x] Allows a user to manage a To-Do list (CRUD)
-   [x] View To-Do items
-   [x] Add a new To-Do item to the list
-   [x] Edit a To-Do item
-   [x] Remove a To-Do from the list
-   [x] When page is refreshed, list will not be reset
-   [ ] Fetch and save data to Node.js server using GraphQL
    -   Important! Currently using a custom hook that simulates interacting with a backend. It uses local storage, `setTimeOut` for delay (350ms), and `20%` chance the request will fail with `Math.random()`. For more information see the source code for the custom[`mockFetchToDoList`](./src/hooks/index.js) hook.

## Specifications

-   [ ] PRIORITY: Write unit tests and integration tests, e.g, Jest, react-testing-library
-   [x] Write front-end using React and JavaScript
-   [x] Design using Ant Design UI components
-   [x] Follow proper code styles (e.g. Airbnb Javascript style guide)
-   [x] Use linting
-   [x] Use static type checking, e.g. Typescript, Flow, Proptypes
-   [ ] For back-end, write GraphQL endpoints using Apollo Server
-   [x] (Optional) Deploy
-   [ ] (Optional) Secure backend endpoints with OAuth2

# Submission Guidelines

-   [x] Application should be runnable using npm start command
-   [x] Please host code in a public repository on GitHub
