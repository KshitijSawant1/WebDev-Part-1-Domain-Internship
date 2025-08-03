// src/pages/Props.jsx
import React from "react";

// 1. Child Component accepting props
const GreetingCard = ({ name, message }) => {
  return (
    <div className="p-4 border rounded shadow mb-4">
      <h3 className="text-xl font-semibold">Hello, {name}!</h3>
      <p>{message}</p>
    </div>
  );
};

// 2. Card with nested content using children
const Container = ({ title, children }) => {
  return (
    <div className="border p-4 rounded-lg bg-blue-50 mb-6">
      <h2 className="font-bold text-lg mb-2">{title}</h2>
      {children}
    </div>
  );
};

// 3. Passing a function as a prop
const Button = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-800"
    >
      {label}
    </button>
  );
};

const Props = () => {
  const handleAlert = () => {
    alert("This alert came from a function passed as a prop!");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Understanding Props in React</h1>

      {/* Example 1: Basic props */}
      <GreetingCard name="Kshitij" message="Welcome to the React Props demo!" />
      <GreetingCard
        name="Tanvi"
        message="Props allow data to flow between components."
      />

      {/* Example 2: Using children */}
      <Container title="💡 About Props">
        <p>
          Props (short for <strong>properties</strong>) are read-only values
          passed from parent to child components. They help make components
          dynamic and reusable.
        </p>
      </Container>

      {/* Example 3: Passing a function */}
      <Container title="🛠 Function Prop">
        <Button label="Click Me" onClick={handleAlert} />
      </Container>
    </div>
  );
};

export default Props;
