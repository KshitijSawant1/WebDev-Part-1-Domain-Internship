import React, { useEffect, useMemo, useState } from "react";
import { FaPlus, FaTrashAlt, FaCheckCircle } from "react-icons/fa";
import AddNewTaskModal from "./AddNewTaskModal";
import { UserAuth } from "../../context/AuthContext";
import {
  fetchTask,
  deleteTask,
  markComplete,
  createTask,
} from "../../utils/taskService";

const Playground = () => {
  const { session } = UserAuth();
  const userId = session?.user?.id;
  const [taskData, setTaskData] = useState([]);
  const [activeLabel, setActiveLabel] = useState(null);
  const [sortMode, setSortMode] = useState("default");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) return;
    (async () => {
      try {
        setLoading(true);
        const data = await fetchTask(userId);
        setTaskData(data);
      } catch (e) {
        setError(e.message || "Failed to Load Tasks");
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);

  // Create Form Modal
  const handleCreate = async (payload) => {
    try {
      await createTask(userId, payload);
      const data = await fetchTask(userId);
      setTaskData(data);
    } catch (e) {
      setError(e.message || "Failed to Create Task");
    }
  };

  // One Handler for both Actions {delete and Complete}
  const handleTaskAction = async (action, id) => {
    // Keep a copy for rollback
    const prev = taskData;

    if (action === "delete") {
      const confirmed = window.confirm(
        "Are You Sure You want to Delete this Task ?"
      );
      if (!confirmed) return;
      setTaskData((curr) => curr.filter((t) => t.id !== id));
      try {
        await deleteTask(id);
      } catch {
        setTaskData(prev);
        setError(e.message || "Failed to Delete Task");
      }
      return;
    }
    if (action === "complete") {
      setTaskData((curr) => curr.filter((t) => t.id !== id));
      try {
        await markComplete(id);
      } catch (e) {
        setTaskData(prev);
        setError(e.message || "Failed to Mark Task Complete");
      }
    }
  };

  // Unique Labels
  const uniqueLabels = useMemo(() =>
    Array.from(new Set(taskData.flatMap((t) => t.labels || [])))
  );

  // Filter + Sort
  const filteredtasks = useMemo(() => {
    let list = [...taskData];
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
  }, [taskData, activeLabel, sortMode]);

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
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-700
        text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300
        dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <FaPlus className="text-sm" />
          New Task
        </button>
        <AddNewTaskModal
          open={open}
          onClose={() => setOpen(false)}
          onCreate={handleCreate}
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {/*All Buttons*/}
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

        {/*Label Buttons*/}
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
