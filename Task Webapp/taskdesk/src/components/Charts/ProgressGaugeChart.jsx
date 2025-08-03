import React from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Completed",
    value: 72, // percentage completed
    fill: "#34d399", // Tailwind green-400
  },
];

const ProgressGaugeChart = () => {
  return (
    <div className="w-full h-[70%] bg-white rounded shadow flex flex-col items-center justify-center">
      <h2 className="text-sm font-semibold text-center text-gray-700">
        Completion Rate
      </h2>
      <div className="absolute text-xl font-bold text-gray-800">
        {data[0].value}%
      </div>
      <div className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="70%"
            outerRadius="100%"
            barSize={16}
            data={data}
            startAngle={90}
            endAngle={-270}
          >
            <RadialBar
              minAngle={15}
              clockWise
              dataKey="value"
              cornerRadius={8}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressGaugeChart;
