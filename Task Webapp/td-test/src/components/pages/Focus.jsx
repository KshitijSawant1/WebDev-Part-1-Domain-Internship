import React, { useEffect, useState, useMemo, useRef } from "react";
import { supabase } from "../../supabaseClient";
import { UserAuth } from "../../context/AuthContext";
import { HiPlay } from "react-icons/hi";
import { LuRefreshCw } from "react-icons/lu";
import { FaCirclePause } from "react-icons/fa6";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
import { LuCoffee, LuBriefcase } from "react-icons/lu";
import { MdTask } from "react-icons/md";

const WORK_MIN = 25;
const BREAK_MIN = 5;

const Focus = () => {
  const { session } = UserAuth();
  const userId = session?.user?.id;

  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [showTasks, setShowTasks] = useState(false);

  const [mode, setMode] = useState("work"); // "work" | "break"
  const totalSeconds = mode === "work" ? WORK_MIN * 60 : BREAK_MIN * 60;
  const [seconds, setSeconds] = useState(totalSeconds);
  const [running, setRunning] = useState(false);
  const [startedAt, setStartedAt] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // define currentTask (handles numeric/string ids safely)
  const currentTask = useMemo(
    () => tasks.find((t) => String(t.id) === String(selectedTaskId)) || null,
    [tasks, selectedTaskId]
  );

  // state & refs (put near other useState/useMemo)
  const taskMenuRef = useRef(null);

  // close the task popover on outside click / Esc
  useEffect(() => {
    const onDown = (e) => {
      if (!showTasks) return;
      if (taskMenuRef.current && !taskMenuRef.current.contains(e.target)) {
        setShowTasks(false);
      }
    };
    const onKey = (e) => e.key === "Escape" && setShowTasks(false);

    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [showTasks]);

  // ---- Fullscreen helpers (single implementation) ----
  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const enterFS = async () => {
    const el = document.documentElement;
    if (el.requestFullscreen) return el.requestFullscreen();
    // @ts-ignore - Safari
    if (el.webkitRequestFullscreen) return el.webkitRequestFullscreen();
  };
  const exitFS = async () => {
    if (document.exitFullscreen) return document.exitFullscreen();
    // @ts-ignore - Safari
    if (document.webkitExitFullscreen) return document.webkitExitFullscreen();
  };
  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await enterFS();
    } else {
      await exitFS();
    }
    setIsFullscreen(!!document.fullscreenElement);
  };
  // -----------------------------------------------------

  // load tasks
  useEffect(() => {
    if (!userId) return;
    (async () => {
      const { data } = await supabase
        .from("tasks")
        .select("id, title")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(200);
      setTasks(data || []);
    })();
  }, [userId]);

  // tick
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => Math.max(s - 1, 0)), 1000);
    return () => clearInterval(id);
  }, [running]);

  // log when work finishes + auto-exit fullscreen
  useEffect(() => {
    if (seconds === 0 && document.fullscreenElement) {
      document.exitFullscreen?.();
      // @ts-ignore
      document.webkitExitFullscreen?.();
      setIsFullscreen(false);
    }

    if (seconds !== 0 || !running) return;
    setRunning(false);
    (async () => {
      if (mode === "work" && userId && startedAt) {
        const endedAt = new Date().toISOString();
        const duration = (Date.now() - new Date(startedAt).getTime()) / 1000;
        await supabase.from("focus_sessions").insert({
          user_id: userId,
          task_id: selectedTaskId ?? null,
          started_at: startedAt,
          ended_at: endedAt,
          duration_seconds: Math.round(duration),
          kind: "work",
        });
      }
    })();
  }, [seconds, running, mode, startedAt, selectedTaskId, userId]);

  // controls
  const start = () => {
    setStartedAt(new Date().toISOString());
    setRunning(true);
  };
  const pause = () => setRunning(false);
  const reset = () => {
    setRunning(false);
    setSeconds(mode === "work" ? WORK_MIN * 60 : BREAK_MIN * 60);
  };
  const switchMode = (m) => {
    setMode(m);
    setRunning(false);
    setSeconds(m === "work" ? WORK_MIN * 60 : BREAK_MIN * 60);
  };

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  const progress = seconds / totalSeconds;
  const C = 2 * Math.PI * 110;
  const dash = Math.max(0, Math.min(C, (1 - progress) * C)); // clamp

  // gentle page bg
  const bg =
    mode === "work"
      ? "radial-gradient(1200px 800px at 50% 30%, rgba(16,185,129,0.10), rgba(255,255,255,0))"
      : "radial-gradient(1200px 800px at 50% 30%, rgba(59,130,246,0.10), rgba(255,255,255,0))";

  return (
    <div className="relative min-h-screen w-full overflow-hidden pt-20">
      <div className="pt-15 pb-15"></div>
      {/* Flowing background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Wave layer A */}
        <div
          className="absolute inset-0"
          style={{
            background:
              mode === "work"
                ? "linear-gradient(70deg, rgba(16,185,129,0.25) 0%, rgba(52,211,153,0.18) 50%, rgba(16,185,129,0.25) 100%)"
                : "linear-gradient(70deg, rgba(59,130,246,0.25) 0%, rgba(96,165,250,0.18) 50%, rgba(59,130,246,0.25) 100%)",
            backgroundSize: "180% 180%",
            animation: "waveLayerA 16s ease-in-out infinite",
            opacity: 0.35,
          }}
        />

        {/* Wave layer B */}
        <div
          className="absolute inset-0"
          style={{
            background:
              mode === "work"
                ? "linear-gradient(250deg, rgba(16,185,129,0.25) 0%, rgba(255,255,255,0.15) 50%, rgba(16,185,129,0.25) 100%)"
                : "linear-gradient(250deg, rgba(59,130,246,0.25) 0%, rgba(255,255,255,0.15) 50%, rgba(59,130,246,0.25) 100%)",
            backgroundSize: "200% 200%",
            animation: "waveLayerB 20s ease-in-out infinite",
            mixBlendMode: "overlay",
            opacity: 0.28,
          }}
        />

        {/* Subtle vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(120% 60% at 50% 40%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)",
          }}
        />

        {/* Inline keyframes */}
        <style>{`
    @keyframes waveLayerA {
      0%   { background-position: 50% 50%; }
      50%  { background-position: 0% 60%; }
      100% { background-position: 50% 50%; }
    }
    @keyframes waveLayerB {
      0%   { background-position: 50% 50%; }
      50%  { background-position: 100% 40%; }
      100% { background-position: 50% 50%; }
    }
  `}</style>
      </div>

      {/* Floating FABs (bottom-right) */}
      <div className="fixed right-6 bottom-6 z-40 flex flex-col items-end gap-3">
        {/* Segmented Work / Break toggle */}
        <div
          className="flex items-center rounded-full bg-white/95 backdrop-blur border border-slate-200 shadow-lg overflow-hidden"
          aria-label="Toggle focus mode"
        >
          <button
            onClick={() => switchMode("work")}
            aria-pressed={mode === "work"}
            title="Work mode"
            className={`p-3 transition-all duration-200 hover:scale-110 active:scale-95 ${
              mode === "work"
                ? "bg-emerald-600 text-white"
                : "text-slate-700 hover:bg-slate-50"
            }`}
          >
            <LuBriefcase className="w-5 h-5" />
          </button>

          <button
            onClick={() => switchMode("break")}
            aria-pressed={mode === "break"}
            title="Break mode"
            className={`p-3 transition-all duration-200 hover:scale-110 active:scale-95 ${
              mode === "break"
                ? "bg-blue-600 text-white"
                : "text-slate-700 hover:bg-slate-50"
            }`}
          >
            <LuCoffee className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Floating pill (top-right corner) */}
      <div className="fixed top-20 right-6 z-40">
        <div
          className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/95 backdrop-blur
               shadow-lg px-2 py-1.5 transition-all duration-200 hover:shadow-xl"
          role="toolbar"
          aria-label="Focus controls"
        >
          {/* Selected task chip (if any) */}
          {currentTask && (
            <div
              className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-full text-xs
                   bg-emerald-50 text-emerald-700 border border-emerald-200"
              title={`Attached: ${currentTask.title}`}
            >
              <MdTask className="w-3.5 h-3.5" />
              <span className="max-w-[12rem] truncate">
                {currentTask.title}
              </span>
            </div>
          )}

          {/* Divider */}
          {currentTask && (
            <div className="hidden sm:block w-px h-5 bg-slate-200" />
          )}

          {/* Fullscreen toggle */}
          <button
            onClick={toggleFullscreen}
            className="group p-2.5 rounded-full border border-slate-200 bg-white text-slate-700
                 hover:bg-slate-50 hover:border-slate-300 active:scale-95 transition
                 grid place-items-center"
            aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? (
              <MdFullscreenExit className="w-5 h-5 group-hover:scale-110 transition-transform" />
            ) : (
              <MdFullscreen className="w-5 h-5 group-hover:scale-110 transition-transform" />
            )}
          </button>

          {/* Task selector (icon + popover) */}
          <div className="relative" ref={taskMenuRef}>
            <button
              onClick={() => setShowTasks((v) => !v)}
              className={`group p-2.5 rounded-full border bg-white text-slate-700 grid place-items-center
                    active:scale-95 transition
                    ${
                      showTasks
                        ? "border-slate-300"
                        : "border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                    }`}
              aria-haspopup="menu"
              aria-expanded={showTasks}
              aria-label="Attach to task"
              title="Attach to task"
            >
              <MdTask className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>

            {/* Popover */}
            <div
              className={`absolute right-0 mt-2 w-56 max-h-64 overflow-auto rounded-xl border border-slate-200 bg-white shadow-xl
                    transition-all duration-150 origin-top-right
                    ${
                      showTasks
                        ? "opacity-100 scale-100 pointer-events-auto"
                        : "opacity-0 scale-95 pointer-events-none"
                    }`}
              role="menu"
              aria-label="Select task"
            >
              <ul className="py-1 text-sm">
                <li
                  className={`px-3 py-2 cursor-pointer hover:bg-slate-50 ${
                    !selectedTaskId ? "bg-slate-50" : ""
                  }`}
                  onClick={() => {
                    setSelectedTaskId(null);
                    setShowTasks(false);
                  }}
                  role="menuitem"
                >
                  (No task attached)
                </li>
                <li className="my-1 h-px bg-slate-100" />

                {tasks.length === 0 && (
                  <li className="px-3 py-2 text-slate-500">No tasks found</li>
                )}

                {tasks.map((t) => {
                  const active = selectedTaskId === t.id;
                  return (
                    <li
                      key={t.id}
                      className={`px-3 py-2 cursor-pointer hover:bg-slate-50 flex items-center gap-2
                            ${active ? "bg-indigo-50 text-indigo-700" : ""}`}
                      onClick={() => {
                        setSelectedTaskId(t.id);
                        setShowTasks(false);
                      }}
                      role="menuitem"
                      title={t.title}
                    >
                      <span
                        className={`inline-block w-1.5 h-1.5 rounded-full
                              ${active ? "bg-indigo-600" : "bg-slate-300"}`}
                      />
                      <span className="truncate">{t.title}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 ">
        {/* Timer bubble with circular progress */}
        <div className="relative mx-auto flex items-center justify-center">
          <div className="relative mx-auto aspect-square w-full max-w-[26rem]">
            {/* circular progress ring (track + progress) */}
            <svg
              className="absolute inset-0 m-auto -rotate-90 pointer-events-none"
              width="100%"
              height="100%"
              viewBox="0 0 240 240"
            >
              <defs>
                <linearGradient
                  id="ringGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop
                    offset="0%"
                    stopColor={mode === "work" ? "#10B981" : "#60A5FA"}
                  />
                  <stop
                    offset="100%"
                    stopColor={mode === "work" ? "#34D399" : "#3B82F6"}
                  />
                </linearGradient>
              </defs>

              <circle
                cx="120"
                cy="120"
                r="110"
                stroke="rgba(2, 6, 23, 0.06)"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="120"
                cy="120"
                r="110"
                stroke="url(#ringGradient)"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={dash}
                className="transition-[stroke-dashoffset] duration-500 ease-out"
              />
            </svg>

            {/* inner bubble */}
            <div
              className={`absolute inset-0 m-auto flex h-56 w-56 items-center justify-center rounded-full shadow-xl ${
                running ? "breath" : ""
              }`}
              style={{
                background:
                  mode === "work"
                    ? "radial-gradient(circle at 35% 30%, rgba(16,185,129,0.20), rgba(255,255,255,0.72))"
                    : "radial-gradient(circle at 65% 30%, rgba(59,130,246,0.20), rgba(255,255,255,0.72))",
                boxShadow:
                  "0 12px 28px rgba(2, 6, 23, 0.12), inset 0 0 30px rgba(255,255,255,0.35)",
              }}
            >
              <div className="text-center ">
                <div className="text-center">
                  <div
                    role="timer"
                    aria-live="polite"
                    aria-label={`${mm} minutes ${ss} seconds, ${mode} mode`}
                    className="text-[52px] md:text-[64px] font-bold tracking-wide text-slate-900 flex gap-1 justify-center"
                  >
                    {mm.split("").map((digit, i) => (
                      <span key={`m-${i}-${digit}`} className="flip">
                        {digit}
                      </span>
                    ))}
                    <span>:</span>
                    {ss.split("").map((digit, i) => (
                      <span key={`s-${i}-${digit}`} className="flip">
                        {digit}
                      </span>
                    ))}
                  </div>

                  {/* Inline style block */}
                  <style>{`
    @keyframes flipIn {
      0% {
        transform: rotateX(90deg);
        opacity: 0;
      }
      60% {
        transform: rotateX(-20deg);
        opacity: 1;
      }
      100% {
        transform: rotateX(0deg);
      }
    }
    .flip {
      display: inline-block;
      animation: flipIn 0.5s ease-out;
      transform-origin: bottom;
    }
  `}</style>
                </div>

                <div className="mt-6 flex items-center justify-center">
                  <div className="flex items-center gap-1 rounded-full bg-white/90 backdrop-blur border border-slate-200 shadow-md overflow-hidden">
                    {!running ? (
                      <button
                        onClick={start}
                        className="px-5 py-2.5 flex items-center gap-2 text-sm font-medium 
                   bg-emerald-600 text-white 
                   hover:bg-emerald-700 hover:shadow-lg hover:scale-105
                   transition-all duration-200 ease-out active:scale-95"
                        aria-label="Start"
                      >
                        <HiPlay className="w-5 h-5 transition-transform duration-200 group-hover:rotate-90" />
                      </button>
                    ) : (
                      <button
                        onClick={pause}
                        className="px-5 py-2.5 flex items-center gap-2 text-sm font-medium 
                   bg-yellow-500 text-white 
                   hover:bg-yellow-600 hover:shadow-lg hover:scale-105
                   transition-all duration-200 ease-out active:scale-95"
                        aria-label="Pause"
                      >
                        <FaCirclePause className="w-5 h-5 transition-transform duration-200 group-hover:rotate-180" />
                      </button>
                    )}

                    <button
                      onClick={reset}
                      className="px-5 py-2.5 flex items-center gap-2 text-sm font-medium 
                 bg-white text-slate-700 hover:bg-slate-50 
                 border-l border-slate-200 
                 hover:shadow-lg hover:scale-105
                 transition-all duration-200 ease-out active:scale-95"
                      aria-label="Reset"
                    >
                      <LuRefreshCw className="w-5 h-5 transition-transform duration-300 hover:rotate-180" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-slate-600">
          {mode === "work"
            ? "Deep work—stay gently focused."
            : "Breathe and reset. Short break."}
        </p>
      </div>

      {/* local animation css */}
      <style>{`

`}</style>
    </div>
  );
};

export default Focus;
