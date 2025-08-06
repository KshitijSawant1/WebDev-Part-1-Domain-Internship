import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaLock, FaUsers } from "react-icons/fa";

const dummySpaces = [
  { id: 1, title: "My Notes", type: "Private", description: "Personal to-dos" },
  {
    id: 2,
    title: "Team Sprint",
    type: "Shared",
    description: "Sprint planning board",
  },
  {
    id: 3,
    title: "Ideas",
    type: "Private",
    description: "Brainstorming scraps",
  },
  {
    id: 4,
    title: "Project Alpha",
    type: "Shared",
    description: "Roadmap & tasks",
  },
];

const Playground = () => {
  const [filter, setFilter] = useState("All");

  const spaces =
    filter === "All"
      ? dummySpaces
      : dummySpaces.filter((s) => s.type === filter);

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

        <Link
          to="#"
          onClick={(e) => {
            e.preventDefault();
            alert("Open New Space modal here");
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <FaPlus className="text-sm" />
          New Space
        </Link>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-6">
        {["All", "Private", "Shared"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium border ${
              filter === tab
                ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-200 dark:border-blue-800"
                : "text-gray-700 border-gray-200 hover:bg-gray-50 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      {spaces.length === 0 ? (
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
          {spaces.map((space) => (
            <div
              key={space.id}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition dark:bg-gray-900 dark:border-gray-700"
            >
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {space.title}
                </h3>
                <span
                  className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded ${
                    space.type === "Private"
                      ? "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                      : "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200"
                  }`}
                >
                  {space.type === "Private" ? <FaLock /> : <FaUsers />}
                  {space.type}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {space.description}
              </p>

              <div className="mt-4 flex items-center gap-2">
                <Link
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Open Space");
                  }}
                  className="text-sm px-3 py-1.5 rounded-md bg-gray-900 text-white hover:bg-black dark:bg-white dark:text-gray-900"
                >
                  Open
                </Link>
                <Link
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("More actions…");
                  }}
                  className="text-sm px-3 py-1.5 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  More
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Playground;
