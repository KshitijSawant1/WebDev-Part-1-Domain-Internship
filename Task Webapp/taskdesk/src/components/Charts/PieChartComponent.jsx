import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Completed", value: 40 },
  { name: "In Progress", value: 30 },
  { name: "Overdue", value: 30 },
];

const COLORS = ["#4ade80", "#facc15", "#f87171"]; // green, yellow, red

const PieChartComponent = () => {
  return (
    <div className="w-full h-full bg-white pt-4 rounded shadow flex flex-col items-center justify-center">
      <h2 className="text-lg font-bold text-center mb-2">Task Status</h2>
      <div className="w-full h-60">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius="70%"
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChartComponent;
