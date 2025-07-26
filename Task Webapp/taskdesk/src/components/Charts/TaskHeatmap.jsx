import React, { useEffect } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

const today = new Date();

const taskData = [
  { date: "2025-07-20", count: 1 },
  { date: "2025-07-21", count: 1 },
  { date: "2025-07-25", count: 1 },
  // Add more as needed
];

const TaskHeatmap = () => {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .react-calendar-heatmap text {
        font-size: 10px;
        fill: #4b5563;
      }
      .color-empty {
        fill: #e5e7eb !important;
        stroke: none !important;
      }
      .color-task {
        fill: #34d399 !important;
        stroke: none !important;
      }
      .react-calendar-heatmap rect {
        rx: 2px;
        ry: 2px;
        shape-rendering: geometricPrecision;
      }
      .react-calendar-heatmap rect:hover {
        stroke: #111827 !important;
        stroke-width: 1;
      }
      .react-calendar-heatmap > svg {
        width: 100% !important;
        height: 100% !important;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="w-full h-full p-4 bg-white rounded shadow flex flex-col">
      <h2 className="text-center text-base font-semibold mb-2">
        Task Activity
      </h2>
      <div className="flex-1 w-full">
        <CalendarHeatmap
          startDate={new Date(today.getFullYear(), today.getMonth() - 5, 1)}
          endDate={today}
          values={taskData}
          classForValue={(value) => {
            if (!value) return "color-empty";
            return "color-task";
          }}
          tooltipDataAttrs={(value) =>
            value?.date
              ? { "data-tip": `${value.date}: ${value.count} task(s)` }
              : null
          }
          showWeekdayLabels={true}
        />
      </div>
    </div>
  );
};

export default TaskHeatmap;
