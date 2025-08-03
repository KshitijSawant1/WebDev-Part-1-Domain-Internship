import React, { useState, useEffect } from "react";

const Intro = () => {
  // 1. State and Props
  const [message, setMessage] = useState("Hello from Parent");

  // 2. useState Hook
  const [count, setCount] = useState(0);

  // 3. useEffect Hook
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 4. Data Passing with Props Component
  const Child = ({ text }) => (
    <p style={{ color: "green" }}>👶 Child Received: {text}</p>
  );

  // 5. Mapping Data
  const fruits = ["🍎 Apple", "🍌 Banana", "🍇 Grape"];

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1 style={{ color: "#003366" }}>🚀 React Basics - All in One Page</h1>

      {/* 1. State and Props */}
      <section>
        <h2>1️⃣ State & Props</h2>
        <Child text={message} />
        <button onClick={() => setMessage("Updated from Parent!")}>
          Change Prop
        </button>
      </section>

      <hr />

      {/* 2. useState Hook */}
      <section>
        <h2>2️⃣ useState</h2>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>➕ Increment</button>
        <button onClick={() => setCount(count - 1)}>➖ Decrement</button>
      </section>

      <hr />

      {/* 3. useEffect Hook */}
      <section>
        <h2>3️⃣ useEffect</h2>
        <p>⏱ Timer: {timer} seconds</p>
      </section>

      <hr />

      {/* 4. Data Passing */}
      <section>
        <h2>4️⃣ Passing Props</h2>
        <Child text="This is passed from another section!" />
      </section>

      <hr />

      {/* 5. Mapping */}
      <section>
        <h2>5️⃣ Mapping Array</h2>
        <ul>
          {fruits.map((fruit, index) => (
            <li key={index}>{fruit}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Intro;
