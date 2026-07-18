"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NiboMascot from "@/app/components/NiboMascot";

export default function Focus() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);
  const [distractions, setDistractions] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  const handleDone = () => {
    setRunning(false);
    setTimeout(() => router.push("/home"), 1400);
  };

  return (
    <div className="min-h-screen bg-[#1B2A4A] text-white">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-8">

        {/* Top bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/home"
            className="text-sm text-white/60 hover:text-white transition"
          >
            ← Back
          </Link>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
            Focus mode · Deep work
          </span>
        </div>

        {/* Task info */}
        <div className="mt-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
            Now studying
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white">
            Free focus
          </h1>
          <p className="mt-1 text-sm text-white/60">Deep work</p>

          {/* Timer circle */}
          <div className="mx-auto mt-12 flex h-64 w-64 flex-col items-center justify-center rounded-full border border-white/10 bg-white/[0.03] shadow-inner">
            <p className="text-6xl font-bold tabular-nums text-white">
              {mm}:{ss}
            </p>
            <p className="mt-2 text-xs uppercase tracking-widest text-white/50">
              {running ? "in session" : "paused"}
            </p>
          </div>

          {/* Controls */}
          <div className="mt-12 flex justify-center gap-3">
            <button
              onClick={() => setRunning((r) => !r)}
              className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-[#1B2A4A] hover:bg-white/90 transition"
            >
              {running ? "Pause" : "Resume"}
            </button>
            <button
              onClick={handleDone}
              className="rounded-full border border-white/20 px-8 py-3 text-sm font-semibold text-white hover:bg-white/5 transition"
            >
              Done
            </button>
          </div>

          <p className="mt-4 text-xs text-white/50">
            {distractions === 0
              ? "Come back to log a distraction"
              : `${distractions} distraction${distractions === 1 ? "" : "s"} logged today`}
          </p>
        </div>

        {/* Bottom Nibo card */}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center gap-3">
            <NiboMascot color="purple" size={48} />
            <div className="text-left">
              <p className="text-sm font-semibold text-white">Got distracted?</p>
              <p className="text-xs text-white/60">Log it — no judgment, just data.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDistractions((d) => d + 1)}
              className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white hover:bg-white/5 transition"
            >
              Log distraction
            </button>
            <Link
              href="/together"
              className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white hover:bg-white/5 transition"
            >
              Study together
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}