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
import ProgressGaugeChart from "../Charts/ProgressGaugeChart";

const Dashboard = () => {
  const statCards = [
    {
      icon: FiClipboard,
      label: "Total Tasks",
      value: "42",
      borderColor: "border-green-600",
      textColor: "text-green-600",
    },
    {
      icon: FiArrowUpCircle,
      label: "Urgent & Important",
      value: "5",
      borderColor: "border-red-500",
      textColor: "text-red-500",
    },
    {
      icon: FiClock,
      label: "Avg. Completion Time",
      value: "2d 6h",
      borderColor: "border-yellow-400",
      textColor: "text-yellow-400",
    },
    {
      icon: FiRefreshCw,
      label: "Longest Active Task",
      value: "12d 3h",
      borderColor: "border-blue-500",
      textColor: "text-blue-500",
    },
    {
      icon: FiAlertTriangle,
      label: "Overdue Tasks",
      value: "3",
      borderColor: "border-orange-500",
      textColor: "text-orange-500",
    },
    {
      icon: FiArrowUpCircle,
      label: "Critical Tasks",
      value: "2",
      borderColor: "border-rose-500",
      textColor: "text-rose-500",
    },
  ];

  return (
    <div className="flex w-full h-full overflow-hidden mt-18">
      {/* Sidebar */}
      <div className="w-full sm:w-1/4 min-w-[260px] max-w-xs bg-white shadow-inner flex flex-col p-4 gap-4 overflow-hidden">
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
          className="w-full py-1 bg-red-600 text-white text-xs rounded-md hover:bg-red-700 transition font-semibold"
        >
          Sign Out
        </button>

        {/* Vertical Responsive Chart */}
        <div className="flex-1 min-h-0">
          <PieChartComponent />
        </div>
        {/* Stat Cards + Chart */}
        <div className="flex-1 flex flex-col gap-3 overflow-hidden">
          {/* Last 2 Stat Cards */}
          {statCards.slice(-2).map((card, i) => (
            <div
              key={i}
              className={`w-full rounded bg-white ${card.borderColor} border-l-4 shadow flex border border-2px border-color -${card.borderColor} items-center gap-3 p-3`}
            >
              <card.icon className={`text-xl ${card.textColor}`} />
              <div>
                <p className="text-xs text-gray-500">{card.label}</p>
                <h2 className="text-base font-bold text-gray-800">
                  {card.value}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="flex-1 flex flex-col p-4 gap-4 overflow-hidden mb-4">
        {/* Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {statCards.slice(0, -2).map((card, i) => (
            <div
              key={i}
              className={`rounded bg-white ${card.borderColor} border-l-4 shadow flex border border-2px border-color -${card.borderColor} items-center gap-3 p-3`}
            >
              <card.icon className={`text-2xl ${card.textColor}`} />
              <div>
                <p className="text-xs text-gray-500">{card.label}</p>
                <h2 className="text-lg font-bold text-gray-800">
                  {card.value}
                </h2>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-transparent rounded shadow  aspect-square flex items-center justify-center">
            <PriorityRadarChart />
          </div>
          <div className="bg-transparent rounded  aspect-square">
            <BarChartComponent />
          </div>
          <div className="bg-transparent rounded shadowaspect-square">
            <RadialBarChartComponent />
          </div>
        </div>

        {/* Weekly Priority Chart - Responsive and adaptive height */}
        <div className="w-full bg-white shadow rounded ">
          <div className="w-full h-[260px] sm:h-[300px] md:h-[340px] lg:h-[380px]">
            <WeeklyPriorityAreaChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
