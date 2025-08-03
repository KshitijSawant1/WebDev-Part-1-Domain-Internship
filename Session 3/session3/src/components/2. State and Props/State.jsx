// src/pages/State.jsx
import React, { useState } from "react";

const State = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  const toggleBox = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Understanding useState</h1>

      {/* Counter Example */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">🧮 Counter Example</h2>
        <p className="my-2">
          Count: <span className="font-bold">{count}</span>
        </p>
        <button
          onClick={() => setCount(count + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Increment
        </button>
        <button
          onClick={() => setCount(0)}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>

      {/* Text Input Example */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">📝 Input Example</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Type your name"
          className="border px-3 py-2 mr-2"
        />
        <p className="mt-2">
          Hello, <strong>{name || "Stranger"}</strong>!
        </p>
      </div>

      {/* Visibility Toggle */}
      <div>
        <h2 className="text-lg font-semibold">👀 Toggle Visibility</h2>
        <button
          onClick={toggleBox}
          className="bg-green-600 text-white px-4 py-2 rounded mt-2"
        >
          Toggle Box
        </button>
        {isVisible && (
          <div className="mt-4 p-4 bg-gray-100 border rounded">
            You can see me because <code>isVisible</code> is <code>true</code>.
          </div>
        )}
      </div>
    </div>
  );
};

export default State;
