---

## 📘 What are Props in React?

**Props** (short for _properties_) are **mechanisms for passing data** from one component to another in **React**. They help make components **dynamic, configurable, and reusable**.

---

### 🔹 1. Purpose of Props

- **Component Communication**: Props enable data flow **from parent to child** component.
- **Customization**: A component can behave differently depending on the values passed as props.
- **Reusability**: The same component can be reused in different contexts with different prop values.

---

### 🔹 2. Characteristics of Props

| Feature          | Description                                                                |
| ---------------- | -------------------------------------------------------------------------- |
| **Immutable**    | Props **cannot be changed** by the child component that receives them.     |
| **Read-Only**    | They are like arguments to a function: only used, not modified internally. |
| **One-Way Flow** | Data flows **only from parent to child**, never the reverse.               |

---

### 🔹 3. How Props Work

Imagine you are using a function like this:

```jsx
function GreetUser(props) {
  return <p>Hello, {props.username}</p>;
}

function App() {
  return <GreetUser username="Kshitij" />;
}
```

In this example:

- `App` passes a `username` prop to the `GreetUser` component.
- `GreetUser` accesses it using `props.username`.
- Output: `Hello, Kshitij`.

---

### 🔹 4. Destructuring Props (Cleaner Syntax)

You can simplify:

```jsx
function GreetUser({ username }) {
  return <p>Hello, {username}</p>;
}
```

---

### 🔹 5. Props vs State

| Aspect      | Props              | State                         |
| ----------- | ------------------ | ----------------------------- |
| Modifiable? | ❌ No – Read-only  | ✅ Yes – Can be updated       |
| Scope       | Passed from parent | Local to the component        |
| Purpose     | For configuration  | For dynamic internal behavior |
| Example Use | Display username   | Track form input or count     |

---

### 🔹 6. When to Use Props

Use props when:

- You want to **display dynamic values** in a child component.
- You want to **reuse the same component** in multiple places with different data.
- You want to **pass callback functions** (event handlers) to children.

---

### 🔹 7. Passing Functions as Props

You can pass entire functions via props:

```jsx
function Button({ onClick, label }) {
  return <button onClick={onClick}>{label}</button>;
}

function App() {
  const sayHello = () => alert("Hello!");
  return <Button onClick={sayHello} label="Greet Me" />;
}
```

---

### 🔹 8. PropTypes (Optional Type Checking)

React offers a way to **type check props** using `prop-types` package:

```bash
npm install prop-types
```

```jsx
import PropTypes from "prop-types";

function GreetUser({ username }) {
  return <p>Hello, {username}</p>;
}

GreetUser.propTypes = {
  username: PropTypes.string.isRequired,
};
```

---

### 🔹 9. Default Props

You can provide default values for props:

```jsx
function Welcome({ name = "Guest" }) {
  return <h1>Welcome, {name}!</h1>;
}
```

---

### 🧠 Summary

- **Props** are essential for passing **data and behavior** into components.
- They enable **modular, reusable UI components**.
- Always remember: **props are immutable**, and their primary purpose is to customize component output from **outside**.
