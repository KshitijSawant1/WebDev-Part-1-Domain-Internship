import React, { useEffect, useMemo, useState } from "react";

const PRIORITY_OPTIONS = [
  "Priority & Important",
  "Not Priority & Important",
  "Priority & Not Important",
  "Not Priority & Not Important",
];

const AddNewTaskModal = ({ open, onClose, onCreate }) => {
  const nextWeekISO = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().slice(0, 16); // yyyy-MM-ddTHH:mm
  }, []);

  const [form, setForm] = useState({
    title: "",
    description: "",
    labels: "",
    priority: PRIORITY_OPTIONS[1],
    endDate: nextWeekISO, // only asking for end date
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Lock background scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = prev);
  }, [open]);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const labelTokens = (form.labels || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    if (!form.title.trim()) return "Title is required.";
    const end = new Date(form.endDate);
    if (isNaN(end.getTime())) return "Please provide a valid end date/time.";
    return "";
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      // Start time is when the task is created:
      const startISO = new Date().toISOString();
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        labels: labelTokens,
        priority: form.priority,
        start_date: startISO, // <- creation time
        end_date: new Date(form.endDate).toISOString(),
      };
      await onCreate?.(payload);
      onClose?.();
      // reset form (optional)
      setForm((f) => ({ ...f, title: "", description: "", labels: "" }));
    } catch (err) {
      setError(err?.message || "Failed to create task.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <button
        aria-label="Close"
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Add New Task
          </h3>
          <button
            onClick={onClose}
            className="rounded p-2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-5 py-4 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              type="text"
              placeholder="e.g., Integrate GitHub OAuth"
              className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Short details about this task…"
              className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Labels */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Labels (comma separated)
            </label>
            <input
              name="labels"
              value={form.labels}
              onChange={handleChange}
              type="text"
              placeholder="Frontend, Urgent"
              className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
            {!!labelTokens.length && (
              <div className="mt-2 flex flex-wrap gap-2">
                {labelTokens.map((l, i) => (
                  <span
                    key={`${l}-${i}`}
                    className="text-[10px] font-semibold px-2 py-1 rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                  >
                    {l}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Priority
            </label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            >
              {PRIORITY_OPTIONS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* End Date only */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              End Date & Time
            </label>
            <input
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              type="datetime-local"
              className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm font-medium text-red-700 bg-red-100 border border-red-300 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {submitting ? "Creating…" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewTaskModal;
