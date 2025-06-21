✅ Great question — let’s see how **swapping works with `const`**, and why it's tricky!

---

### ⚠️ **`const` variables can’t be reassigned**

```js
const a = 5;
const b = 10;

// Trying to swap:
const temp = a; // OK to declare new const
a = b; // ❌ Error: Assignment to constant variable
b = temp; // ❌ Error: Assignment to constant variable
```

👉 **Result:** ❌ The code throws an error — because `const` means you _cannot change_ the value of `a` or `b` once they’re assigned.

---

### 🚀 **What _can_ work with `const`?**

If you're dealing with objects or arrays (because `const` locks the reference, not the internal contents):

```js
const arr = [5, 10];
console.log(`Before swap: ${arr[0]}, ${arr[1]}`);

[arr[0], arr[1]] = [arr[1], arr[0]]; // ✅ Works

console.log(`After swap: ${arr[0]}, ${arr[1]}`);
```

✅ **Output:**

```
Before swap: 5, 10
After swap: 10, 5
```

👉 _We didn’t reassign `arr`; we just changed its contents, which is allowed._

---

### 🌟 **Key takeaway**

➡ `const` variables **cannot be reassigned** (no swapping of primitive values).
➡ You can modify _internal contents_ of a `const` array or object.

---

If you want, I can give a **practice task** or a **quiz question** for this! Want that?

✅ Sure! Let’s see **exact code examples** that clearly demonstrate this difference:

---

### 🚀 **`const` → Must be initialized when declared**

```js
const x; // ❌ Error: Missing initializer in const declaration
x = 10;
console.log(x);
```

👉 This will immediately throw an error because `const` requires a value at the moment of declaration.

✅ Correct `const` usage:

```js
const y = 10;
console.log(y); // ✅ Works: 10
```

---

### 🚀 **`let` → Can be declared first, assigned later**

```js
let a;        // ✅ OK: declared without value
a = 20;       // assigned later
console.log(a); // Output: 20
```

---

⚡ **Summary:**

* `const` → `const name = value;` → value must be given *immediately*.
* `let` → `let name;` → value can be given *later*.

---

👉 Let me know if you'd like a mini student task to practice this!
