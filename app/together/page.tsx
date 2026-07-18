"use client";

import { useState, useEffect } from "react";
import { AppShell } from "@/app/components/AppShell";
import { Copy, CheckCircle2 } from "lucide-react";
import NiboMascot from "@/app/components/NiboMascot";

export default function Together() {
  const [copied, setCopied] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [running] = useState(true);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Join my study session on The Rally! ${window.location.href}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <AppShell>
      <p className="text-sm text-[#8B8D98]">Study together</p>
      <h1 className="mt-1 text-4xl font-bold text-[#1B2A4A]">Studying together</h1>

      {/* Timer card */}
      <div className="mt-6 rounded-3xl border border-[#EDEAE2] bg-white p-8 text-center">
        <div className="flex justify-center gap-3">
          <NiboMascot color="navy" size={90} />
          <NiboMascot color="purple" size={90} />
        </div>
        <p className="mt-6 text-5xl font-bold tabular-nums text-[#1B2A4A]">
          {mm}:{ss}
        </p>
        <p className="mt-2 text-sm text-[#8B8D98]">
          Deep work · with a friend
        </p>
      </div>

      {/* Share card */}
      <div className="mt-6 rounded-3xl border border-[#EDEAE2] bg-white p-6">
        <p className="font-semibold text-[#1B2A4A]">Share your session</p>
        <p className="mt-1 text-sm text-[#8B8D98]">
          Anyone with the link can join this focus session.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            onClick={handleWhatsApp}
            className="inline-flex items-center gap-2 rounded-full bg-green-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-600 transition"
          >
            Send on WhatsApp
          </button>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 rounded-full border border-[#EDEAE2] bg-white px-5 py-2.5 text-sm font-semibold text-[#1B2A4A] hover:bg-[#F5F3EC] transition"
          >
            {copied ? (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            {copied ? "Link copied" : "Copy link"}
          </button>
        </div>
      </div>

      {/* Celebration card */}
      <div className="mt-6 rounded-3xl border border-[#EDEAE2] bg-[#FFF8EC] p-6">
        <p className="text-xl font-bold text-[#1B2A4A]">You did it together!</p>
        <p className="mt-2 text-sm text-[#8B8D98]">
          You and your friends shipped 45 minutes with zero drop-offs. That&apos;s a rally.
        </p>
      </div>

      <div className="h-24 lg:hidden" />
    </AppShell>
  );
}