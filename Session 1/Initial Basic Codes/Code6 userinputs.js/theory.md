# Accepting User Input in Node.js using `readline`

Node.js doesn't have a built-in `prompt()` function like browsers do. Instead, we use the built-in **`readline` module** to accept interactive input from the user via the terminal.

## Code Example: `inputReadline.js`

```js
// save as inputReadline.js

const readline = require('readline');

// Create an interface for reading input and displaying output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
// Ask the user a question
rl.question('What is your name? ', function(name) {
  // Print a greeting using the input value
  console.log(`Hello, ${name}!`);
  // Close the input interface
  rl.close();
});

## Concept Breakdown

### `const readline = require('readline');`
- Loads Node.js’s built-in **`readline`** module.
- This module allows reading input from the terminal (command line).
- Enables interactive user input in Node.js programs.

### `readline.createInterface({...})`
- Creates an **interface** to handle input and output.
- Used to read from the keyboard and write to the screen.
  
### **Parameters:**
- `input: process.stdin` → Reads user input from the terminal.
- `output: process.stdout` → Prints output to the terminal.
  
### `rl.question('Question?', callback)`
- Prompts the user with a question.
- Waits for the user to type a response and hit Enter.
- The response is passed to the **callback function**.

**Example:**
```js
rl.question('What is your name? ', function(name) {
  console.log(`Hello, ${name}`);
});
```
### rl.close()
Closes the readline interface after input is received.

Prevents the program from waiting for further input.

## Summary

| Concept           | Explanation                                 |
|-------------------|---------------------------------------------|
| `readline`        | Module for interactive command-line input   |
| `createInterface` | Sets up input/output streams                |
| `rl.question()`   | Prompts user and waits for input            |
| `rl.close()`      | Closes input stream after receiving input   |