import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const barData = [
  { name: "Mon", tasks: 5 },
  { name: "Tue", tasks: 8 },
  { name: "Wed", tasks: 3 },
  { name: "Thu", tasks: 6 },
  { name: "Fri", tasks: 4 },
];

const BarChartComponent = () => {
  return (
    <div className="w-full h-full bg-white rounded shadow p-4 flex flex-col">
      <h2 className="text-lg font-bold text-center mb-4">Tasks per Day</h2>
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="tasks" fill="#60a5fa" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartComponent;
