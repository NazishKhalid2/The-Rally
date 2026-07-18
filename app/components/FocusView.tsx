"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import NiboMascot from "./NiboMascot";
import { logSession } from "@/lib/actions";

export default function FocusView({
  taskId,
  title,
  subject,
  mode,
}: {
  taskId: string | null;
  title: string;
  subject: string | null;
  mode: string;
}) {
  const isCreative = mode === "creative";

  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);
  const [phase, setPhase] = useState<"active" | "complete">("active");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!running || phase !== "active") return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [running, phase]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  const finishSession = async () => {
    setSaving(true);
    if (taskId) {
      await logSession({ taskId, durationSec: seconds, mode });
    }
    setSaving(false);
    setPhase("complete");
  };

  if (phase === "complete") {
    return (
      <main
        className={`min-h-screen flex flex-col items-center justify-center px-6 ${
          isCreative ? "bg-creative-bg text-creative-fg" : "bg-focus-bg text-focus-fg"
        }`}
      >
        <NiboMascot color={isCreative ? "purple" : "navy"} size={130} />
        <h1 className="mt-6 font-display text-2xl font-semibold">Session logged.</h1>
        <p className="mt-1 text-sm opacity-70">
          Great work — {mm}:{ss} logged
          {taskId ? "" : " (not saved, no task selected)"}.
        </p>
        <Link
          href="/home"
          className={`mt-8 rounded-full px-8 py-3 text-sm font-semibold ${
            isCreative ? "bg-creative-fg text-creative-bg" : "bg-focus-fg text-focus-bg"
          }`}
        >
          Back to home
        </Link>
      </main>
    );
  }

  if (isCreative) {
    return (
      <main className="min-h-screen bg-creative-bg text-creative-fg flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Link href="/home" className="text-sm text-creative-fg/60 hover:text-creative-fg">
              ← Back
            </Link>
          </div>

          <div className="flex items-center justify-center gap-2 mb-3">
            <h1 className="font-display text-2xl font-semibold">{title}</h1>
            <span className="rounded-full bg-creative-fg/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
              Creative
            </span>
          </div>
          {subject && <p className="text-sm text-creative-fg/60 mb-8">{subject}</p>}

          <p className="text-sm text-creative-fg/80 mb-8">
            ✦ Open your project brief and read through it once.
          </p>

          <NiboMascot color="purple" size={110} />

          <div className="mt-8 h-1.5 w-full overflow-hidden rounded-full bg-creative-fg/10">
            <div className="h-full w-2/3 rounded-full bg-creative-fg/60 animate-pulse" />
          </div>
          <p className="mt-2 text-xs text-creative-fg/50">working away quietly</p>

          <button
            onClick={finishSession}
            disabled={saving}
            className="mt-10 w-full rounded-full bg-creative-fg text-creative-bg py-3 text-sm font-semibold disabled:opacity-50"
          >
            {saving ? "Saving..." : "Done"}
          </button>
          <p className="mt-3 text-xs text-creative-fg/50">Done for now</p>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-focus-bg text-focus-fg">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-8">
        <div className="flex items-center justify-between">
          <Link href="/home" className="text-sm text-focus-fg/60 hover:text-focus-fg">
            ← Back
          </Link>
          <span className="rounded-full bg-focus-fg/10 px-3 py-1 text-xs font-medium text-focus-fg/80">
            Focus mode · Deep work
          </span>
        </div>

        <div className="mt-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-focus-fg/50">
            Now studying
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-focus-fg">
            {title}
          </h1>
          {subject && <p className="mt-1 text-sm text-focus-fg/60">{subject}</p>}

          <div className="mx-auto mt-12 flex h-64 w-64 items-center justify-center rounded-full border border-focus-fg/10 bg-focus-fg/[0.03] shadow-inner">
            <p className="font-display text-6xl font-semibold tabular-nums text-focus-fg">
              {mm}:{ss}
            </p>
          </div>

          <div className="mt-12 flex justify-center gap-3">
            <button
              onClick={() => setRunning((r) => !r)}
              className="rounded-full bg-focus-fg px-8 py-3 text-sm font-semibold text-focus-bg"
            >
              {running ? "Pause" : "Resume"}
            </button>
            <button
              onClick={finishSession}
              disabled={saving}
              className="rounded-full border border-focus-fg/20 px-8 py-3 text-sm font-semibold text-focus-fg hover:bg-focus-fg/5 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Done"}
            </button>
          </div>
          <p className="mt-4 text-xs text-focus-fg/50">Come back to log</p>
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-focus-fg/10 bg-focus-fg/[0.04] p-5">
          <div className="flex items-center gap-3">
            <NiboMascot color="navy" size={48} />
            <div>
              <p className="font-display text-sm font-semibold">Nibo&apos;s cheering you on</p>
              <p className="text-xs text-focus-fg/60">Quietly working in the background</p>
            </div>
          </div>
          <Link
            href={`/together${taskId ? `?taskId=${taskId}` : ""}`}
            className="rounded-full border border-focus-fg/20 px-4 py-2 text-xs font-semibold hover:bg-focus-fg/5"
          >
            Study together
          </Link>
        </div>
      </div>
    </div>
  );
}