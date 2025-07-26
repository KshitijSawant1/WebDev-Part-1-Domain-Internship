import React, { useState } from "react";
import TaskCard from "../Task/TaskCardX";
import TaskCreationSidebar from "../Task/TaskCreationSidebar";

const Playground = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-4 mt-18">
      {/* Application Bar */}
      <div className="flex justify-between items-center bg-white shadow-md rounded-lg px-6 py-4 mb-6">
        <h1 className="text-2xl font-bold text-blue-800">Playground</h1>

        <div className="flex gap-4">
          <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200 transition font-medium">
            Filter
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition font-medium"
            onClick={() => setShowSidebar(true)}
          >
            Create Task
          </button>
          <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition font-medium">
            Dashboard
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <TaskCard
          title="Integrate GitHub OAuth"
          domain="Web Development"
          status="In Progress"
          createdAt="Jul 25, 2025 – 11:00 AM"
          dueAt="Jul 28, 2025 – 6:00 PM"
          timeLeftPercent={70}
          labels={["OAuth", "Backend", "Firebase"]}
          priority="Urgent & Important"
        />
      </div>
      <TaskCreationSidebar
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)}
        onCreate={(task) => {
          // Optional: handle task creation
          console.log("Created Task:", task);
          setShowSidebar(false);
        }}
      />
    </div>
  );
};

export default Playground;
