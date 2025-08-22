import MetaBalls from "../pages/MetaBalls";
import { HiPlay } from "react-icons/hi";
import { LuRefreshCw } from "react-icons/lu";
import { FaCirclePause } from "react-icons/fa6";

export default function FocusTimer({
  mm,
  ss,
  mode,
  running,
  start,
  pause,
  reset,
  C,
  dash,
}) {
  return (
    <div className="relative max-w-3xl mx-auto px-4 min-h-[520px]">
      {/* Background metaballs */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <MetaBalls
          color={mode === "work" ? "#10B981" : "#3B82F6"}
          enableTransparency
          enableMouseInteraction
          ballScale={1.8}
          ballSizeMin={0.8}
          ballSizeMax={3.0}
          cursorBallSize={5}
          orbitMin={10}
          orbitMax={22}
          clumpFactor={1.5}
          speed={0.6}
          animationSize={260}
        />
      </div>

      {/* Timer bubble */}
      <div className="relative mx-auto flex items-center justify-center pt-12">
        <div className="relative mx-auto aspect-square w-full max-w-[26rem]">
          {/* circular progress ring */}
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
            <div className="text-center">
              <div
                role="timer"
                aria-live="polite"
                aria-label={`${mm} minutes ${ss} seconds, ${mode} mode`}
                className="text-[52px] md:text-[64px] font-bold tracking-wide text-slate-900"
              >
                {mm}:{ss}
              </div>

              <div className="mt-4 flex items-center justify-center gap-3">
                {!running ? (
                  <button
                    onClick={start}
                    className="p-3 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition flex items-center justify-center"
                    aria-label="Start"
                  >
                    <HiPlay className="w-6 h-6" />
                  </button>
                ) : (
                  <button
                    onClick={pause}
                    className="p-3 rounded-md bg-yellow-500 text-white hover:bg-yellow-600 transition flex items-center justify-center"
                    aria-label="Pause"
                  >
                    <FaCirclePause className="w-6 h-6" />
                  </button>
                )}

                <button
                  onClick={reset}
                  className="p-3 rounded-md bg-white text-slate-700 hover:bg-slate-50 transition border flex items-center justify-center"
                  aria-label="Reset"
                >
                  <LuRefreshCw className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-slate-600 relative z-10">
        {mode === "work"
          ? "Deep work—stay gently focused."
          : "Breathe and reset. Short break."}
      </p>

      {/* local animation css */}
      <style>{`
        @keyframes breathe {
          0%, 100% { transform: scale(0.985); }
          50%      { transform: scale(1.000); }
        }
        .breath { animation: breathe 5.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .breath { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
