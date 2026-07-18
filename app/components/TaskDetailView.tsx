import Link from "next/link";
import { CheckCircle2, Clock, Users, Wand2 } from "lucide-react";
import { AppShell } from "./AppShell";

type ActionStep = {
  id: string;
  content: string;
  estimateMin: number | null;
  completed: boolean;
};

type Task = {
  id: string;
  title: string;
  subject: string | null;
  description: string | null;
  dueDate: Date | null;
  priority: string;
  actionSteps: ActionStep[];
};

function formatDue(dueDate: Date | null) {
  if (!dueDate) return "No due date";
  return dueDate.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function TaskDetailView({ task }: { task: Task }) {
  const totalMinutes =
    task.actionSteps.reduce((sum, s) => sum + (s.estimateMin ?? 0), 0) || 30;

  return (
    <AppShell>
      <Link href="/home" className="text-sm text-muted-foreground hover:text-foreground">
        ← Task detail
      </Link>

      <div className="mt-4 rounded-3xl border border-border bg-card p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {task.subject ?? "General"}
            </p>
            <h1 className="mt-1 font-display text-4xl font-semibold">{task.title}</h1>
            <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> {totalMinutes} min
              </span>
              <span>· {formatDue(task.dueDate)}</span>
            </div>
          </div>
          {task.priority === "high" && (
            <span className="rounded-full bg-amber-strong px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              Due next
            </span>
          )}
        </div>

        {task.description && (
          <p className="mt-6 text-base leading-relaxed text-foreground/90">
            {task.description}
          </p>
        )}

        {task.actionSteps.length > 0 && (
          <div className="mt-8">
            <h2 className="font-display text-lg font-semibold">Where to start</h2>
            <ol className="mt-3 space-y-2">
              {task.actionSteps.map((s, i) => (
                <li
                  key={s.id}
                  className="flex items-start gap-3 rounded-xl bg-secondary/60 p-3"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    {i + 1}
                  </span>
                  <span className="text-sm">{s.content}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <div className="flex items-start gap-3 rounded-2xl border border-border bg-cream p-4">
            <Users className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <p className="font-semibold">Study with a friend</p>
              <p className="text-xs text-muted-foreground">Share this task with a friend</p>
            </div>
          </div>
          <Link
            href={`/focus?taskId=${task.id}&mode=creative`}
            className="flex items-start gap-3 rounded-2xl border border-creative/30 bg-creative-soft p-4 transition-shadow hover:shadow-sm"
          >
            <Wand2 className="mt-0.5 h-5 w-5 text-creative" />
            <div>
              <p className="font-semibold text-creative">Creative Mode</p>
              <p className="text-xs text-muted-foreground">Loose thinking, no timer pressure</p>
            </div>
          </Link>

        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`/focus?taskId=${task.id}`}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            Begin session
          </Link>
          <Link
            href={`/together?taskId=${task.id}`}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold"
          >
            <Users className="h-4 w-4" /> Study together
          </Link>
          <button className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-muted-foreground">
            <CheckCircle2 className="h-4 w-4" /> Mark done
          </button>
        </div>
      </div>
      <div className="h-24 lg:hidden" />
    </AppShell>
  );
}