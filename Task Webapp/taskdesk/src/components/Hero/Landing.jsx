import React from "react";

const pfp2 =
  "https://i.pinimg.com/1200x/34/99/79/349979fbe5cd52d72f42a89561cdaed4.jpg";
const pfp1 =
  "https://i.pinimg.com/1200x/73/58/b8/7358b88c168f696d8912e708cc183559.jpg";
const pfp3 =
  " https://ik.imagekit.io/rhzh8en76/Helixure%20v2.0%20Assests/Kshitij%20K%20Sawant%20Cryptocurrency%20Photo.jpg?updatedAt=1751044291591";

const Landing = () => {
  return (
    <div className="bg-[#fefee3] dark:bg-[#4c956c] pb-10">
      {/* Hero Section */}
      <section className="relative bg-[#fefee3] dark:bg-[#4c956c] mb-10 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
        <div className="relative z-10 px-4 py-12 mx-auto max-w-7xl text-center sm:px-6 lg:px-8 lg:py-20">
          {/* Tag Banner */}
          <a
            href="#"
            className="inline-flex flex-wrap items-center justify-center gap-2 px-1 py-1 sm:gap-3 sm:px-1 sm:py-1 mb-6 text-xs sm:text-sm rounded-full bg-green-100 dark:bg-green-200 text-green-900 dark:text-green-800 max-w-full mx-auto"
          >
            <span className="text-[8px] sm:text-xs bg-green-700 text-white px-2 py-0.5 sm:px-1 sm:py-1 rounded-full">
              New
            </span>
            <span className="text-[8px] sm:text-sm font-medium text-center sm:text-left">
              A modern task management app that keeps your work on track.
            </span>
          </a>

          {/* Main Title */}
          <h1 className="mb-6 text-6xl sm:text-8xl md:text-8xl lg:text-9xl font-extrabold tracking-tight leading-tight text-gray-900 dark:text-white">
            <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-sm dark:bg-yellow-200 dark:text-yellow-800">
              Task Desk
            </span>
          </h1>

          <div className="flex justify-center mb-6">
            <div className="flex flex-wrap gap-3 items-center">
              {/* 1 - Bookmark/Flag */}
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#cbf3f0]">
                <svg
                  className="w-5 h-5 text-[#15616d]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.458 3.11A1 1 0 0 1 19 4v16a1 1 0 0 1-1.581.814L12 16.944V7.056l5.419-3.87a1 1 0 0 1 1.039-.076ZM22 12c0 1.48-.804 2.773-2 3.465v-6.93c1.196.692 2 1.984 2 3.465ZM10 8H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6V8Zm0 9H5v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>

              {/* 2 - Book */}
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#cbf3f0]">
                <svg
                  className="w-5 h-5 text-[#15616d]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 1 0 0-2h-2v-2h2a1 1 0 0 0 1-1V4a2 2 0 0 0-2-2h-8v16h5v2H7a1 1 0 1 1 0-2h1V2H6Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>

              {/* 3 - Calendar */}
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#cbf3f0]">
                <svg
                  className="w-5 h-5 text-[#15616d]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 5V4a1 1 0 1 1 2 0v1h3V4a1 1 0 1 1 2 0v1h3V4a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v2H3V7a2 2 0 0 1 2-2h1ZM3 19v-8h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm5-6a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>

              {/* 4 - Monitor */}
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#cbf3f0]">
                <svg
                  className="w-5 h-5 text-[#15616d]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 2a1 1 0 0 0-1 1H6a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2a1 1 0 0 0-1-1H9Zm1 2h4v2h1a1 1 0 1 1 0 2H9a1 1 0 0 1 0-2h1V4Zm5.707 8.707a1 1 0 0 0-1.414-1.414L11 14.586l-1.293-1.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </div>

          <p className="mb-6 text-base sm:text-4xl md:text-4xl font-normal text-gray-700 dark:text-white max-w-3xl mx-auto px-4 font-[cursive]">
            Focus. Plan. Complete.
          </p>
        </div>

        {/* Background Overlay upper bg */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#caffbf] to-transparent dark:from-[#2c6e49]" />
      </section>

      {/* Round image Cards */}
      <div className="px-4 sm:px-6 md:px-12 mb-10 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
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
                To empower individuals and teams with a smart, intuitive
                workspace that simplifies task management, encourages
                collaboration, and helps people focus on what matters most —
                getting things done with clarity and confidence.
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
              Task Desk is designed to simplify your work, improve
              collaboration, and help you manage daily tasks with clarity and
              focus.
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
                  {/* Profile Section */}
        <div className="flex flex-col items-center py-10 px-4">
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


      </div>
    </div>
  );
};

export default Landing;
