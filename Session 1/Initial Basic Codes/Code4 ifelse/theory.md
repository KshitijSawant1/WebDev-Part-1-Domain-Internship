# Conditional Statements in Node.js: `if`, `else`, and `else if`

Conditional statements are used to **make decisions** in a program based on certain conditions. In JavaScript (and Node.js), the most commonly used conditional structures are:

- `if`
- `else`
- `else if`

These allow the program to execute different blocks of code depending on whether a condition is true or false.

## Basic Syntax

```js
if (condition) {
  // Code to run if the condition is true
} else if (anotherCondition) {
  // Code to run if the previous condition is false, but this one is true
} else {
  // Code to run if none of the above conditions are true
}

### Example1: Check if a Number is Even or Odd (With Comments)

```js
```
// Declare a variable and assign it a number
let number = 7;

// Check if the number is divisible by 2
if (number % 2 === 0) {
  // If the remainder is 0, it's an even number
  console.log(`${number} is even`);
} else {
  // If the remainder is not 0, it's an odd number
  console.log(`${number} is odd`);
}

### Example2: Check if a Number is Positive, Negative, or Zero (With Comments)

```js
// Take the third command-line argument and convert it to an integer
let num = parseInt(process.argv[2]);

// Check if the input is NOT a number
if (isNaN(num)) {
  // If input is not a number, show an error message
  console.log("Please provide a valid number.");
} else if (num > 0) {
  // If the number is greater than 0, it's positive
  console.log(`${num} is positive`);
} else if (num < 0) {
  // If the number is less than 0, it's negative
  console.log(`${num} is negative`);
} else {
  // If the number is exactly 0
  console.log(`The number is zero`);
}
```
- process.argv[2]: Reads the third item in the command-line arguments (after node and filename).
- parseInt(...): Converts the string input into an integer.
- isNaN(...): Checks if the value is not a number.
