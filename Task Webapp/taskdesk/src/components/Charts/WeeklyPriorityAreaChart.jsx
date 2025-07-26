import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Sample weekly data
const data = [
  {
    day: "Mon",
    urgentImportant: 3,
    notUrgentImportant: 2,
    urgentNotImportant: 1,
    notUrgentNotImportant: 0,
  },
  {
    day: "Tue",
    urgentImportant: 4,
    notUrgentImportant: 1,
    urgentNotImportant: 2,
    notUrgentNotImportant: 0,
  },
  {
    day: "Wed",
    urgentImportant: 2,
    notUrgentImportant: 3,
    urgentNotImportant: 1,
    notUrgentNotImportant: 2,
  },
  {
    day: "Thu",
    urgentImportant: 5,
    notUrgentImportant: 0,
    urgentNotImportant: 1,
    notUrgentNotImportant: 1,
  },
  {
    day: "Fri",
    urgentImportant: 1,
    notUrgentImportant: 2,
    urgentNotImportant: 2,
    notUrgentNotImportant: 2,
  },
  {
    day: "Sat",
    urgentImportant: 2,
    notUrgentImportant: 2,
    urgentNotImportant: 3,
    notUrgentNotImportant: 1,
  },
  {
    day: "Sun",
    urgentImportant: 0,
    notUrgentImportant: 1,
    urgentNotImportant: 2,
    notUrgentNotImportant: 3,
  },
];

const WeeklyPriorityAreaChart = () => {
  return (
    <div className="w-full h-full p-4 bg-white rounded shadow flex flex-col">
      <h2 className="text-center text-base font-semibold mb-2">
        Weekly Task Priorities
      </h2>
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="urgentImportant"
              stackId="1"
              stroke="#ef4444"
              fill="#fecaca"
              name="Urgent & Important"
            />
            <Area
              type="monotone"
              dataKey="notUrgentImportant"
              stackId="1"
              stroke="#facc15"
              fill="#fef9c3"
              name="Not Urgent & Important"
            />
            <Area
              type="monotone"
              dataKey="urgentNotImportant"
              stackId="1"
              stroke="#fb923c"
              fill="#ffedd5"
              name="Urgent & Not Important"
            />
            <Area
              type="monotone"
              dataKey="notUrgentNotImportant"
              stackId="1"
              stroke="#94a3b8"
              fill="#e2e8f0"
              name="Not Urgent & Not Important"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyPriorityAreaChart;
