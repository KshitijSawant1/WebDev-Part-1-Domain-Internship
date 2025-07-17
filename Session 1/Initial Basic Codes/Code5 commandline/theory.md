# `commandLine.js` – Concepts & Explanation

- Accept input from the **command line**
- Convert input from **string to number**
- Validate inputs using **`isNaN()`**
- Use **`if-else` conditions**
- Display the **sum** of two valid numbers using **`console.log()`**

## Purpose of the Script
-The script accepts two numbers from the terminal, adds them, and displays the result.

-If the input is invalid (non-numeric), it shows an error message.

## Concepts Used

### 1. `process.argv`
- `process.argv` is an **array** containing the command-line arguments.
- It is available in all Node.js programs.

| Index            | What It Contains                            |
|------------------|---------------------------------------------|
| `process.argv[0]` | Path to the Node.js executable               |
| `process.argv[1]` | Path to the script file (e.g. `commandLine.js`) |
| `process.argv[2]` | First argument entered by the user           |
| `process.argv[3]` | Second argument entered by the user          |

### 2. `parseInt()`

- `parseInt()` is a built-in JavaScript function.
- It converts a **string** to an **integer**.
- Example:  
  ```js
  parseInt("10") // returns 10 (number)

``
### 3. isNaN()
- isNaN() stands for "is Not a Number".
- It checks if a value is not a number.
-Useful to validate inputs before doing calculations.
Example: