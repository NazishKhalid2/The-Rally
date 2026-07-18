"use client";

import { useState } from "react";
import NiboMascot from "./NiboMascot";

export default function ConnectScreen() {
  const [showModal, setShowModal] = useState(false);

  return (
    <main className="min-h-screen bg-[#FBF9F5]">
      {/* Header */}
      <header className="flex items-center justify-between max-w-6xl mx-auto px-6 md:px-10 py-6">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-[#1B2A4A] text-white text-sm font-bold flex items-center justify-center">
            R
          </span>
          <span
            className="text-lg font-semibold"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            The Rally
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm text-[#5B6B8C]">
          <a href="#" className="hover:text-[#1B2A4A] transition">
            Features
          </a>
          <a href="#" className="hover:text-[#1B2A4A] transition">
            Focus
          </a>
          <a href="#" className="hover:text-[#1B2A4A] transition">
            Together
          </a>
          <button
            onClick={() => setShowModal(true)}
            className="font-medium text-[#1B2A4A] hover:opacity-70 transition"
          >
            Sign in
          </button>
        </nav>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pt-10 pb-24 grid md:grid-cols-2 gap-16 items-center">
        {/* Left column */}
        <div>
          <span className="inline-flex items-center gap-2 bg-white border border-[#EDEAE2] rounded-full px-3 py-1.5 text-xs text-[#5B6B8C] shadow-sm mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Now syncing with Google Classroom
          </span>

          <h1
            className="text-5xl leading-tight font-semibold text-[#1B2A4A] mb-5"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Your week,
            <br />
            <span className="italic">rallied.</span>
          </h1>

          <p className="text-[#5B6B8C] max-w-sm leading-relaxed mb-8">
            The Rally is a smart study planner that pulls in your classwork,
            plans your week, and cheers you on through every focus session.
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-3">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-[#1B2A4A] text-white px-6 py-3 rounded-full font-medium text-sm hover:bg-[#22335c] transition shadow-md"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.07 5.07 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.85A11 11 0 0 0 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.05H2.18a11 11 0 0 0 0 9.9z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 0 0-9.82 6.05l3.66 2.85C6.71 7.3 9.14 5.38 12 5.38z"
                />
              </svg>
              Connect Google Classroom
            </button>
              <a href="#" className="bg-white border border-[#EDEAE2] text-[#1B2A4A] px-6 py-3 rounded-full font-medium text-sm hover:bg-[#F5F3EC] transition"
            >
              Take a tour
            </a>
          </div>

          <p className="text-xs text-[#B3B0A6]">
            No credit card. No spam. Just study.
          </p>
        </div>

        {/* Right column — illustrated card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center gap-6 max-w-sm mx-auto w-full">
          <div className="flex justify-center gap-3">
            <NiboMascot color="navy" size={110} />
            <NiboMascot color="purple" size={110} />
          </div>

          <div className="w-full bg-[#1B2A4A] rounded-2xl p-5">
            <p className="text-[10px] uppercase tracking-wide text-[#8EA1F2] mb-1">
              Focus session
            </p>
            <p className="text-3xl font-bold text-white tabular-nums">
              00:24:12
            </p>
            <p className="text-xs text-[#B7C0DE] mt-1">
              DSA Assignment 3 · Deep work
            </p>
          </div>
        </div>
      </section>
      {/* Features section */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pb-24">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#EDEAE2] rounded-2xl p-6">
            <h3 className="font-semibold text-[#1B2A4A] mb-2">Smart weekly plan</h3>
            <p className="text-sm text-[#5B6B8C] leading-relaxed">
              Rally lays out your assignments across the week so nothing sneaks up on Sunday night.
            </p>
          </div>
          <div className="bg-white border border-[#EDEAE2] rounded-2xl p-6">
            <h3 className="font-semibold text-[#1B2A4A] mb-2">Focus that ships</h3>
            <p className="text-sm text-[#4C63D2] leading-relaxed">
              Timed sessions with Creative Mode when you need loose thinking. Deep Mode when you don&apos;t.
            </p>
          </div>
          <div className="bg-white border border-[#EDEAE2] rounded-2xl p-6">
            <h3 className="font-semibold text-[#1B2A4A] mb-2">Rally AI insights</h3>
            <p className="text-sm text-[#5B6B8C] leading-relaxed">
              Ask &apos;am I on track?&apos; and get an honest answer, not a vibe check.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#EDEAE2] px-6 md:px-10 py-6 max-w-6xl mx-auto flex items-center justify-between text-xs text-[#B3B0A6]">
        <span>© 2026 The Rally</span>
        <span>Made for students who actually finish things.</span>
      </footer>
      {/* Connect modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-20 flex items-center justify-center bg-[#1B2A4A]/40 backdrop-blur-sm px-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="connect-modal-title"
        >
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl">
            <div className="w-10 h-10 rounded-full bg-[#EEF1FB] flex items-center justify-center mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.07 5.07 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.85A11 11 0 0 0 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.05H2.18a11 11 0 0 0 0 9.9z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 0 0-9.82 6.05l3.66 2.85C6.71 7.3 9.14 5.38 12 5.38z"
                />
              </svg>
            </div>

            <h2
              id="connect-modal-title"
              className="text-lg font-bold mb-2"
            >
              Connect Google Classroom
            </h2>
            <p className="text-sm text-[#5B5D68] mb-6 leading-relaxed">
              The Rally reads your course deadlines to build your week. It
              can&apos;t post, edit, or grade anything on your behalf.
            </p>
              <a href="/api/auth/signin/google" className="block w-full bg-[#1B2A4A] text-white py-3 rounded-xl text-center font-medium text-sm mb-2 hover:bg-[#22335c] transition"
            >
              Continue to Google
            </a>
            <button
              onClick={() => setShowModal(false)}
              className="w-full text-[#8B8D98] text-sm py-2 hover:text-[#1B2A4A] transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </main>
  );
}