### 🔁 The `for` Loop in JavaScript

The `for` loop is a control structure used to **repeat a block of code** a specific number of times. It is commonly used when the number of iterations is known in advance.

---

### 🧾 Syntax

```js
for (initialization; condition; increment) {
  // code to run in each iteration
}
- Initialization: Sets the starting value of the loop control variable.
- Condition: The loop runs as long as this condition is true.
- Increment: Updates the loop control variable after each iteration.
 
 Example: 
 for (let i = 1; i <= 5; i++) {
  console.log(`Number: ${i}`);
}
### Use Cases of the `for` Loop

- **Repeating a task a known number of times**  
  e.g., Printing a message 10 times

- **Printing number sequences**  
  e.g., Displaying numbers from 1 to 100

- **Looping through arrays with indexes**  
  e.g., Accessing elements in an array using `array[i]`

- **Generating patterns or calculations**  
  e.g., Printing stars `*` in triangle shapes, or generating multiplication tables