import React from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Weekly priority data
const data = [
  {
    day: "Mon",
    urgentImportant: 5,
    notUrgentImportant: 3,
    urgentNotImportant: 2,
    notUrgentNotImportant: 1,
  },
  {
    day: "Tue",
    urgentImportant: 6,
    notUrgentImportant: 4,
    urgentNotImportant: 2,
    notUrgentNotImportant: 2,
  },
  {
    day: "Wed",
    urgentImportant: 3,
    notUrgentImportant: 5,
    urgentNotImportant: 1,
    notUrgentNotImportant: 0,
  },
  {
    day: "Thu",
    urgentImportant: 4,
    notUrgentImportant: 2,
    urgentNotImportant: 3,
    notUrgentNotImportant: 3,
  },
  {
    day: "Fri",
    urgentImportant: 7,
    notUrgentImportant: 3,
    urgentNotImportant: 2,
    notUrgentNotImportant: 1,
  },
  {
    day: "Sat",
    urgentImportant: 2,
    notUrgentImportant: 5,
    urgentNotImportant: 4,
    notUrgentNotImportant: 3,
  },
  {
    day: "Sun",
    urgentImportant: 1,
    notUrgentImportant: 2,
    urgentNotImportant: 3,
    notUrgentNotImportant: 4,
  },
];

const PriorityRadarChart = () => {
  return (
    <div className="w-full h-full flex flex-col bg-transparent rounded shadow">
      <h2 className="text-base font-semibold text-center p-4">
        Weekly Task Priorities
      </h2>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
            <PolarGrid />
            <PolarAngleAxis dataKey="day" />
            <PolarRadiusAxis angle={30} domain={[0, 10]} />
            <Tooltip />
            <Radar
              name="Urgent & Important"
              dataKey="urgentImportant"
              stroke="#ef4444"
              fill="#f87171"
              fillOpacity={0.6}
            />
            <Radar
              name="Not Urgent & Important"
              dataKey="notUrgentImportant"
              stroke="#3b82f6"
              fill="#93c5fd"
              fillOpacity={0.6}
            />
            <Radar
              name="Urgent & Not Important"
              dataKey="urgentNotImportant"
              stroke="#f59e0b"
              fill="#fcd34d"
              fillOpacity={0.5}
            />
            <Radar
              name="Not Urgent & Not Important"
              dataKey="notUrgentNotImportant"
              stroke="#10b981"
              fill="#6ee7b7"
              fillOpacity={0.5}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriorityRadarChart;
