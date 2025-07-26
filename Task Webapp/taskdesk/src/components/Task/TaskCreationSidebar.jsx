import React, { useState } from "react";

const TaskCreationSidebar = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    title: "",
    domain: "",
    status: "In Progress",
    priority: "Urgent & Important",
    labels: "",
    dueAt: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const task = {
      ...formData,
      labels: formData.labels.split(",").map((l) => l.trim()),
      createdAt: new Date().toLocaleString(),
      timeLeftPercent: 20, // Placeholder value
    };
    onCreate(task);
    onClose();
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Create New Task
        </h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800 dark:hover:text-white"
        >
          ✕
        </button>
      </div>

      <div className="p-4 space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white"
          value={formData.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="domain"
          placeholder="Domain"
          className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white"
          value={formData.domain}
          onChange={handleChange}
        />
        <select
          name="status"
          className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>
        <select
          name="priority"
          className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="Urgent & Important">Urgent & Important</option>
          <option value="Not Urgent & Important">Not Urgent & Important</option>
          <option value="Urgent & Not Important">Urgent & Not Important</option>
          <option value="Not Urgent & Not Important">Not Urgent & Not Important</option>
        </select>
        <input
          type="text"
          name="labels"
          placeholder="Comma-separated labels"
          className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white"
          value={formData.labels}
          onChange={handleChange}
        />
        <input
          type="datetime-local"
          name="dueAt"
          className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white"
          value={formData.dueAt}
          onChange={handleChange}
        />

        <button
          onClick={handleSubmit}
          className="w-full mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Create Task
        </button>
      </div>
    </div>
  );
};

export default TaskCreationSidebar;
