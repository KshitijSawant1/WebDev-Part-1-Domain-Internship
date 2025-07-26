import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
const TaskCard = ({
  title,
  domain,
  status,
  createdAt,
  dueAt,
  timeLeftPercent,
  labels = [],
  priority,
}) => {
  // Themed priority colors
  const priorityMap = {
    "Urgent & Important": "bg-[#FEE2E2] text-[#991B1B] border border-[#FCA5A5]", // soft red
    "Not Urgent & Important":
      "bg-[#FEF9C3] text-[#92400E] border border-[#FACC15]", // warm yellow
    "Urgent & Not Important":
      "bg-[#FFEDD5] text-[#9A3412] border border-[#FDBA74]", // orange tone
    "Not Urgent & Not Important":
      "bg-[#E2E8F0] text-[#1E293B] border border-[#CBD5E1]", // slate
  };

  return (
    <div className="w-[90%] mx-auto mt-4 p-5 sm:p-6 bg-[#F0FDF4] dark:bg-gray-900 rounded-xl border border-green-500 border-2 shadow-md hover:shadow-lg transition">
      {/* Title & Domain */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-3">
        <div>
          <h3 className="text-lg font-semibold text-[#134611] dark:text-white">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{domain}</p>
        </div>
        <span
          className={`text-xs font-medium px-3 py-1 rounded-md ${
            status === "Completed"
              ? "bg-green-100 text-green-700 border border-green-500 shadow-sm"
              : status === "In Progress"
              ? "bg-yellow-100 text-yellow-800 border border-yellow-500 shadow-sm"
              : "bg-red-100 text-red-700 border border-red-500 shadow-sm"
          }}`}
        >
          {status}
        </span>
      </div>

      {/* Created & Due Dates */}
      <div className="text-xs text-gray-600 dark:text-gray-400 mb-3 flex flex-col sm:flex-row sm:justify-between gap-1">
        <p>Created: {createdAt}</p>
        <p>Due: {dueAt}</p>
      </div>

      {/* Time Left Progress */}
      <div className="mb-4">
        <div className="w-full bg-green-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
          <div
            className="bg-green-600 h-2 rounded-full transition-all"
            style={{ width: `${timeLeftPercent}%` }}
          />
        </div>
        <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">
          {100 - timeLeftPercent}% time left
        </p>
      </div>

      {/* Labels */}
      <div className="flex flex-wrap gap-2 mb-3">
        {labels.map((label, idx) => (
          <span
            key={idx}
            className="text-xs text-blue-900 dark:text-blue-200 bg-blue-100 dark:bg-blue-900 border border-blue-300 dark:border-blue-600 px-3 py-0.5 rounded-full"
          >
            {label}
          </span>
        ))}
      </div>
      {/* Priority */}
      <div
        title="Eisenhower Priority"
        className={`text-xs font-medium px-3 py-1 rounded-full inline-block w-fit ${
          priorityMap[priority] ||
          "bg-slate-100 text-slate-700 border border-slate-300"
        }`}
      >
        {priority}
      </div>

      <div className="flex gap-4 mt-4">
        {/* Edit Button */}
        <button className="flex items-center gap-2 px-4 py-2 text-sm text-blue-700 border border-blue-300 rounded-md hover:bg-blue-100 transition">
          <FiEdit className="text-lg" />
          Edit / Modify
        </button>

        {/* Delete Button */}
        <button className="flex items-center gap-2 px-4 py-2 text-sm text-red-700 border border-red-300 rounded-md hover:bg-red-100 transition">
          <FiTrash2 className="text-lg" />
          Delete Task
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
