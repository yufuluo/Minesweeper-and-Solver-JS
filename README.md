# Minesweeper

Implemented by Qijun Liu

# Play Game

Open index.html in browser, and enjoy!

# Development

1. run `npm install` in your terminal
2. change the code under "src" directory
3. run `npm run build` in your terminal, which transpiles the code to es5 with babel and bundles the JS with webpack
4. refresh your browser

# Test

```sh
npm test
```

# Story

### Why React.js?  

First and most importantly, React.js is all about building composable components. In this project, encapsulated components such as <Cell /> can be built and reuse with React, which makes code more readable, easier to test and maintain.
Second, when data changes, React can automatically update the changed parts. For example, when a cell on the borad is clicked, only the cell itself (and its related parts) will be updated.
Besides, React is lightweight and simple. And it can work in the latest version of the major browsers (Chrome, Firefox, Safari, IE).

### Why ESLint?  

ESLint allows developers to create your own linting rules. It can help you discover problems with your JavaScript code without executing it. For team work, it makes sure everyone follows the same coding convention.

### Why separating solver from UI?  

The solver is separated from the UI part, and it only needs 2 parameters from UI: size and mines. So it works for any size and mines that you set in the input box.
At first, I tried to use the <Board /> component in solver, and simulated user clicking on the game board. But everytime when a cell was clicked in solver, a series of onclick and callback functions would be triggered, which led to a stack overflow rapidly. Therefore, I have to separate solver from UI.
