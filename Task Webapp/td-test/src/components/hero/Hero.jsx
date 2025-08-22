import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import pattern from "../../assets/patterns/G2.png";

const HOME_REDIRECT_FLAG = "td_home_redirected_once";

const Hero = () => {
  const { session } = UserAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If signed in and landing on "/" for the first time in this session, redirect
    if (
      session?.user &&
      location.pathname === "/" &&
      !sessionStorage.getItem(HOME_REDIRECT_FLAG)
    ) {
      sessionStorage.setItem(HOME_REDIRECT_FLAG, "1");
      navigate("/playground", { replace: true });
    }
  }, [session, location.pathname, navigate]);

  // Reset the flag when user leaves/refreshes the page
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.removeItem(HOME_REDIRECT_FLAG);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-white overflow-hidden pt-12">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 z-0"
        style={{ backgroundImage: `url(${pattern})` }}
      />

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center mb-4 mt-10">
        <p className="text-sm text-blue-500 bg-blue-200 px-4 py-1 rounded-full font-medium">
          New Feature Launched!
        </p>

        <div className="flex justify-center gap-2 flex-wrap mt-6">
          {["T", "A", "S", "K", "D", "E", "S", "K"].map((char, index) => (
            <div
              key={index}
              className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center 
                 bg-blue-900 text-blue-100 font-bold text-2xl rounded-md shadow-lg 
                 transition-all duration-300 ease-in hover:scale-110 hover:bg-blue-200 hover:text-blue-500 hover:duration-500 hover:ease-out"
            >
              {char}
            </div>
          ))}
        </div>

        {/* Content Split Section */}
        <section className="w-full max-w-6xl mx-auto overflow-hidden rounded-lg sm:grid sm:grid-cols-2 sm:items-center">
          <div className="p-8 md:p-12 lg:px-16 lg:py-24">
            <div className="text-center sm:text-left">
              <h2
                className="text-3xl font-bold text-gray-900 md:text-3xl"
                style={{ fontFamily: "cursive" }}
              >
                Focus. Plan. Complete.
              </h2>

              <p className="hidden text-gray-600 md:mt-4 md:block">
                Task Desk helps you stay focused by managing tasks, setting
                priorities, and organizing everything in one place. Boost
                productivity effortlessly.
              </p>

              <div className="mt-4 md:mt-8">
                <Link
                  to={session?.user ? "/playground" : "/signup"}
                  className="inline-block rounded bg-blue-600 px-8 py-3 text-sm font-medium text-white hover:bg-blue-700 transition"
                >
                  Get Started Today
                </Link>
              </div>
            </div>
          </div>

          <img
            alt="Scroll Target"
            src="https://i.pinimg.com/1200x/3e/f6/4d/3ef64dc16c03bbcbf568fcc891f2852c.jpg"
            className="h-full w-full object-cover sm:h-[calc(100%_-_2rem)] md:h-[calc(100%_-_4rem)] sm:rounded-ss-[30px] md:rounded-ss-[60px]"
          />
        </section>

        {/* About the Maker */}
        <section className="relative overflow-hidden rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-indigo-50 shadow-sm">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(59,130,246,0.25) 1px, transparent 0)",
              backgroundSize: "20px 20px",
            }}
          />

          <div className="relative z-10 mx-auto max-w-4xl px-6 py-10 text-center">
            <div className="mx-auto mb-6 h-20 w-20 overflow-hidden rounded-full ring-4 ring-white shadow-md">
              <img
                src="/ks-avatar.jpg"
                alt="Kshitij Sawant"
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.outerHTML = `
                    <div class="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-white text-xl font-semibold">
                      KS
                    </div>`;
                }}
              />
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-blue-900">
              Hi, I’m Kshitij Sawant
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-base md:text-lg leading-relaxed text-slate-700">
              I build calm, purposeful tools that help you focus.{" "}
              <span className="font-semibold">Task Desk</span> is designed to
              remove noise, surface priorities, and turn ideas into finished
              work—without the clutter.
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-200">
                React & Tailwind
              </span>
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-200">
                Supabase
              </span>
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-200">
                Focus-first UX
              </span>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://github.com/KshitijSawant1"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-blue-800 px-5 py-2.5 text-sm font-medium text-blue-800 transition hover:bg-blue-800 hover:text-white"
                aria-label="Open GitHub profile"
              >
                {/* GitHub icon */}
                <svg
                  className="h-5 w-5 transition group-hover:scale-110"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.4 7.85 10.94.57.1.78-.24.78-.54v-1.94c-3.2.7-3.87-1.37-3.87-1.37-.52-1.3-1.28-1.65-1.28-1.65-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.78 2.7 1.26 3.36.96.1-.74.4-1.26.72-1.55-2.55-.3-5.23-1.27-5.23-5.67 0-1.25.44-2.27 1.2-3.07-.12-.3-.52-1.52.12-3.17 0 0 .97-.3 3.2 1.18.93-.26 1.92-.38 2.9-.38.98 0 1.97.13 2.9.38 2.23-1.48 3.2-1.18 3.2-1.18.65 1.65.25 2.87.12 3.17.75.8 1.2 1.82 1.2 3.07 0 4.4-2.7 5.36-5.26 5.65.4.35.76 1.04.76 2.1v3.13c0 .3.2.65.78.54A11.5 11.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
                </svg>
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/kshitijksawant/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-blue-800 px-5 py-2.5 text-sm font-medium text-blue-800 transition hover:bg-blue-800 hover:text-white"
                aria-label="Open LinkedIn profile"
              >
                {/* LinkedIn icon */}
                <svg
                  className="h-5 w-5 transition group-hover:scale-110"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0h4.8v2.2h.07c.67-1.25 2.31-2.55 4.75-2.55 5.09 0 6.03 3.34 6.03 7.68V24h-5V14.3c0-2.3-.04-5.26-3.2-5.26-3.2 0-3.69 2.5-3.69 5.09V24h-5V8z" />
                </svg>
                LinkedIn
              </a>
            </div>

            <p className="mt-6 text-xs text-slate-500">
              Built with React, Tailwind and Supabase
            </p>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Hero;
