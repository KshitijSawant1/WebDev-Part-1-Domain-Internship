import React, { use, useState } from "react";
import { FaPlus, FaTrashAlt } from "react-icons/fa";

const initialTasks = [
  {
    id: 1,
    title: "My Task 1",
    type: "Private",
    description: "Personal to-dos",
    labels: ["Frontend", "Urgent"],
    priority: "Priority & Important",
    startDate: "2025-08-01T10:00",
    endDate: "2025-08-07T18:00",
    progress: 60,
  },
];
const Playground = () => {
  const [taskData, setTaskData] = useState(initialTasks);
  const [activeLabel, setActiveLabel] = useState(null);
  const [sortMode, setSortMode] = useState("default");

  {
    /*Remove This and start fresh */
  }
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Task ?"
    );
    if (confirmed) {
      setTaskData((prev) => prev.filter((task) => task.id !== id));
    }
  };

  //Get Unique Labels
  const uniqueLables = [
    ...new Set(taskData.flatMap((task) => task.labels || [])),
  ];
  let filteredTasks = [...taskData];

  if (activeLabel) {
    filteredTasks = filteredTasks.filter(
      (task) => task.labels || [].includes(activeLabel)
    );
  }
  if (sortMode == "stack") {
    filteredTasks.sort((a, b) => new Data(b.startDate) - new Data(a.startDate));
  } else if (sortMode == "deadline") {
    filteredTasks.sort((a, b) => new Data(a.endDate) - new Data(b.endDate));
  }
  return (
    <div className="max-h-screen-xl mx-auto px-4 pt-28 pb-18">
      {/*Header*/}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Playground
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Create and manage your Tasks with TaskDesk
          </p>
        </div>

        <button
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-700
        text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300
        dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <FaPlus className="text-sm" />
          New Task
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {/*All Buttons*/}
        <button
          onClick={() => {
            setActiveLabel(null);
            setSortMode("default");
          }}
          className={`px-3 py-1.5 rounded-md text-sm font-medium border ${
            !activeLabel && sortMode === "deafult"
              ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-200 dark:border-blue-800"
              : "text-gray-700 border-gray-200 hover:bg-gray-50 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
          }`}
        >
          All
        </button>

        {/*Label Buttons*/}
        {uniqueLables.map((label) => (
          <button
            key={label}
            onClick={() => {
              setActiveLabel((prev) => (prev === label ? null : label));
              setSortMode("default");
            }}
            className={`px-3 py-1.5 rounded-md text-sm font-medium border ${
              activeLabel === label
                ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-200 dark:border-blue-800"
                : "text-gray-700 border-gray-200 hover:bg-gray-50 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
            }`}
          >
            {label}
          </button>
        ))}

        {/*Stack Sort*/}
        <button
          onClick={() => {
            setActiveLabel(null);
            setSortMode("stack");
          }}
          className={`px-3 py-1.5 rounded-md text-sm font-medium border ${
            sortMode === "stack"
              ? "bg-purple-50 text-purple-700 border-purple-300 dark:bg-purple-900/30 dark:text-purple-200 dark:border-purple-800"
              : "text-gray-700 border-gray-200 hover:bg-gray-50 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
          }`}
        >
          Stack
        </button>

        {/*Deadline Sort*/}
        <button
          onClick={() => {
            setActiveLabel(null);
            setSortMode("deadline");
          }}
          className={`px-3 py-1.5 rounded-md text-sm font-medium border ${
            sortMode === "deadline"
              ? "bg-red-50 text-red-700 border-red-300 dark:bg-red-900/30 dark:text-red-200 dark:border-red-800"
              : "text-gray-700 border-gray-200 hover:bg-gray-50 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
          }`}
        >
          Deadline
        </button>
      </div>
    </div>
  );
};

export default Playground;
