"use client";

import { useState } from "react";
import NiboMascot from "./NiboMascot";

export default function LandingScreen() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-display text-lg font-bold">
            R
          </span>
          <span className="font-display text-xl font-semibold">The Rally</span>
        </div>
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          <a href="#features" className="hover:text-foreground">Features</a>
          <a href="#focus" className="hover:text-foreground">Focus</a>
          <a href="#together" className="hover:text-foreground">Together</a>
          <button onClick={() => setShowModal(true)} className="text-foreground">
            Sign in
          </button>
        </nav>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-16 pt-8 lg:grid-cols-[1.1fr_1fr] lg:pt-16">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-success" /> Now syncing with Google Classroom
          </span>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Your week,
            <br />
            <span className="italic text-primary">rallied.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            The Rally is a smart study planner that pulls in your classwork,
            plans your week, and cheers you on through every focus session.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5"
            >
              <GoogleG /> Connect Google Classroom
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="rounded-full border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground hover:bg-secondary"
            >
              Take a tour
            </button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">No credit card. No spam. Just study.</p>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[36px] bg-creative-soft/60 blur-2xl" aria-hidden />
          <div className="relative overflow-hidden rounded-[32px] border border-border bg-card p-8 shadow-sm">
            <div className="flex justify-center gap-3">
              <NiboMascot color="navy" size={140} />
              <NiboMascot color="purple" size={140} />
            </div>
            <div className="mt-4 rounded-2xl bg-focus-bg p-5 text-focus-fg">
              <p className="text-xs uppercase tracking-widest text-focus-fg/60">Focus session</p>
              <p className="mt-2 font-display text-4xl font-semibold tabular-nums">00:24:12</p>
              <p className="mt-1 text-sm text-focus-fg/70">DSA Assignment 3 · Deep work</p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { t: "Smart weekly plan", d: "Rally lays out your assignments across the week so nothing sneaks up on Sunday night." },
            { t: "Focus that ships", d: "Timed sessions with Creative Mode when you need loose thinking, Deep Mode when you don't." },
            { t: "Rally AI insights", d: "Ask 'am I on track?' and get an honest answer, not a vibe check." },
          ].map((f) => (
            <div key={f.t} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-display text-xl font-semibold">{f.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} The Rally</p>
          <p>Made for students who actually finish things.</p>
        </div>
      </footer>

      {showModal && (
        <div
          className="fixed inset-0 z-20 flex items-center justify-center bg-primary/40 backdrop-blur-sm px-6"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-card rounded-2xl w-full max-w-sm p-6 shadow-xl">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center mb-4">
              <GoogleG />
            </div>
            <h2 className="text-lg font-bold mb-2 font-display">Connect Google Classroom</h2>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              The Rally reads your course deadlines to build your week. It
              can&apos;t post, edit, or grade anything on your behalf.
            </p>
              
              <a
              href="/api/auth/signin/google"
              className="block w-full bg-primary text-primary-foreground py-3 rounded-xl text-center font-medium text-sm mb-2 hover:opacity-90 transition"
            >
              Continue to Google
            </a>
            <button
              onClick={() => setShowModal(false)}
              className="w-full text-muted-foreground text-sm py-2 hover:text-foreground transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function GoogleG() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.5-1.7 4.4-5.5 4.4-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3.9 14.6 3 12 3 6.9 3 2.8 7.1 2.8 12.2S6.9 21.4 12 21.4c6.9 0 9.5-4.8 9.5-9.3 0-.6-.1-1.1-.2-1.9H12z" />
    </svg>
  );
}