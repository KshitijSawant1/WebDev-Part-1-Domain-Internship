import React from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";

const radialData = [
  { name: "Done", value: 60, fill: "#4ade80" },
  { name: "Pending", value: 40, fill: "#facc15" },
];

const RadialBarChartComponent = () => {
  return (
    <div className="w-full h-full bg-white rounded shadow p-4 flex flex-col">
      <h2 className="text-lg font-bold text-center mb-4">Task Distribution</h2>
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="80%"
            barSize={15}
            data={radialData}
          >
            <RadialBar background dataKey="value" />
            <Legend
              iconSize={10}
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RadialBarChartComponent;
