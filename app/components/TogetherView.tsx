"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Copy, CheckCircle2 } from "lucide-react";
import NiboMascot from "./NiboMascot";
import { logSession } from "@/lib/actions";

export default function TogetherView({
  taskId,
  title,
}: {
  taskId: string | null;
  title: string;
}) {
  const [phase, setPhase] = useState<"setup" | "active" | "complete">("setup");
  const [copied, setCopied] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [saving, setSaving] = useState(false);

  const shareLink = "app.therally.com/join/zr4821";
  const shareMessage = `I'm studying ${title} for 45 minutes. Join my session?`;

  useEffect(() => {
    if (phase !== "active") return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [phase]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const finishTogether = async () => {
    setSaving(true);
    if (taskId) {
      await logSession({
        taskId,
        durationSec: seconds,
        mode: "study",
        isShared: true,
        friendName: "Rio",
      });
    }
    setSaving(false);
    setPhase("complete");
  };

  if (phase === "setup") {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="w-full max-w-sm rounded-3xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Study together</p>
          <h1 className="mt-1 font-display text-2xl font-semibold">Share your session</h1>
          <p className="mt-2 text-sm text-muted-foreground">{shareMessage}</p>
          <p className="mt-1 text-xs text-muted-foreground">{shareLink}</p>

          <div className="mt-5 flex flex-col gap-3">
            <button
              onClick={() => setPhase("active")}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-success px-5 py-2.5 text-sm font-semibold text-white"
            >
              Send on WhatsApp
            </button>
            <button
              onClick={copyLink}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold"
            >
              {copied ? (
                <CheckCircle2 className="h-4 w-4 text-success" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              {copied ? "Link copied" : "Copy link"}
            </button>
          </div>
          <p className="mt-4 text-xs text-center text-muted-foreground">
            Waiting for your friend to join...
          </p>
          <button
            onClick={() => setPhase("active")}
            className="mt-2 w-full text-xs text-primary underline"
          >
            (Demo) Simulate friend joining
          </button>
        </div>
      </main>
    );
  }

  if (phase === "active") {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          <p className="text-sm text-muted-foreground">Studying together</p>
          <p className="mt-2 font-display text-5xl font-semibold tabular-nums">
            {mm}:{ss}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">shared session time</p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border bg-card p-3 text-left">
              <p className="text-xs text-muted-foreground">You</p>
              <p className="text-sm font-medium">{title}</p>
              <p className="text-xs text-success mt-1">● studying</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-3 text-left">
              <p className="text-xs text-muted-foreground">Rio</p>
              <p className="text-sm font-medium">HCI Milestone 3</p>
              <p className="text-xs text-success mt-1">● studying</p>
            </div>
          </div>

          <button
            onClick={finishTogether}
            disabled={saving}
            className="mt-8 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-50"
          >
            {saving ? "Saving..." : "Leave session"}
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-sm text-center rounded-3xl border border-border bg-cream p-8">
        <div className="flex justify-center gap-3 mb-4">
          <NiboMascot color="navy" size={90} />
          <NiboMascot color="purple" size={90} />
        </div>
        <h2 className="font-display text-xl font-semibold">You did it together!</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          You and Rio studied for {mm}:{ss} side by side.
        </p>
        <Link
          href="/home"
          className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}