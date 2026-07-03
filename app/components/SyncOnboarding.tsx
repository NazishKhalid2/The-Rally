"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Task = {
  id: string;
  title: string;
  subject: string | null;
  dueDate: string | null;
};

type SyncResult = {
  coursesFound: number;
  tasksFound: number;
  tasks: Task[];
};

function formatDue(dueDate: string | null) {
  if (!dueDate) return "";
  const d = new Date(dueDate);
  return `Due ${d.toLocaleDateString(undefined, {
    weekday: "long",
  })}`;
}

export default function SyncOnboarding() {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [result, setResult] = useState<SyncResult | null>(null);
  const router = useRouter();

  const runSync = async () => {
    setStatus("loading");
    try {
      const res = await fetch("/api/classroom/sync", { method: "POST" });
      if (!res.ok) throw new Error("Sync failed");
      const data: SyncResult = await res.json();
      setResult(data);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => {
    runSync();
  }, []);

  if (status === "loading") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-[#FBF9F5] px-6">
        <div className="w-8 h-8 border-2 border-[#1B2A4A] border-t-transparent rounded-full animate-spin mb-6" />
        <p className="font-medium text-[#1B2A4A]">Pulling in your deadlines...</p>
        <p className="text-sm text-[#8B8D98] mt-1">This takes about 10 seconds.</p>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-[#FBF9F5] px-6">
        <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-5">
          <span className="text-red-500 text-2xl">×</span>
        </div>
        <h2 className="font-bold text-lg text-[#1B2A4A] mb-1">
          Couldn&apos;t connect to Google Classroom
        </h2>
        <p className="text-sm text-[#8B8D98] mb-6 text-center max-w-xs">
          Check your internet connection and try again.
        </p>
        <button
          onClick={runSync}
          className="w-full max-w-xs bg-[#1B2A4A] text-white py-3 rounded-xl font-medium text-sm mb-2"
        >
          Try again
        </button>
        <a
          href="/add"
          className="w-full max-w-xs border border-[#1B2A4A] text-[#1B2A4A] py-3 rounded-xl font-medium text-sm text-center"
        >
          Add deadlines manually
        </a>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#FBF9F5] px-6">
      <div className="w-full max-w-xs">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-5 h-5 rounded-full bg-green-500 text-white text-xs flex items-center justify-center">
            ✓
          </span>
          <h2 className="font-bold text-[#1B2A4A]">Sync complete</h2>
        </div>
        <p className="text-sm text-[#8B8D98] mb-5">
          Found {result?.tasksFound ?? 0} deadlines across{" "}
          {result?.coursesFound ?? 0} courses.
        </p>

        <div className="space-y-2 mb-6">
          {result?.tasks.slice(0, 4).map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-[#EDEAE2]"
            >
              <span className="text-sm font-medium text-[#1B2A4A]">
                {t.title}
              </span>
              <span className="text-xs text-[#B3B0A6]">
                {formatDue(t.dueDate)}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={() => router.refresh()}
          className="w-full bg-[#1B2A4A] text-white py-3 rounded-xl font-medium text-sm"
        >
          Show me my week
        </button>
      </div>
    </main>
  );
}
