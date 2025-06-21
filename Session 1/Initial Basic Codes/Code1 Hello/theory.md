### Printing Output in JavaScript Using `console.log()`

In JavaScript, the `console.log()` method is used to **print or display output** in the console. It is one of the most commonly used tools for testing and debugging code.

### Syntax

```js
console.log(data);
### 🧾 Explanation of `console.log()`

- **`console`** refers to the **browser developer console** (in client-side JavaScript) or the **terminal/command line console** (in Node.js). It is a built-in object used for outputting messages.

- **`log()`** is a method of the `console` object. It is used to **display messages, data, or results** on the console for debugging or informational purposes.

- **`data`** can be any type of value including:
  - A **string** (`"Hello"`),
  - A **number** (`100`),
  - A **variable** (`let name = "John"`),
  - An **array** (`[1, 2, 3]`),
  - An **object** (`{ key: "value" }`),
  - Or any **expression** (`5 + 3`, `name.length`, etc.).
```
let city = "Mumbai";
let temperature = 34;

console.log("City:", city);               // Output: City: Mumbai
console.log("Temperature is", temperature, "degrees"); // Output: Temperature is 34 degrees
console.log("Temperature in " + city + " is " + temperature + "°C");
console.log(`Temperature in ${city} is ${temperature}°C`);

