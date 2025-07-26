import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const TaskCardX = ({
  title,
  domain,
  status,
  createdAt,
  dueAt,
  timeLeftPercent,
  labels = [],
  priority,
}) => {
  const priorityColors = {
    "Urgent & Important": "bg-red-100 text-red-700",
    "Not Urgent & Important": "bg-yellow-100 text-yellow-800",
    "Urgent & Not Important": "bg-orange-100 text-orange-800",
    "Not Urgent & Not Important": "bg-gray-200 text-gray-800",
  };

  const statusColor = {
    Completed: "bg-green-100 text-green-700",
    "In Progress": "bg-yellow-100 text-yellow-700",
    Pending: "bg-red-100 text-red-700",
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white border rounded-lg shadow-lg p-4 mb-4">
      {/* Title & Status */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-sm text-gray-600">{domain}</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded ${statusColor[status]}`}>
          {status}
        </span>
      </div>

      {/* Dates */}
      <div className="text-xs text-gray-500 mb-3 flex justify-between">
        <p>Created: {createdAt}</p>
        <p>Due: {dueAt}</p>
      </div>

      {/* Time Progress */}
      <div className="mb-3">
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-2 bg-green-500"
            style={{ width: `${timeLeftPercent}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {100 - timeLeftPercent}% time left
        </p>
      </div>

      {/* Labels */}
      <div className="flex flex-wrap gap-2 mb-3">
        {labels.map((label, i) => (
          <span
            key={i}
            className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full"
          >
            {label}
          </span>
        ))}
      </div>

      {/* Priority */}
      <div
        className={`text-xs inline-block px-3 py-1 rounded-full ${priorityColors[priority]}`}
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

export default TaskCardX;
