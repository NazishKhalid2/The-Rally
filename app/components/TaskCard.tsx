import Link from "next/link";
import { Check, Clock } from "lucide-react";

export interface TaskCardData {
  id: string;
  title: string;
  subject: string | null;
  dueDate: Date | null;
  priority: string;
  status: string;
  actionSteps: {
    id: string;
    content: string;
    estimateMin: number | null;
    isAiSuggested: boolean;
  }[];
}

const priorityStyles: Record<string, string> = {
  high: "border-l-[#E8A33D] bg-[#FFF8EC]/40",
  normal: "border-l-[#4C63D2]/40 bg-white",
  low: "border-l-[#EDEAE2] bg-white",
};

const priorityLabel: Record<string, string> = {
  high: "Due next",
  normal: "This week",
  low: "Later",
};

function formatDue(dueDate: Date | null) {
  if (!dueDate) return "No due date";
  return new Date(dueDate).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function TaskCard({ task }: { task: TaskCardData }) {
  const done = task.status === "done";
  const p = task.priority ?? "normal";
  const aiStep = task.actionSteps?.find((s) => s.isAiSuggested);

  return (
    <Link
      href={`/task/${task.id}`}
      className={
        "group relative block rounded-2xl border border-[#EDEAE2] border-l-4 p-5 transition-all hover:shadow-sm " +
        (priorityStyles[p] ?? priorityStyles.normal) +
        (done ? " opacity-60" : "")
      }
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <div
            className={
              "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors " +
              (done
                ? "border-green-500 bg-green-500 text-white"
                : "border-[#EDEAE2] bg-white")
            }
          >
            {done && <Check className="h-3 w-3" strokeWidth={3} />}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-[#8B8D98]">
              {task.subject ?? "General"}
            </p>
            <h3
              className={
                "mt-1 text-lg font-semibold leading-tight text-[#1B2A4A] " +
                (done ? "line-through" : "")
              }
            >
              {task.title}
            </h3>
            {aiStep && (
              <p className="mt-1 text-xs text-[#4C63D2]">
                ✦ {aiStep.content}
              </p>
            )}
            <div className="mt-2 flex items-center gap-3 text-xs text-[#8B8D98]">
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {task.actionSteps?.reduce(
                  (sum, s) => sum + (s.estimateMin ?? 0),
                  0
                ) || 30}{" "}
                min
              </span>
              <span>·</span>
              <span>{formatDue(task.dueDate)}</span>
            </div>
          </div>
        </div>
        <span
          className={
            "shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide " +
            (done
              ? "bg-green-100 text-green-700"
              : p === "high"
              ? "bg-[#FFF3DC] text-[#1B2A4A]"
              : p === "normal"
              ? "bg-[#EEF1FB] text-[#4C63D2]"
              : "bg-[#F5F3EC] text-[#8B8D98]")
          }
        >
          {done ? "Done" : (priorityLabel[p] ?? "This week")}
        </span>
      </div>
    </Link>
  );
}