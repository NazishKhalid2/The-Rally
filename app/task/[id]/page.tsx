import { prisma } from "@/lib/prisma";
import { AppShell } from "@/app/components/AppShell";
import { CheckCircle2, Clock, Users, Wand2 } from "lucide-react";
import Link from "next/link";
import { markTaskDone } from "@/app/actions/tasks";
export default async function TaskDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const task = await prisma.task.findUnique({
    where: { id },
    include: { actionSteps: { orderBy: { order: "asc" } } },
  });

  if (!task) {
    return (
      <AppShell>
        <Link href="/home" className="text-sm text-[#8B8D98] hover:text-[#1B2A4A]">
          ← Back
        </Link>
        <p className="mt-6 text-[#8B8D98]">Task not found.</p>
      </AppShell>
    );
  }

  const done = task.status === "done";

  const totalMinutes =
    task.actionSteps.reduce((sum, s) => sum + (s.estimateMin ?? 0), 0) || 30;

  const formatDue = (d: Date | null) => {
    if (!d) return "No due date";
    return d.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <AppShell>
      <Link href="/home" className="text-sm text-[#8B8D98] hover:text-[#1B2A4A] transition">
        ← Task detail
      </Link>

      <div className="mt-4 rounded-3xl border border-[#EDEAE2] bg-white p-8">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#8B8D98]">
              {task.subject ?? "General"}
            </p>
            <h1 className="mt-1 text-4xl font-bold text-[#1B2A4A]">{task.title}</h1>
            <div className="mt-3 flex items-center gap-4 text-sm text-[#8B8D98]">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> {totalMinutes} min
              </span>
              <span>· {formatDue(task.dueDate)}</span>
            </div>
          </div>
          <span
            className={
              "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide " +
              (done
                ? "bg-green-100 text-green-700"
                : "bg-[#FFF3DC] text-[#1B2A4A]")
            }
          >
            {done ? "Completed" : "Due next"}
          </span>
        </div>

        {/* Description */}
        {task.description && (
          <p className="mt-6 text-base leading-relaxed text-[#1B2A4A]/90">
            {task.description}
          </p>
        )}

        {/* Action steps */}
        {task.actionSteps.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-bold text-[#1B2A4A]">Where to start</h2>
            <ol className="mt-3 space-y-2">
              {task.actionSteps.map((s, i) => (
                <li
                  key={s.id}
                  className="flex items-start gap-3 rounded-xl bg-[#F5F3EC] p-3"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1B2A4A] text-xs font-semibold text-white">
                    {i + 1}
                  </span>
                  <span className="text-sm text-[#1B2A4A]">{s.content}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Feature cards */}
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <div className="flex items-start gap-3 rounded-2xl border border-[#EDEAE2] bg-[#FBF9F5] p-4">
            <Users className="mt-0.5 h-5 w-5 text-[#1B2A4A]" />
            <div>
              <p className="font-semibold text-[#1B2A4A]">Study with a friend</p>
              <p className="text-xs text-[#8B8D98]">Share this task with a friend</p>
            </div>
          </div>
          <Link
            href={`/focus?taskId=${task.id}&mode=creative`}
            className="flex items-start gap-3 rounded-2xl border border-[#4C63D2]/30 bg-[#EEF1FB] p-4 transition-shadow hover:shadow-sm"
          >
            <Wand2 className="mt-0.5 h-5 w-5 text-[#4C63D2]" />
            <div>
              <p className="font-semibold text-[#4C63D2]">Creative Mode</p>
              <p className="text-xs text-[#8B8D98]">Loose thinking, no timer pressure</p>
            </div>
          </Link>
        </div>

        {/* Action buttons */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`/focus?taskId=${task.id}`}
            className="inline-flex items-center gap-2 rounded-full bg-[#1B2A4A] px-6 py-3 text-sm font-semibold text-white hover:bg-[#22335c] transition"
          >
            Begin session
          </Link>
          <Link
            href={`/together?taskId=${task.id}`}
            className="inline-flex items-center gap-2 rounded-full border border-[#EDEAE2] bg-white px-6 py-3 text-sm font-semibold text-[#1B2A4A] hover:bg-[#F5F3EC] transition"
          >
            <Users className="h-4 w-4" /> Study together
          </Link>
          <form action={markTaskDone.bind(null, task.id)}>
            <button
              type="submit"
              disabled={done}
              className={
                "inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition " +
                (done
                  ? "border-green-200 bg-green-50 text-green-700"
                  : "border-[#EDEAE2] bg-white text-[#1B2A4A] hover:bg-[#F5F3EC]")
              }
            >
              <CheckCircle2 className="h-4 w-4" />
              {done ? "Completed ✓" : "Mark done"}
            </button>
          </form>
        </div>
      </div>

      <div className="h-24 lg:hidden" />
    </AppShell>
  );
}