import React from "react";
import {
  FiClipboard,
  FiArrowUpCircle,
  FiClock,
  FiRefreshCw,
  FiAlertTriangle,
} from "react-icons/fi";

import PieChartComponent from "../Charts/PieChartComponent";
import BarChartComponent from "../Charts/BarChartComponent";
import RadialBarChartComponent from "../Charts/RadialBarChartComponent";
import TaskHeatmap from "../Charts/TaskHeatmap";
import AreaChartComponent from "../Charts/AreaChartComponent";
import WeeklyPriorityAreaChart from "../Charts/WeeklyPriorityAreaChart";
import PriorityRadarChart from "../Charts/PriorityRadarChart";

const Dashboard = () => {
  return (
    <div className="h-screen w-screen flex mt-18 bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/4 min-w-[260px] bg-white shadow-inner flex flex-col p-4 gap-4 overflow-hidden">
        {/* Profile Image */}
        <div className="flex flex-col items-center space-y-2">
          <img
            src="https://i.pinimg.com/736x/36/50/2d/36502d663186cfbf03b14d399aacbf22.jpg"
            alt="Kshitij Sawant"
            className="w-28 h-28 rounded-full object-cover border-4 border-gray-300 shadow"
          />
          <div className="text-center">
            <h2 className="text-lg font-bold text-gray-800">Kshitij Sawant</h2>
            <p className="text-xs text-gray-600">
              Senior Developer, AI & Blockchain
            </p>
            <p className="text-xs italic text-gray-400">
              "Striving for scalable impact."
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="text-xs text-gray-700 space-y-1">
          <div className="flex justify-between">
            <span>Joined:</span>
            <span>March 2023</span>
          </div>
          <div className="flex justify-between">
            <span>Location:</span>
            <span>Mumbai, India</span>
          </div>
          <div className="flex justify-between">
            <span>Email:</span>
            <span>kshitij@example.com</span>
          </div>
        </div>

        {/* Sign Out */}
        <button
          onClick={() => alert("Signing out...")}
          className="mt-2 w-full py-1 bg-red-600 text-white text-xs rounded-md hover:bg-red-700 transition font-semibold"
        >
          Sign Out
        </button>

        {/* Mini Charts */}
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          <div className="w-full aspect-square bg-gray-50 rounded shadow flex items-center justify-center">
            <PriorityRadarChart />
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="flex-1 flex flex-col p-4 gap-4 overflow-hidden">
        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 flex-none">
          {[
            {
              icon: FiClipboard,
              label: "Total Tasks",
              value: "42",
              color: "green-600",
            },
            {
              icon: FiArrowUpCircle,
              label: "Urgent & Important",
              value: "5",
              color: "red-500",
            },
            {
              icon: FiClock,
              label: "Avg. Completion Time",
              value: "2d 6h",
              color: "yellow-400",
            },
            {
              icon: FiRefreshCw,
              label: "Longest Active Task",
              value: "12d 3h",
              color: "blue-500",
            },
            {
              icon: FiAlertTriangle,
              label: "Overdue Tasks",
              value: "3",
              color: "orange-500",
            },
            {
              icon: FiArrowUpCircle,
              label: "Critical Tasks",
              value: "2",
              color: "rose-500",
            },
          ].map((card, i) => (
            <div
              key={i}
              className={`rounded bg-white border-l-4 border-${card.color} shadow flex items-center gap-3 p-3`}
            >
              <card.icon className={`text-2xl text-${card.color}`} />
              <div>
                <p className="text-xs text-gray-500">{card.label}</p>
                <h2 className="text-lg font-bold text-gray-800">
                  {card.value}
                </h2>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-[1.2] overflow-hidden">
          <div className="bg-white rounded shadow p-2 aspect-square flex items-center justify-center">
            <PieChartComponent />
          </div>
          <div className="bg-white rounded shadow p-2 aspect-square">
            <BarChartComponent />
          </div>
          <div className="bg-white rounded shadow p-2 aspect-square">
            <RadialBarChartComponent />
          </div>
        </div>

        <div className="aspect-[3/1] w-full max-w-full">
          <AreaChartComponent />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
