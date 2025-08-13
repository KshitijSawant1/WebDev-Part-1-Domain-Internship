// src/pages/Playground.jsx
import React, { useEffect, useMemo, useState } from "react";
import { FaPlus, FaTrashAlt, FaCheckCircle } from "react-icons/fa";
import { UserAuth } from "../../context/AuthContext";
import {
  fetchTasks,
  deleteTask,
  markComplete,
  createTask,
} from "../../utils/taskService"; // <-- updated path
import AddNewTaskModal from "./AddNewTaskModal"; // <-- same folder as this page

const Playground = () => {
  const [tasksData, setTasksData] = useState([]);
  const [activeLabel, setActiveLabel] = useState(null);
  const [sortMode, setSortMode] = useState("default"); // default | stack | deadline

  const { session } = UserAuth();
  const userId = session?.user?.id;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [, setTick] = useState(0); // force re-render for live progress

  // Live update progress every 60s
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 60000);
    return () => clearInterval(id);
  }, []);

  // Load tasks
  useEffect(() => {
    if (!userId) return;
    (async () => {
      try {
        setLoading(true);
        const data = await fetchTasks(userId);
        setTasksData(data);
      } catch (e) {
        setError(e.message || "Failed to load tasks");
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);

  // Create from modal
  const handleCreate = async (payload) => {
    try {
      await createTask(userId, payload);
      const data = await fetchTasks(userId);
      setTasksData(data);
    } catch (e) {
      setError(e.message || "Failed to create task");
    }
  };

  // One handler for both actions
  const handleTaskAction = async (action, id) => {
    // Keep a copy for rollback
    const prev = tasksData;

    if (action === "delete") {
      const confirmed = window.confirm("Delete this task?");
      if (!confirmed) return;

      // Optimistic remove
      setTasksData((curr) => curr.filter((t) => t.id !== id));
      try {
        await deleteTask(id);
      } catch (e) {
        setTasksData(prev); // rollback
        setError(e.message || "Failed to delete task");
      }
      return;
    }

    if (action === "complete") {
      // Optimistic: hide immediately (since completed tasks are hidden)
      setTasksData((curr) => curr.filter((t) => t.id !== id));
      try {
        await markComplete(id); // or completeTask(id) if that's your function name
      } catch (e) {
        setTasksData(prev); // rollback
        setError(e.message || "Failed to mark completed");
      }
    }
  };
  // Time-based progress helper
  const timeProgress = (startISO, endISO) => {
    const now = Date.now();
    const s = new Date(startISO || 0).getTime();
    const e = new Date(endISO || 0).getTime();
    if (!s || !e || e <= s) return { percent: 0, state: "Scheduled" };
    if (now <= s) return { percent: 0, state: "Scheduled" };
    if (now >= e) return { percent: 100, state: "Completed" };
    const percent = Math.round(((now - s) / (e - s)) * 100);
    return { percent, state: "In Progress" };
  };

  // Unique labels
  const uniqueLabels = useMemo(
    () => Array.from(new Set(tasksData.flatMap((t) => t.labels || []))),
    [tasksData]
  );

  // Filter + sort
  const filteredtasks = useMemo(() => {
    let list = [...tasksData];
    if (activeLabel) {
      list = list.filter((t) => (t.labels || []).includes(activeLabel));
    }
    if (sortMode === "stack") {
      list.sort(
        (a, b) =>
          new Date(b.start_date || b.created_at || 0) -
          new Date(a.start_date || a.created_at || 0)
      );
    } else if (sortMode === "deadline") {
      list.sort(
        (a, b) =>
          new Date(a.end_date || "2100-01-01") -
          new Date(b.end_date || "2100-01-01")
      );
    }
    return list;
  }, [tasksData, activeLabel, sortMode]);

  return (
    <div className="max-w-screen-xl mx-auto px-4 pt-28 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Playground
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Create and manage your TaskDesk tasks.
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <FaPlus className="text-sm" />
          New task
        </button>
        <AddNewTaskModal
          open={open}
          onClose={() => setOpen(false)}
          onCreate={handleCreate}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
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

      {/* Start from here and erase the top mechanism  */}
      {/* Errors */}
      {error && (
        <p className="mb-4 text-center text-sm font-medium text-red-700 bg-red-100 border border-red-300 rounded-md px-4 py-3 shadow-sm">
          {error}
        </p>
      )}

      {/* Cards */}
      {loading ? (
        <div className="text-center text-gray-600 py-16">Loading tasks…</div>
      ) : filteredtasks.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed rounded-xl border-gray-200 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-200 font-medium">
            No tasks found.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Try changing the filter or sort.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredtasks.map((task) => {
            const { percent, state } = timeProgress(
              task.start_date,
              task.end_date
            );

            return (
              <div
                key={task.id}
                className="relative rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition dark:bg-gray-900 dark:border-gray-700"
              >
                {/* Actions */}
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={() => handleTaskAction("complete", task.id)}
                    className="text-gray-400 hover:text-green-500 transition"
                    title="Mark as Completed"
                  >
                    <FaCheckCircle />
                  </button>
                  <button
                    onClick={() => handleTaskAction("delete", task.id)}
                    className="text-gray-400 hover:text-red-500 transition"
                    title="Delete task"
                  >
                    <FaTrashAlt />
                  </button>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {task.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  {task.description}
                </p>

                {(task.labels || []).length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {task.labels.map((label, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-semibold px-2 py-1 rounded bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                )}

                {task.priority && (
                  <span
                    className={`inline-block mt-2 px-2 py-1 text-xs font-medium rounded-full ${
                      task.priority === "Priority & Important"
                        ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
                        : task.priority === "Not Priority & Important"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                        : task.priority === "Priority & Not Important"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-100"
                        : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    }`}
                  >
                    {task.priority}
                  </span>
                )}

                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  <div>
                    <strong>Start:</strong>{" "}
                    {task.start_date
                      ? new Date(task.start_date).toLocaleString()
                      : "-"}
                  </div>
                  <div>
                    <strong>End:</strong>{" "}
                    {task.end_date
                      ? new Date(task.end_date).toLocaleString()
                      : "-"}
                  </div>
                </div>

                {/* Time-based Progress */}
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                    <span>{state}</span>
                    <span>{percent}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded overflow-hidden dark:bg-gray-700">
                    <div
                      className={`h-full ${
                        state === "Completed" ? "bg-green-600" : "bg-green-500"
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Playground;
