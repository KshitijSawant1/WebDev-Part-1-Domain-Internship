// src/pages/Playground.jsx
import React, { useEffect, useMemo, useState } from "react";
import { FaPlus, FaTrashAlt, FaCheckCircle } from "react-icons/fa";
import { UserAuth } from "../../context/AuthContext";
import {
  fetchTasks,
  deleteTask,
  markComplete,
  createTask,
} from "../../utils/taskService";
import AddNewTaskModal from "./AddNewTaskModal";
import { TbPercentage30 } from "react-icons/tb";

const Playground = () => {
  const [tasksData, setTasksData] = useState([]);
  const [activeLabel, setActiveLabel] = useState(null);
  const [sortMode, setSortMode] = useState("default");
  const [showProgress, setShowProgress] = useState(true);

  const { session } = UserAuth();
  const userId = session?.user?.id;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
  // Returns progress info for a task based on start/end times
  function getProgressInfo(startISO, endISO, now = new Date()) {
    if (!startISO || !endISO) {
      return {
        phase: "unknown",
        pct: 0,
        className: "bg-gray-300",
        label: "No schedule",
      };
    }

    const start = new Date(startISO);
    const end = new Date(endISO);
    const durationMs = Math.max(0, end - start); // handle weird data
    const graceEnd = new Date(end.getTime() + durationMs); // end + duration

    // Before start
    if (now < start) {
      const untilStart = start - now;
      return {
        phase: "pre",
        pct: 0,
        className: "bg-gray-300",
        label: `Starts in ${formatDelta(untilStart)}`,
      };
    }

    // Between start and end → GREEN depleting
    if (now >= start && now <= end) {
      const elapsed = now - start;
      const pctElapsed = durationMs ? elapsed / durationMs : 1;
      const pctRemaining = Math.max(0, 1 - pctElapsed); // “depleting”
      return {
        phase: "active",
        pct: pctRemaining, // we show remaining green
        className: "bg-emerald-500",
        label: `${formatDelta(end - now)} left`,
      };
    }

    // Between end and end+duration → YELLOW rising
    if (now > end && now <= graceEnd) {
      const over = now - end;
      const pct = durationMs ? Math.min(1, over / durationMs) : 1;
      return {
        phase: "grace",
        pct, // rising
        className: "bg-amber-500",
        label: `Overdue by ${formatDelta(over)}`,
      };
    }

    // After grace → RED full
    const overdue = now - graceEnd;
    return {
      phase: "late",
      pct: 1,
      className: "bg-rose-600",
      label: `Overdue by ${formatDelta(overdue)} (past grace)`,
    };
  }

  // Nicely format a delta in ms as h m (e.g., "1h 12m")
  function formatDelta(ms) {
    const totalM = Math.max(0, Math.round(ms / 60000));
    const h = Math.floor(totalM / 60);
    const m = totalM % 60;
    if (h > 0 && m > 0) return `${h}h ${m}m`;
    if (h > 0) return `${h}h`;
    return `${m}m`;
  }

  function getProgressInfo(startISO, endISO, now = new Date()) {
    if (!startISO || !endISO) {
      return {
        phase: "none",
        pct: 0,
        color: "bg-gray-300",
        label: "No schedule",
      };
    }

    const start = new Date(startISO);
    const end = new Date(endISO);
    const dur = Math.max(0, end - start);
    const graceEnd = new Date(end.getTime() + dur);

    if (now < start) {
      return {
        phase: "pre",
        pct: 0,
        color: "bg-gray-300",
        label: `Starts in ${formatDelta(start - now)}`,
      };
    }

    if (now <= end) {
      // GREEN — show remaining (depleting)
      const pctRemaining = dur ? Math.max(0, 1 - (now - start) / dur) : 0;
      return {
        phase: "active",
        pct: pctRemaining,
        color: "bg-emerald-500",
        label: `${formatDelta(end - now)} left`,
      };
    }

    if (now <= graceEnd) {
      // YELLOW — rises during grace (same length as duration)
      const pct = dur ? Math.min(1, (now - end) / dur) : 1;
      return {
        phase: "grace",
        pct,
        color: "bg-amber-500",
        label: `Overdue ${formatDelta(now - end)}`,
      };
    }

    // RED — full after grace
    return {
      phase: "late",
      pct: 1,
      color: "bg-rose-600",
      label: `Overdue ${formatDelta(now - graceEnd)} (past grace)`,
    };
  }

  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000); // update every 30s
    return () => clearInterval(id);
  }, []);

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
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg
             bg-blue-700 text-white focus:outline-none focus:ring-4 focus:ring-blue-300
             dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
             transform transition-transform duration-200
             hover:scale-110 active:scale-90"
        >
          <FaPlus className="text-xl transition-transform duration-200 hover:rotate-90" />
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
          onClick={() => setShowProgress((v) => !v)}
          title={showProgress ? "Hide progress bar" : "Show progress bar"}
          className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md border 
             text-gray-700 border-gray-200 hover:bg-gray-50 
             dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          {showProgress ? "Hide" : "Show"}
          <TbPercentage30 className="w-4 h-4" />
        </button>

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

      {/* Task */}
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
          {filteredtasks.map((task) => (
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
              {showProgress &&
                (() => {
                  const { pct, color, label, phase } = getProgressInfo(
                    task.start_date,
                    task.end_date,
                    now
                  );
                  const width = `${Math.round(
                    Math.min(100, Math.max(0, pct * 100))
                  )}%`;

                  return (
                    <div className="mt-3">
                      <div className="h-2 w-full rounded-full bg-gray-200/70 overflow-hidden">
                        <div
                          className={`${color} h-full transition-[width] duration-700 ease-out`}
                          style={{ width }}
                        />
                      </div>
                      <div className="mt-1 text-xs text-gray-500 flex justify-between">
                        <span>
                          {phase === "pre" && "Not started"}
                          {phase === "active" && "In progress"}
                          {phase === "grace" && "Grace window"}
                          {phase === "late" && "Late"}
                          {phase === "none" && "—"}
                        </span>
                        <span>{label}</span>
                      </div>
                    </div>
                  );
                })()}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Playground;
