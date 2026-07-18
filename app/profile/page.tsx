"use client";

import { useState } from "react";
import { AppShell } from "@/app/components/AppShell";
import { Bell, LogOut, School, Wand2 } from "lucide-react";
import { signOut } from "next-auth/react";

function Row({
  icon: Icon,
  label,
  meta,
}: {
  icon: typeof School;
  label: string;
  meta: string;
}) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4 text-[#8B8D98]" />
        <span className="text-sm font-medium text-[#1B2A4A]">{label}</span>
      </div>
      <span className="text-xs text-[#8B8D98]">{meta}</span>
    </div>
  );
}

function Toggle({
  icon: Icon,
  label,
  value,
  onChange,
}: {
  icon: typeof School;
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4 text-[#8B8D98]" />
        <span className="text-sm font-medium text-[#1B2A4A]">{label}</span>
      </div>
      <button
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className={
  "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform " +
  (value ? "translate-x-5" : "translate-x-0.5")
}
      >
        <span
          className={
            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform " +
            (value ? "translate-x-5" : "translate-x-0.5")
          }
        />
      </button>
    </div>
  );
}

export default function Profile() {
  const [notif, setNotif] = useState(true);
  const [creative, setCreative] = useState(false);

  // These will be pulled from DB later
  const done = 2;
  const streak = 5;

  return (
    <AppShell>
      <h1 className="text-4xl font-bold text-[#1B2A4A]">Profile</h1>

      {/* User card */}
      <div className="mt-6 flex items-center gap-4 rounded-3xl border border-[#EDEAE2] bg-white p-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1B2A4A] text-xl font-bold text-white">
          NK
        </div>
        <div>
          <p className="text-2xl font-bold text-[#1B2A4A]">Nazish Khalid</p>
          <p className="text-sm text-[#8B8D98]">Computer Science · 6th Semester</p>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {[
          { k: "Focus streak", v: `${streak} days` },
          { k: "Tasks done", v: String(done) },
          { k: "On-time rate", v: "83%" },
        ].map((s) => (
          <div key={s.k} className="rounded-2xl border border-[#EDEAE2] bg-white p-5">
            <p className="text-xs uppercase tracking-wide text-[#8B8D98]">{s.k}</p>
            <p className="mt-1 text-2xl font-bold text-[#1B2A4A]">{s.v}</p>
          </div>
        ))}
      </div>

      {/* Settings */}
      <div className="mt-6 divide-y divide-[#EDEAE2] overflow-hidden rounded-3xl border border-[#EDEAE2] bg-white">
        <Row icon={School} label="Google Classroom" meta="Synced · 4 classes" />
        <Toggle icon={Bell} label="Notifications" value={notif} onChange={setNotif} />
        <Toggle icon={Wand2} label="Creative Mode default" value={creative} onChange={setCreative} />
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex w-full items-center justify-between p-4 text-left hover:bg-[#F5F3EC] transition"
        >
          <div className="flex items-center gap-3">
            <LogOut className="h-4 w-4 text-[#8B8D98]" />
            <span className="text-sm font-medium text-[#1B2A4A]">Log out</span>
          </div>
          <span className="text-xs text-[#8B8D98]">See you soon</span>
        </button>
      </div>

      <div className="h-24 lg:hidden" />
    </AppShell>
  );
}