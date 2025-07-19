import React from "react";
import pattern from "../../assets/patterns/G4.png";

const LandingBasic = () => {
  const handleScroll = () => {
    const el = document.getElementById("features");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen w-full bg-[#E8FCCF] overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 z-0"
        style={{ backgroundImage: `url(${pattern})` }}
      />

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center mb-4 mt-10">
        <p className="text-sm text-[#134611] bg-[#96E072] px-4 py-1 rounded-full  font-medium">
          New Feature Launched!
        </p>
        <div className="flex justify-center gap-2 flex-wrap mt-6">
          {["T", "A", "S", "K", "D", "E", "S", "K"].map((char, index) => (
            <div
              key={index}
              className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center 
                 bg-[#134611] text-white font-bold text-2xl rounded-md shadow-lg 
                 transition-all duration-300 ease-in hover:scale-110 hover:bg-[#96E072] hover:duration-500 hover:ease-out"
            >
              {char}
            </div>
          ))}
        </div>

        {/* Content Split Section */}
        <section className="w-full max-w-6xl mx-auto overflow-hidden rounded-lg sm:grid sm:grid-cols-2 sm:items-center">
          <div className="p-8 md:p-12 lg:px-16 lg:py-24">
            <div className="text-center sm:text-left">
              <h2 className="text-3xl font-bold text-gray-900 md:text-3xl"style={{ fontFamily: "cursive" }}>
                Focus. Plan. Complete.
              </h2>

              <p className="hidden text-gray-600 md:mt-4 md:block">
                Task Desk helps you stay focused by managing tasks, setting
                priorities, and organizing everything in one place. Boost
                productivity effortlessly.
              </p>

              <div className="mt-4 md:mt-8">
                <a
                  href="#"
                  className="inline-block rounded bg-emerald-600 px-8 py-3 text-sm font-medium text-white hover:bg-emerald-700 transition"
                >
                  Get Started Today
                </a>
              </div>
            </div>
          </div>

          <img
            alt="Scroll Target"
            src="https://i.pinimg.com/1200x/a0/1c/3a/a01c3add44d506cd121d2ca8b27f15ee.jpg"
            className="h-full w-full object-cover sm:h-[calc(100%_-_2rem)] md:h-[calc(100%_-_4rem)] sm:rounded-ss-[30px] md:rounded-ss-[60px]"
          />
          {/* About the Maker Section */}
        </section>
        <section className="bg-green-50 py-16 px-4 text-center border-3 border-green-900 rounded-xl shadow-md">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
              About the Maker
            </h2>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              Hi! I’m <span className="font-semibold">Kshitij Sawant</span>, the
              creator of Task Desk. I'm passionate about building tools that
              boost productivity and bring ideas to life. Task Desk is crafted
              with simplicity and focus to help you manage tasks confidently.
            </p>

            <div className="flex justify-center gap-4 flex-wrap">
              <a
                href="https://github.com/KshitijSawant1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-green-800 text-green-800 px-4 py-2 rounded-full hover:bg-green-800 hover:text-white transition"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.4 7.85 10.94.57.1.78-.24.78-.54v-1.94c-3.2.7-3.87-1.37-3.87-1.37-.52-1.3-1.28-1.65-1.28-1.65-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.78 2.7 1.26 3.36.96.1-.74.4-1.26.72-1.55-2.55-.3-5.23-1.27-5.23-5.67 0-1.25.44-2.27 1.2-3.07-.12-.3-.52-1.52.12-3.17 0 0 .97-.3 3.2 1.18.93-.26 1.92-.38 2.9-.38.98 0 1.97.13 2.9.38 2.23-1.48 3.2-1.18 3.2-1.18.65 1.65.25 2.87.12 3.17.75.8 1.2 1.82 1.2 3.07 0 4.4-2.7 5.36-5.26 5.65.4.35.76 1.04.76 2.1v3.13c0 .3.2.65.78.54A11.5 11.5 0 0023.5 12c0-6.35-5.15-11.5-11.5-11.5z" />
                </svg>
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/kshitijksawant/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-green-800 text-green-800 px-4 py-2 rounded-full hover:bg-green-800 hover:text-white transition"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0h4.8v2.2h.07c.67-1.25 2.31-2.55 4.75-2.55 5.09 0 6.03 3.34 6.03 7.68V24h-5V14.3c0-2.3-.04-5.26-3.2-5.26-3.2 0-3.69 2.5-3.69 5.09V24h-5V8z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default LandingBasic;
