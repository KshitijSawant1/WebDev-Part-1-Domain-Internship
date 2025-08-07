import React, { useState } from "react";
import { FaPlus, FaTrashAlt } from "react-icons/fa";

const initialSpaces = [
  {
    id: 1,
    title: "My Notes",
    type: "Private",
    description: "Personal to-dos",
    labels: ["Frontend", "Urgent"],
    priority: "Priority & Important",
    startDate: "2025-08-01T10:00",
    endDate: "2025-08-07T18:00",
    progress: 60,
  },
  {
    id: 2,
    title: "Team Sprint",
    type: "Shared",
    description: "Sprint planning board",
    labels: ["React", "Backend"],
    priority: "Not Priority & Important",
    startDate: "2025-08-02T08:00",
    endDate: "2025-08-10T17:00",
    progress: 80,
  },
  {
    id: 3,
    title: "Ideas",
    type: "Private",
    description: "Brainstorming scraps",
    labels: ["Innovation"],
    priority: "Priority & Not Important",
    startDate: "2025-08-03T09:00",
    endDate: "2025-08-15T16:00",
    progress: 30,
  },
  {
    id: 4,
    title: "Ideas",
    type: "Private",
    description: "Brainstorming scraps",
    labels: ["Innovation"],
    priority: "Priority & Not Important",
    startDate: "2025-08-03T09:00",
    endDate: "2025-08-15T16:00",
    progress: 30,
  },
  {
    id: 5,
    title: "Ideas",
    type: "Private",
    description: "Brainstorming scraps",
    labels: ["Innovation"],
    priority: "Priority & Not Important",
    startDate: "2025-08-03T09:00",
    endDate: "2025-08-15T16:00",
    progress: 30,
  },
  {
    id: 6,
    title: "Ideas",
    type: "Private",
    description: "Brainstorming scraps",
    labels: ["Innovation"],
    priority: "Priority & Not Important",
    startDate: "2025-08-03T09:00",
    endDate: "2025-08-15T16:00",
    progress: 30,
  },
];

const Playground = () => {
  const [spacesData, setSpacesData] = useState(initialSpaces);
  const [activeLabel, setActiveLabel] = useState(null);
  const [sortMode, setSortMode] = useState("default");

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this space?"
    );
    if (confirmed) {
      setSpacesData((prev) => prev.filter((space) => space.id !== id));
    }
  };

  // Get unique labels
  const uniqueLabels = [
    ...new Set(spacesData.flatMap((space) => space.labels || [])),
  ];

  // Filter + Sort logic
  let filteredSpaces = [...spacesData];

  if (activeLabel) {
    filteredSpaces = filteredSpaces.filter((space) =>
      (space.labels || []).includes(activeLabel)
    );
  }

  if (sortMode === "stack") {
    filteredSpaces.sort(
      (a, b) => new Date(b.startDate) - new Date(a.startDate)
    );
  } else if (sortMode === "deadline") {
    filteredSpaces.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 pt-28 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Playground
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Create and manage your TaskDesk spaces.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <FaPlus className="text-sm" />
          New Space
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {/* All Button */}
        <button
          onClick={() => {
            setActiveLabel(null);
            setSortMode("default");
          }}
          className={`px-3 py-1.5 rounded-md text-sm font-medium border ${
            !activeLabel && sortMode === "default"
              ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-200 dark:border-blue-800"
              : "text-gray-700 border-gray-200 hover:bg-gray-50 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
          }`}
        >
          All
        </button>

        {/* Label Buttons */}
        {uniqueLabels.map((label) => (
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

        {/* Stack Sort */}
        <button
          onClick={() => {
            setSortMode("stack");
            setActiveLabel(null);
          }}
          className={`px-3 py-1.5 rounded-md text-sm font-medium border ${
            sortMode === "stack"
              ? "bg-purple-50 text-purple-700 border-purple-300 dark:bg-purple-900/30 dark:text-purple-200 dark:border-purple-800"
              : "text-gray-700 border-gray-200 hover:bg-gray-50 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
          }`}
        >
          Stack
        </button>

        {/* Deadline Sort */}
        <button
          onClick={() => {
            setSortMode("deadline");
            setActiveLabel(null);
          }}
          className={`px-3 py-1.5 rounded-md text-sm font-medium border ${
            sortMode === "deadline"
              ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-200 dark:border-red-800"
              : "text-gray-700 border-gray-200 hover:bg-gray-50 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
          }`}
        >
          Deadline
        </button>
      </div>

      {/* Cards Grid */}
      {filteredSpaces.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed rounded-xl border-gray-200 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-200 font-medium">
            No spaces found.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Try changing the filter or create a new space.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSpaces.map((space) => (
            <div
              key={space.id}
              className="relative rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition dark:bg-gray-900 dark:border-gray-700"
            >
              <button
                onClick={() => handleDelete(space.id)}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
                title="Delete Space"
              >
                <FaTrashAlt />
              </button>

              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {space.title}
                </h3>
              </div>

              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {space.description}
              </p>

              {space.labels && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {space.labels.map((label, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-semibold px-2 py-1 rounded bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              )}

              {space.priority && (
                <span
                  className={`inline-block mt-2 px-2 py-1 text-xs font-medium rounded-full ${
                    space.priority === "Priority & Important"
                      ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
                      : space.priority === "Not Priority & Important"
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                      : space.priority === "Priority & Not Important"
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-100"
                      : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  }`}
                >
                  {space.priority}
                </span>
              )}

              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                <div>
                  <strong>Start:</strong>{" "}
                  {new Date(space.startDate).toLocaleString()}
                </div>
                <div>
                  <strong>End:</strong>{" "}
                  {new Date(space.endDate).toLocaleString()}
                </div>
              </div>

              <div className="mt-3">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Progress: {space.progress || 0}%
                </div>
                <div className="w-full h-2 bg-gray-200 rounded overflow-hidden dark:bg-gray-700">
                  <div
                    className="h-full bg-green-500 transition-all"
                    style={{ width: `${space.progress || 0}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Playground;

