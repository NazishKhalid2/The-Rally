import { AppShell } from "@/app/components/AppShell";
import { prisma } from "@/lib/prisma";
import { Check } from "lucide-react";
import Link from "next/link";

const DAYS = [
  { label: "Mon", offset: 0 },
  { label: "Tue", offset: 1 },
  { label: "Wed", offset: 2 },
  { label: "Thu", offset: 3 },
  { label: "Fri", offset: 4 },
  { label: "Sat", offset: 5 },
  { label: "Sun", offset: 6 },
];

function getWeekStart() {
  const now = new Date();
  const day = now.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setDate(now.getDate() + diff);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

export default async function Week() {
  const tasks = await prisma.task.findMany({
    orderBy: { dueDate: "asc" },
  });

  const weekStart = getWeekStart();
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  const weekLabel = `Week of ${weekStart.toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
  })} – ${weekEnd.toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
  })}`;

  const days = DAYS.map(({ label, offset }) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + offset);
    const dateNum = date.getDate();

    const dayTasks = tasks.filter((t) => {
      if (!t.dueDate) return false;
      const d = new Date(t.dueDate);
      return (
        d.getFullYear() === date.getFullYear() &&
        d.getMonth() === date.getMonth() &&
        d.getDate() === date.getDate()
      );
    });

    return { label, dateNum, tasks: dayTasks };
  });

  return (
    <AppShell>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-[#8B8D98]">{weekLabel}</p>
          <h1 className="mt-1 text-4xl font-bold text-[#1B2A4A]">Weekly overview</h1>
        </div>
        <Link
          href="/add"
          className="inline-flex items-center gap-2 rounded-full border border-[#EDEAE2] bg-white px-4 py-2 text-sm font-semibold text-[#1B2A4A] hover:bg-[#F5F3EC] transition"
        >
          + Add task
        </Link>
      </div>

      {/* 7-day grid */}
      <div className="mt-8 grid gap-3 lg:grid-cols-7">
        {days.map((d) => (
          <div
            key={d.label}
            className="rounded-2xl border border-[#EDEAE2] bg-white p-4"
          >
            <div className="flex items-baseline justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#8B8D98]">
                {d.label}
              </p>
              <p className="text-lg font-bold text-[#1B2A4A]">{d.dateNum}</p>
            </div>
            <div className="mt-3 flex flex-col gap-2">
              {d.tasks.length === 0 ? (
                <p className="text-xs text-[#B3B0A6]">Free</p>
              ) : (
                d.tasks.map((t) => (
                  <Link
                    key={t.id}
                    href={`/task/${t.id}`}
                    className="rounded-lg bg-[#FFF8EC] px-2 py-1.5 text-xs font-medium text-[#1B2A4A] hover:bg-[#FFF3DC] transition"
                  >
                    {t.title}
                  </Link>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {/* All tasks list */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-[#1B2A4A]">All tasks</h2>
        <div className="mt-3 divide-y divide-[#EDEAE2] overflow-hidden rounded-2xl border border-[#EDEAE2] bg-white">
          {tasks.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between gap-4 p-4"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div
                  className={
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border " +
                    (t.status === "done"
                      ? "border-green-500 bg-green-500 text-white"
                      : "border-[#EDEAE2] bg-white")
                  }
                >
                  {t.status === "done" && (
                    <Check className="h-3 w-3" strokeWidth={3} />
                  )}
                </div>
                <Link href={`/task/${t.id}`} className="min-w-0">
                  <p className="text-xs uppercase tracking-wide text-[#8B8D98]">
                    {t.subject ?? "General"}
                  </p>
                  <p
                    className={
                      "font-medium text-[#1B2A4A] " +
                      (t.status === "done" ? "line-through opacity-60" : "")
                    }
                  >
                    {t.title}
                  </p>
                </Link>
              </div>
              <span className="shrink-0 text-sm text-[#8B8D98]">
                {t.dueDate
                  ? new Date(t.dueDate).toLocaleDateString(undefined, {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })
                  : "No due date"}
              </span>
            </div>
          ))}
          {tasks.length === 0 && (
            <p className="p-4 text-sm text-[#8B8D98]">No tasks yet.</p>
          )}
        </div>
      </section>

      <div className="h-24 lg:hidden" />
    </AppShell>
  );
}