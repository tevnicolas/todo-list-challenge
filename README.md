# Todo List by Tev Nicolas

Todo List is a simple and interactive todo list application built with React, TypeScript, Vite, and Tailwind CSS. The app allows users to add, complete, and delete tasks, as well as filter tasks based on their completion status.

## Features Implemented from Challenge Directions

1) Created ToDo Application that supports the following:
  a. Adding new tasks
  b. Marking tasks as done
  c. Listing all tasks
  d. Show a visual cue to differentiate active from completed tasks

2) Allow tasks to be removed (not just marked as done).
3) Allows filtering tasks by status (done/undone).
4) Made the application beautiful with TailwindCSS
5) Optional Features implemented:
  a. Allows receiving an initial JSON object
  b. Persists application state and persists on refresh using localStorage
  e. Added a “remove completed tasks” button.
  f. Allow manual re-ordering of tasks using drag and drop.
  h. Add extra keyboard navigation to improve accessibility:
    i. Enter key while writing a new task adds it to the list.
    ii. Pressing up/down arrows having a task focused allows reordering.
    iii. Tasks can be marked as done/undone using 'x' key.



## Technologies Used / Prerequisites

- **React**: A JavaScript library for building user interfaces
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript
- **Vite**: A fast and optimized build tool for modern web projects
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development
- Also needed: Node.js, npm

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.


### Installation / Running the Application

1. Clone the repository

2. Install dependencies with 'npm i'

3. Start the development server

    ```sh
    npm run dev
    ```

    or

    ```sh
    yarn dev
    ```

4. Open your browser and navigate to the localhost link

### Building for Production

1. Build the project

    ```sh
    npm run build
    ```

    or

    ```sh
    yarn build
    ```

2. Deploy the contents of the `dist` directory to your preferred hosting service

### Deploying to GitHub Pages

1. Update the `vite.config.js` file to set the correct base path

    ```javascript
    // vite.config.js
    export default {
      base: '/focus360-todo-list/',
      // other config options...
    }
    ```

2. Deploy using `gh-pages`

    ```sh
    npx gh-pages -d dist
    ```

## Acknowledgements

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
