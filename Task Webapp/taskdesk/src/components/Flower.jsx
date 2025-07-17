import React from "react";
import "./Flower.css"; // External CSS for styling

const Flower = ({ petals = 6, petalColor = "#f4a261", centerColor = "#2a9d8f" }) => {
  const petalArray = Array.from({ length: petals });

  return (
    <div className="flower">
      {petalArray.map((_, i) => (
        <div
          key={i}
          className="petal"
          style={{
            "--i": i,
            "--rotate": `${(360 / petals) * i}deg`,
            "--petal-color": petalColor,
          }}
        ></div>
      ))}
      <div className="center" style={{ background: centerColor }}></div>
    </div>
  );
};

export default Flower;
