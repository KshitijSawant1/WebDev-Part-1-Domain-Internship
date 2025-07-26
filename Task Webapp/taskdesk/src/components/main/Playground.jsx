
import React, { useState } from "react";
import Application from "./Application";
import TaskCard from "../Task/TaskCard";
import g4 from "../../assets/patterns/G4.png";
import TaskCreationSidebar from "../Task/TaskCreationSidebar";

const Playground = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [tasks, setTasks] = useState([]);

  const handleCreateTask = (task) => {
    setTasks((prev) => [...prev, task]);
  };
  return (
    <div className="relative min-h-screen">
      {/* Background Pattern with 10% opacity */}
      <div
        className="absolute inset-0 bg-repeat bg-center bg-fixed z-0"
        style={{
          backgroundImage: `url(${g4})`,
          opacity: 0.2,
        }}
      />
      <div className="sticky top-0 z-50">
        <Application onNewTaskClick={() => setShowSidebar(true)} />
      </div>

      {/* Sidebar */}
      <TaskCreationSidebar
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)}
        onCreate={handleCreateTask}
      />

      <div className="relative z-10">
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
      <div className="pb-10"></div>
    </div>
  );
};

export default Playground;
