"use client";

import { useEffect, useState } from "react";
import NiboMascot from "./NiboMascot";

type Celebration = {
  taskTitle: string;
  message: string;
} | null;

export function CelebrationOverlay() {
  const [celebration, setCelebration] = useState<Celebration>(null);

  // Expose a global trigger so any component can fire it
  useEffect(() => {
    (window as any).__rallycelelebrate = (data: Celebration) => {
      setCelebration(data);
    };
  }, []);

  useEffect(() => {
    if (!celebration) return;
    const t = setTimeout(() => setCelebration(null), 3200);
    return () => clearTimeout(t);
  }, [celebration]);

  if (!celebration) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#1B2A4A]/40 px-4"
      onClick={() => setCelebration(null)}
      role="dialog"
      aria-live="polite"
    >
      <div
        className="w-full max-w-sm rounded-3xl border border-[#EDEAE2] bg-white p-8 text-center shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center">
          <NiboMascot color="purple" size={140} />
        </div>
        <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-[#4C63D2]">
          Nibo is proud
        </p>
        <h2 className="mt-2 text-2xl font-bold text-[#1B2A4A]">
          {celebration.taskTitle} — done!
        </h2>
        <p className="mt-2 text-sm text-[#8B8D98]">{celebration.message}</p>
        <button
          onClick={() => setCelebration(null)}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-[#1B2A4A] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#22335c] transition"
        >
          Keep going
        </button>
      </div>
    </div>
  );
}

// Helper to trigger celebration from anywhere
export function triggerCelebration(taskTitle: string, message: string) {
  (window as any).__rallycelelebrate?.({ taskTitle, message });
}