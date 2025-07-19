import React from "react";
import { LampDemo } from "./LampDemo";

const pfp3 =
" https://ik.imagekit.io/rhzh8en76/Helixure%20v2.0%20Assests/Kshitij%20K%20Sawant%20Cryptocurrency%20Photo.jpg?updatedAt=1751044291591";


const Landing = () => {
  return (
    <div className="bg-[#4c956c]">
      {/* Hero Section */}
      <LampDemo />
      {/* Round image Cards */}
      <div className="px-4 sm:px-6 md:px-12">
        <a
          href="https://your-destination-link.com"
          target="_blank"
          rel="noopener noreferrer"
          className="relative block group w-fit mx-auto"
        >
          <img
            className="mt-2 mb-6 w-11/12 sm:w-3/4 md:w-2/3 lg:w-[30rem] rounded-full transition-all duration-500 shadow-[0_20px_60px_-10px_rgba(214,140,69,0.7),0_10px_20px_-5px_rgba(214,140,69,0.5)]"
            src="https://i.pinimg.com/1200x/a0/1c/3a/a01c3add44d506cd121d2ca8b27f15ee.jpg"
            alt="Decorative glowing vortex"
          />
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-[#a8dadc] text-5xl font-semibold tracking-wide font-[cursive]">
              Explore
            </span>
          </div>
        </a>
      </div>
      {/* Data Cards */}
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-5">
        {/* Task Desk problem statement */}
        <div className="bg-[#e9edc9] dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 mb-8">
          <h2
            id="taskdesk-introduction"
            className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
          >
            <mark className="px-4 text-[#d4a373] bg-[#faedcd] rounded-sm dark:bg-blue-500">
              Problem Statement
            </mark>
          </h2>

          <p className="text-lg font-normal text-black dark:text-gray-400 mb-6 leading-relaxed text-justify">
            In today's fast-paced work environment, managing tasks efficiently
            across teams is more critical than ever. Yet, many teams struggle
            with scattered workflows, poor coordination, and tool
            fatigue—leading to confusion, missed deadlines, and lowered
            productivity.
          </p>

          <div className="flow-root">
            <dl className="-my-3 divide-y divide-gray-300 text-lg">
              {[
                {
                  title: "Scattered Task Tracking",
                  description:
                    "Managing tasks across chats, notes, and spreadsheets leads to confusion, redundancy, and delayed execution.",
                },
                {
                  title: "Lack of Team Coordination",
                  description:
                    "Without a unified system, it's difficult to stay aligned, share updates, or collaborate efficiently—especially across remote teams.",
                },
                {
                  title: "Overwhelming Workflows",
                  description:
                    "Switching between multiple platforms drains focus, complicates execution, and creates friction in everyday workflows.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 gap-2 py-3 sm:grid-cols-3 sm:gap-4"
                >
                  <dt className="font-medium text-black text-justify">
                    <strong>{item.title}</strong>
                  </dt>
                  <dd className="text-black sm:col-span-2 leading-relaxed text-justify">
                    {item.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Vision */}
          <div className="bg-[#e9edc9] dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12">
            <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              <mark className="px-4 text-[#d4a373] bg-[#faedcd]  rounded-sm dark:bg-blue-500">
                Vision
              </mark>
            </h2>
            <p className="text-lg font-normal text-black dark:text-gray-400 mb-4 text-justify leading-relaxed">
              To empower individuals and teams with a smart, intuitive workspace
              that simplifies task management, encourages collaboration, and
              helps people focus on what matters most — getting things done with
              clarity and confidence.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-[#e9edc9] dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12">
            <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              <mark className="px-4 text-[#d4a373] bg-[#faedcd]  rounded-sm dark:bg-blue-500">
                Mission
              </mark>
            </h2>
            <ul className="max-w-md space-y-2 text-black list-inside dark:text-gray-400 text-lg leading-relaxed">
              <li className="flex items-start">
                <span className="mr-2 mt-1 text-black dark:text-blue-400">
                  ✔
                </span>
                Deliver a clean, distraction-free interface for managing daily
                tasks and projects.
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1 text-blue-600 dark:text-blue-400">
                  ✔
                </span>
                Foster real-time collaboration and communication among team
                members.
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1 text-blue-600 dark:text-blue-400">
                  ✔
                </span>
                Provide customizable workflows that adapt to personal and
                professional needs.
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1 text-blue-600 dark:text-blue-400">
                  ✔
                </span>
                Encourage focus, prioritization, and consistent progress
                tracking.
              </li>
            </ul>
          </div>
        </div>

        {/* Task Desk Solution */}
        <div className="bg-[#e9edc9] dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 mb-8">
          <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            <mark className="px-4 text-[#d4a373] bg-[#faedcd] rounded-sm dark:bg-blue-500">
              How Task Desk Helps
            </mark>
          </h2>
          <p className="text-lg font-normal text-black dark:text-gray-400 mb-6 leading-relaxed text-justify">
            Task Desk is designed to simplify your work, improve collaboration,
            and help you manage daily tasks with clarity and focus.
          </p>

          <div className="flow-root">
            <dl className="-my-3 divide-y divide-gray-300 text-lg">
              {[
                {
                  title: "All-in-One Task View",
                  description:
                    "Track your to-dos, assign responsibilities, and monitor progress from a single dashboard.",
                },
                {
                  title: "Easy Team Collaboration",
                  description:
                    "Share updates, comments, and attachments in real time to keep everyone on the same page.",
                },
                {
                  title: "Custom Workspaces",
                  description:
                    "Create separate boards for different projects, departments, or goals.",
                },
                {
                  title: "Deadline & Priority Setting",
                  description:
                    "Assign due dates and labels to keep high-priority tasks visible and organized.",
                },
                {
                  title: "Clean, Responsive Design",
                  description:
                    "Work across devices without distractions using a sleek, responsive interface.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 gap-2 py-3 sm:grid-cols-3 sm:gap-4"
                >
                  <dt className="font-medium text-black text-justify">
                    <strong>{item.title}</strong>
                  </dt>
                  <dd className="text-black sm:col-span-2 leading-relaxed text-justify">
                    {item.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center bg-[#fefee3] dark:bg-[#4c956c] py-10 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {/* Profile Card */}
          <div className="flex flex-col items-center gap-4 bg-[#fefee3] dark:bg-[#4c956c] border-5 border-dashed border-[#d4a373] p-6 rounded-lg">
            {/* Image */}
            <div className="w-[300px]">
              <img
                src={pfp3}
                alt="Simple Display"
                className="rounded-md w-full h-auto object-cover

               shadow-[0_0_30px_#d4a373]"
              />
            </div>
          </div>

          {/* Additional Content / Right Column */}
          <div className="lg:col-span-2 h-auto rounded bg-[#fefee3] dark:bg-[#4c956c] border-5 border-dashed border-[#d4a373] p-6 flex items-center justify-center">
            {/* You can insert your content here */}

            <p className="text-gray-700 dark:text-gray-200 text-center">
              Your additional content goes here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
