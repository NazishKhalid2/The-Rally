"use client";

import { useState } from "react";
import { AppShell } from "@/app/components/AppShell";
import { Sparkles } from "lucide-react";
import NiboMascot from "@/app/components/NiboMascot";

export default function RallyAI() {
  const [question, setQuestion] = useState("");
  const [thread, setThread] = useState<{ q: string; a: string }[]>([]);

  // These will be real values once we wire up the DB — hardcoded for now
const done: number = 2;
const total: number = 6;
const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  const answer = (q: string) => {
    const lower = q.toLowerCase();
    if (!q.trim()) return;
    let a = `You're ${pct}% through this week — ${done} of ${total} tasks done. Keep the rally going.`;
    if (lower.includes("track")) {
      a =
        pct >= 60
          ? `Yes — ${pct}% done and it's only midweek. You're ahead.`
          : `Not quite. ${done}/${total} done. Start with your top task tomorrow morning.`;
    } else if (lower.includes("focus") || lower.includes("time")) {
      a = "Your best focus window is 9–11 am. Put your hardest task there.";
    } else if (lower.includes("miss") || lower.includes("behind")) {
      a = "One missed task, but I've already offered to spread it out on your Home. No spiral needed.";
    }
    setThread((t) => [...t, { q, a }]);
    setQuestion("");
  };

  return (
    <AppShell>
      {/* Header */}
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8A33D] text-[#1B2A4A]">
          <Sparkles className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs uppercase tracking-wide text-[#8B8D98]">Rally AI</p>
          <h1 className="text-3xl font-bold text-[#1B2A4A]">Insights for this week</h1>
        </div>
      </div>

      {/* Nibo summary card */}
      <div className="mt-8 rounded-3xl border border-[#EDEAE2] bg-white p-6">
        <div className="flex items-start gap-4">
          <div className="shrink-0">
            <NiboMascot color="navy" size={64} />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-bold text-[#1B2A4A]">
              {pct >= 60 ? "You're on track" : "Small nudge — you've got this"}
            </h2>
            <p className="mt-2 text-sm text-[#8B8D98]">
              {done} of {total} tasks done. Your focus is best between 9–11 am — schedule your
              hardest task there.
            </p>
            <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-[#F0EDE6]">
              <div
                className="h-full rounded-full bg-[#1B2A4A] transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between text-xs text-[#8B8D98]">
              <span>Week progress</span>
              <span>{pct}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Insight cards */}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-[#E8A33D]/40 bg-[#FFF8EC] p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#1B2A4A]/80">
            Insight · #1
          </p>
          <p className="mt-2 text-lg font-bold text-[#1B2A4A]">
            Start with DSA. You lose steam on reading tasks after lunch.
          </p>
          <p className="mt-2 text-sm text-[#8B8D98]">
            Move HCI reading to the morning slot on Friday.
          </p>
        </div>
        <div className="rounded-3xl border border-[#4C63D2]/30 bg-[#EEF1FB] p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#4C63D2]">
            Insight · #2
          </p>
          <p className="mt-2 text-lg font-bold text-[#1B2A4A]">
            Creative Mode helped on the last HCI task — try it for design sketches again.
          </p>
          <p className="mt-2 text-sm text-[#8B8D98]">
            2 out of 3 loose sessions ended in shipped work.
          </p>
        </div>
      </div>

      {/* Ask Rally */}
      <div className="mt-6 rounded-2xl border border-[#EDEAE2] bg-white p-5">
        <p className="text-sm font-semibold text-[#1B2A4A]">Ask Rally</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            answer(question);
          }}
          className="mt-3 flex gap-2"
        >
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-1 rounded-full border border-[#EDEAE2] bg-[#FBF9F5] px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#4C63D2]"
            placeholder="Am I on track for this week?"
          />
          <button
            type="submit"
            className="rounded-full bg-[#1B2A4A] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#22335c] transition"
          >
            Ask
          </button>
        </form>

        {thread.length > 0 && (
          <div className="mt-4 space-y-3">
            {thread.map((m, i) => (
              <div key={i} className="rounded-2xl bg-[#F5F3EC] p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#8B8D98]">
                  You
                </p>
                <p className="text-sm text-[#1B2A4A]">{m.q}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[#4C63D2]">
                  Rally AI
                </p>
                <p className="text-sm text-[#1B2A4A]">{m.a}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="h-24 lg:hidden" />
    </AppShell>
  );
}