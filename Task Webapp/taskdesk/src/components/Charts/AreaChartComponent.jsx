import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const areaData = [
  { name: "Jan", tasks: 20 },
  { name: "Feb", tasks: 30 },
  { name: "Mar", tasks: 25 },
  { name: "Apr", tasks: 40 },
];

const AreaChartComponent = () => {
  return (
    <div className="w-full h-64 bg-white rounded shadow p-4">
      <h2 className="text-lg font-bold text-center mb-4">Monthly Activity</h2>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={areaData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="tasks"
            stroke="#818cf8"
            fill="#c7d2fe"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChartComponent;
