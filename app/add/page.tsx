"use client";

import { useState } from "react";
import { AppShell } from "@/app/components/AppShell";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewTask() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [minutes, setMinutes] = useState(45);
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<"high" | "normal" | "low">("normal");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          subject: subject.trim() || null,
          dueDate: dueDate || null,
          priority,
        }),
      });

      if (!res.ok) throw new Error("Failed to add task");
      const task = await res.json();
      router.push(`/task/${task.id}`);
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <Link href="/home" className="text-sm text-[#8B8D98] hover:text-[#1B2A4A] transition">
        ← Back
      </Link>
      <h1 className="mt-4 text-4xl font-bold text-[#1B2A4A]">Add a task</h1>
      <p className="mt-2 text-sm text-[#8B8D98]">
        Rally will slot it into the week for you.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-4 rounded-3xl border border-[#EDEAE2] bg-white p-6"
      >
        {/* Title */}
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wide text-[#8B8D98]">
            Title
          </span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="e.g. Finish HCI wireframes"
            className="mt-1 w-full rounded-xl border border-[#EDEAE2] bg-[#FBF9F5] px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#4C63D2]"
          />
        </label>

        {/* Subject / Course */}
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wide text-[#8B8D98]">
            Course
          </span>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. HCI · DES 340"
            className="mt-1 w-full rounded-xl border border-[#EDEAE2] bg-[#FBF9F5] px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#4C63D2]"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Estimate */}
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#8B8D98]">
              Estimate (min)
            </span>
            <input
              type="number"
              min={5}
              step={5}
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
              className="mt-1 w-full rounded-xl border border-[#EDEAE2] bg-[#FBF9F5] px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#4C63D2]"
            />
          </label>

          {/* Due date */}
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#8B8D98]">
              Due date
            </span>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#EDEAE2] bg-[#FBF9F5] px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#4C63D2]"
            />
          </label>
        </div>

        {/* Priority */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-[#8B8D98]">
            Priority
          </span>
          <div className="mt-2 flex flex-wrap gap-2">
            {(["high", "normal", "low"] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPriority(p)}
                className={
                  "rounded-full px-4 py-2 text-xs font-semibold capitalize transition-colors " +
                  (priority === p
                    ? "bg-[#1B2A4A] text-white"
                    : "border border-[#EDEAE2] bg-white text-[#8B8D98] hover:text-[#1B2A4A]")
                }
              >
                {p === "high" ? "Due next" : p === "normal" ? "This week" : "Later"}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full bg-[#1B2A4A] px-6 py-3 text-sm font-semibold text-white hover:bg-[#22335c] transition disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add to week"}
          </button>
          <Link
            href="/home"
            className="inline-flex items-center gap-2 rounded-full border border-[#EDEAE2] bg-white px-6 py-3 text-sm font-semibold text-[#1B2A4A] hover:bg-[#F5F3EC] transition"
          >
            Cancel
          </Link>
        </div>
      </form>

      <div className="h-24 lg:hidden" />
    </AppShell>
  );
}