# Week 5-6: Persistent To-Do List with Clean Code Practices

## Author
- **Name:** Christine Kay
- **GitHub:** [Kaywambui-1](https://github.com/kaywambui-1/)
- **Date:** August 2, 2026

## Project Description
A to-do list web app that lets users add, complete, edit, filter, and delete tasks, with all data persisted to the browser's localStorage so nothing is lost on refresh. The project was progressively upgraded from a single-file script into a modular, linted, formatted, and unit-tested codebase following clean code practices.

## Technologies Used
- HTML5
- CSS3
- JavaScript (ES Modules)
- localStorage / sessionStorage
- ESLint (code quality linting)
- Prettier (code formatting)
- Vitest (unit testing)
- Git & GitHub

## Features
- Add, complete, edit (double-click), and delete todos
- Filter tasks by All / Active / Completed, with filter preference saved
- Persistent storage — todos and filter selection survive page refresh via localStorage
- "Clear Completed" button to remove all finished tasks at once
- Items-left counter that updates in real time
- Modular code structure (`storage.js`, `state.js`, `ui.js`, `app.js`) following single-responsibility principle
- Automated unit tests for extracted pure functions (`getRemainingCount`, `applyFilter`)
- Linted with ESLint (`eqeqeq`, `no-unused-vars`, `prefer-const`, `curly` rules enforced)
- Formatted consistently with Prettier

## How to Run
1. Clone this repository
2. Open `to-dolist_app/mini-project.html` in your browser
  
## Lessons Learned
- How localStorage and sessionStorage differ, and when to use each (localStorage for long-term preferences, sessionStorage for temporary per-tab data)
- The importance of separating "data logic" from "DOM/display logic" — splitting one large script into `storage.js`, `state.js`, and `ui.js` made the code far easier to reason about and test
- How JavaScript modules (`import`/`export`) connect separate files together, and why `type="module"` is required in the HTML script tag
- Writing pure functions specifically so they can be tested in isolation, without needing a real browser or DOM
- How to use ESLint and Prettier to catch bugs early (like loose equality or unused variables) and keep formatting consistent
- How to debug using breakpoints in Chrome DevTools — pausing execution and inspecting live variable values, rather than relying only on `console.log`

## Challenges Faced
- Ran into a Windows PowerShell execution policy error blocking `npm` from running, resolved with `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`
- Hit a variable "shadowing" bug where a function-local `todos` variable wasn't syncing with the outer `todos` used for rendering — fixed by re-syncing state inside `renderTodos()`
- Accidentally duplicated content in `eslint.config.mjs` while editing, causing a "Identifier already declared" error — fixed by cleanly replacing the file with a single valid config
- Had to adjust file paths in npm scripts (`lint`, `format`) since the project's JS lives inside a nested `to-dolist_app/js/` folder rather than the default `src/`

