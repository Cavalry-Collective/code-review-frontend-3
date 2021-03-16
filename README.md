# To Do Client [![View Deployed Site](https://img.shields.io/badge/View%20-Deployed%20Site-orange.svg?logo=react&color=0abde3)](https://to-do-client.vercel.app/) [![maintainability](https://api.codeclimate.com/v1/badges/ce7b5dae8d6915a5c1c9/maintainability)](https://codeclimate.com/github/mithi/to-do-client/maintainability) [![technical debt](https://img.shields.io/codeclimate/tech-debt/mithi/to-do-client)](https://codeclimate.com/github/mithi/to-do-client/trends/technical_debt) [![codecov](https://codecov.io/gh/mithi/to-do-client/branch/main/graph/badge.svg?token=ANnMERhmFY)](https://codecov.io/gh/mithi/to-do-client) ![Main Passing](https://github.com/mithi/hexapod-kinematics-library/workflows/main/badge.svg)

## Objective

-   [x] Write a web app to manage a To-Do List
-   [x] Finish within 72 hours
-   https://to-do-client.vercel.app/

## Notes

Important! Currently using a custom hook that simulates interacting with a backend. It uses local storage, `setTimeOut` for delay (350ms), and `20%` chance the request will fail with `Math.random()`. For more information, checkout the source code for the custom [`mockFetchToDoList`](./src/hooks/index.js) hook.
Mr Chan told me that implementing the graphql backend is optional, I wrote some [backend](https://github.com/mithi/quick-and-dirty) code , but I decided that instead of juggling the two, I wanted to focus on creating a frontend I'm proud of, given the limited time! 

## Preview

![To Do App Client](https://user-images.githubusercontent.com/1670421/111079608-a3097900-8535-11eb-9a09-816875d8eb03.gif)

## Requirements

-   [x] Allows a user to manage a To-Do list (CRUD)
-   [x] View To-Do items
-   [x] Add a new To-Do item to the list
-   [x] Edit a To-Do item
-   [x] Remove a To-Do from the list
-   [x] When page is refreshed, list will not be reset
-   [ ] Fetch and save data to Node.js server using GraphQL
      - As said earlier, using a custom hook that simulates interacting with a backend. It uses local storage, `setTimeOut` for delay (350ms), and `20%` chance the request will fail with `Math.random()`. For more information, checkout the source code for the custom [`mockFetchToDoList`](./src/hooks/index.js) hook. A [quick and dirty backend can be found here](https://github.com/mithi/quick-and-dirty), but it's not at all connected to this app. 


## Specifications

-   [x] Write unit tests and integration tests, e.g, Jest, react-testing-library
-   [x] Write front-end using React and JavaScript
-   [x] Design using Ant Design UI components
-   [x] Follow proper code styles (e.g. Airbnb Javascript style guide)
-   [x] Use linting
-   [x] Use static type checking, e.g. Typescript, Flow, Proptypes
-   [x] For back-end, write GraphQL endpoints using Apollo Server
     - When I spoke ko Mr Chan, he said this was optional, and just play around this if I'm feeling adventurous :D 
     - https://github.com/mithi/quick-and-dirty (I crammed this in under an hour, it's not connected to the app)
-   [x] (Optional) Deploy
      - https://to-do-client.vercel.app/ 
      - https://quick-and-dirty-to-do.herokuapp.com/graphql
      - (quick and dirty bare minimum graphql api for todo app) 
-   [ ] (Optional) Secure backend endpoints with OAuth2

## Submission Guidelines

-   [x] Application should be runnable using npm start command
-   [x] Please host code in a public repository on GitHub

## A Few Tests (83% coverage)

![A Few Tests](https://user-images.githubusercontent.com/1670421/111230300-5780c900-8622-11eb-8311-bc102c01122e.png)
![Coverage](https://user-images.githubusercontent.com/1670421/111236476-e6dfa980-862d-11eb-9f59-bb028d980837.png)
