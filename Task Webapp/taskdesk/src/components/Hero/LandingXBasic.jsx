import React from "react";

const LandingXBasic = () => {
  return (
    <div>
      <div className="min-h-screen bg-white text-blue-900 font-sans">
        {/* Header */}
        <header className="text-center py-12 px-4">
          <p className="text-sm text-blue-600 bg-blue-100 inline-block px-4 py-1 rounded-full font-medium">
            New Feature Launched!
          </p>
          <h1 className="text-4xl font-bold mt-4">TASK DESK</h1>
          <p className="mt-2 text-gray-600 max-w-xl mx-auto">
            Manage your tasks, stay productive, and keep things organized in one
            place.
          </p>
          <a
            href="#"
            className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Get Started
          </a>
        </header>

        {/* Hero Image */}
        <div className="flex justify-center">
          <img
            src="https://i.pinimg.com/1200x/a0/1c/3a/a01c3add44d506cd121d2ca8b27f15ee.jpg"
            alt="Task Desk Preview"
            className="rounded-lg shadow-md max-w-[600px] w-full"
          />
        </div>

        {/* About Section */}
        <section className="bg-blue-50 text-center mt-12 py-12 px-6">
          <h2 className="text-2xl font-semibold">About the Maker</h2>
          <p className="text-gray-700 mt-4 max-w-2xl mx-auto leading-relaxed">
            Hello! I’m <span className="font-semibold">Kshitij Sawant</span>,
            the creator of Task Desk. My goal is to build simple and effective
            tools that help people stay focused and achieve their goals.
          </p>

          <div className="flex justify-center gap-4 mt-6 flex-wrap">
            <a
              href="https://github.com/KshitijSawant1"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-blue-600 text-blue-600 px-4 py-2 rounded-full hover:bg-blue-600 hover:text-white transition"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/kshitijksawant/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-blue-600 text-blue-600 px-4 py-2 rounded-full hover:bg-blue-600 hover:text-white transition"
            >
              LinkedIn
            </a>
          </div>
        </section>

        {/* Signout Button */}
        <footer className="text-center py-6">
          <button className="text-sm text-white bg-red-500 px-5 py-2 rounded hover:bg-red-600 transition">
            Sign Out
          </button>
        </footer>
      </div>
    </div>
  );
};

export default LandingXBasic;
