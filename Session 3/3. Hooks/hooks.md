---

### What Are Hooks in React?

**Hooks** are special functions introduced in **React 16.8** that allow functional components to use features like state, lifecycle methods, and context, which were previously only available in class components.

---

### Why Hooks?

Before hooks, React developers had to use class components to manage state and handle lifecycle events. Hooks enable these capabilities in functional components, resulting in cleaner and more reusable code.

---

### Common Built-in Hooks:

| Hook Name           | Purpose                                                         |
| ------------------- | --------------------------------------------------------------- |
| `useState()`        | Adds state to a functional component                            |
| `useEffect()`       | Performs side effects such as data fetching or DOM manipulation |
| `useContext()`      | Accesses global data from React Context                         |
| `useRef()`          | Creates references to DOM elements or stores mutable values     |
| `useMemo()`         | Optimizes performance by memoizing expensive calculations       |
| `useCallback()`     | Prevents unnecessary re-creation of functions                   |
| `useReducer()`      | Manages complex state logic in a component                      |
| `useLayoutEffect()` | Like `useEffect`, but fires before the browser paints           |

---

### Example: `useState` and `useEffect`

```jsx
import React, { useState, useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0); // State Hook

  useEffect(() => {
    console.log("Component rendered or count changed!");
  }, [count]); // Effect Hook

  return (
    <div>
      <p>You clicked {count} times.</p>
      <button onClick={() => setCount(count + 1)}>Click me!</button>
    </div>
  );
}
```

---

### Summary

- Hooks let you use state, lifecycle methods, and context in functional components.
- They simplify the structure of your components and enable code reuse through custom hooks.
- Modern React development encourages using functional components with hooks instead of class components.
