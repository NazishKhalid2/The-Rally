import Link from "next/link";
import { AppShell } from "./AppShell";
import { Calendar, Plus, Sparkles } from "lucide-react";

type ActionStep = {
  id: string;
  content: string;
  estimateMin: number | null;
  isAiSuggested: boolean;
};

type Task = {
  id: string;
  title: string;
  subject: string | null;
  dueDate: Date | null;
  status: string;
  priority: string;
  actionSteps: ActionStep[];
};

function formatDueBadge(dueDate: Date | null) {
  if (!dueDate) return { label: "No due date", urgent: false };
  const now = new Date();
  const diffDays = Math.ceil(
    (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );
  const label =
    diffDays <= 6
      ? `Due ${dueDate.toLocaleDateString(undefined, { weekday: "short" })}`
      : `Due ${dueDate.toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
        })}`;
  return { label, urgent: diffDays <= 2 };
}

function TaskCard({ task }: { task: Task }) {
  const due = formatDueBadge(task.dueDate);
  const aiStep = task.actionSteps.find((s) => s.isAiSuggested);

  return (
    <Link
      href={`/task/${task.id}`}
      className="block rounded-2xl border border-[#EDEAE2] bg-white p-5 transition-shadow hover:shadow-sm"
    >
      <div className="flex items-start justify-between gap-2 mb-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#8B8D98]">
          {task.subject ?? "General"}
        </p>
        {task.priority === "high" && (
          <span className="rounded-full bg-[#FFF3DC] px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-[#1B2A4A]">
            Due next
          </span>
        )}
      </div>
      <h3 className="font-semibold text-[#1B2A4A] text-base mb-2">{task.title}</h3>
      {aiStep && (
        <p className="text-xs text-[#4C63D2] mb-3">
          ✦ {aiStep.content}
          {aiStep.estimateMin ? ` — ${aiStep.estimateMin} min` : ""}
        </p>
      )}
      <div className="flex items-center justify-between mt-2">
        <span
          className={`text-xs font-medium ${
            due.urgent ? "text-[#E8A33D]" : "text-[#B3B0A6]"
          }`}
        >
          {due.label}
        </span>
        <span className="text-xs font-semibold text-[#4C63D2]">Start →</span>
      </div>
    </Link>
  );
}

export default function HomeView({
  tasks,
  streakCount,
}: {
  tasks: Task[];
  streakCount: number;
}) {
  const active = tasks.filter((t) => t.status !== "done");
  const done = tasks.filter((t) => t.status === "done");

  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <AppShell>
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <p className="text-sm text-[#8B8D98]">{today}</p>
          <h1 className="mt-1 text-4xl font-bold text-[#1B2A4A]">This week</h1>
        </div>
        <Link
          href="/add"
          className="inline-flex items-center gap-2 rounded-full bg-[#1B2A4A] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#22335c] transition"
        >
          <Plus className="h-4 w-4" /> Add task
        </Link>
      </div>

      {/* AI tip card */}
      <Link
        href="/ai"
        className="flex items-start gap-4 rounded-2xl border border-[#E8A33D]/40 bg-[#FFF8EC] p-5 transition-shadow hover:shadow-sm mb-6"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8A33D]/80 text-[#1B2A4A]">
          <Sparkles className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#1B2A4A]/80">
            Rally AI · Tip for today
          </p>
          <p className="mt-1 font-semibold text-[#1B2A4A] text-lg">
            You&apos;re prioritizing right. Start with your highest-priority task first.
          </p>
          <p className="mt-1 text-sm text-[#8B8D98]">Tap to see the full breakdown →</p>
        </div>
      </Link>

      {/* Recovery card */}
      {tasks.some((t) => {
        if (!t.dueDate) return false;
        return new Date(t.dueDate) < new Date() && t.status !== "done";
      }) && (
        <section className="mb-6 rounded-2xl border border-[#EDEAE2] bg-white p-5">
          <div className="flex items-start gap-4">
            <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-[#8B8D98]" />
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-[#1B2A4A]">
                Looks like yesterday got busy
              </p>
              <p className="text-sm text-[#8B8D98]">
                Want to shift things around?
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <button className="inline-flex items-center justify-center rounded-full bg-[#1B2A4A] px-4 py-2 text-sm font-semibold text-white hover:bg-[#22335c] transition">
                  Spread it out
                </button>
                <button className="text-sm font-medium text-[#8B8D98] hover:text-[#1B2A4A] transition">
                  Leave it for now
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Active tasks */}
      <section className="mb-8">
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-xl font-bold text-[#1B2A4A]">Up next</h2>
          <p className="text-xs text-[#8B8D98]">
            {active.length} open · {done.length} done
            {streakCount > 0 && ` · 🔥 ${streakCount} day streak`}
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {active.map((t) => (
            <TaskCard key={t.id} task={t} />
          ))}
          {active.length === 0 && (
            <p className="text-sm text-[#8B8D98]">
              Inbox zero for the week. Nibo is doing a little dance.
            </p>
          )}
        </div>
      </section>

      {/* Done tasks */}
      {done.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#1B2A4A] mb-3">Done this week</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {done.map((t) => (
              <TaskCard key={t.id} task={t} />
            ))}
          </div>
        </section>
      )}

      {/* Synced classes */}
      <section>
        <h2 className="text-xl font-bold text-[#1B2A4A] mb-3">Synced classes</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {["DSA · CS 202", "Systems · CS 231", "HCI · DES 340", "Software Eng · CS 350"].map((c) => (
            <div key={c} className="rounded-2xl border border-[#EDEAE2] bg-white p-4 text-sm">
              <p className="text-xs text-[#8B8D98]">Google Classroom</p>
              <p className="mt-1 font-medium text-[#1B2A4A]">{c}</p>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}