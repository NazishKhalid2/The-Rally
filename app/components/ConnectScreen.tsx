"use client";

import { useState } from "react";

export default function ConnectScreen() {
  const [showModal, setShowModal] = useState(false);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full opacity-40 blur-3xl animate-pulse"
        style={{
          background:
            "radial-gradient(circle, #4C63D2 0%, #8EA1F2 45%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center w-full max-w-xs">
        <div className="text-center mb-14">
          <h1
            className="text-4xl font-extrabold tracking-tight"
            style={{ fontFamily: "var(--font-baloo)" }}
          >
            The Rally
          </h1>
          <p className="text-[#8B8D98] mt-2 text-sm">Your week, handled.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="w-full bg-[#1B2A4A] text-white py-3.5 rounded-2xl text-center font-medium text-sm shadow-[0_8px_24px_-8px_rgba(27,42,74,0.5)] transition hover:bg-[#22335c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4C63D2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF9F5]"
        >
          Connect Google Classroom
        </button>

        <div className="flex items-center w-full my-5">
          <div className="flex-1 h-px bg-[#E4E1D8]" />
          <span className="px-3 text-xs text-[#B3B0A6]">or</span>
          <div className="flex-1 h-px bg-[#E4E1D8]" />
        </div>

        <a
          href="/add"
          className="text-[#5B5D68] text-sm underline decoration-[#D6D3C8] underline-offset-4 hover:text-[#1B2A4A] transition"
        >
          Add deadlines manually
        </a>

        <p className="text-xs text-[#B3B0A6] mt-16 text-center">
          No account needed. Nothing to set up.
        </p>
      </div>

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
              style={{ fontFamily: "var(--font-baloo)" }}
            >
              Connect Google Classroom
            </h2>
            <p className="text-sm text-[#5B5D68] mb-6 leading-relaxed">
              The Rally reads your course deadlines to build your week. It
              can&apos;t post, edit, or grade anything on your behalf.
            </p>

            <a
              href="/api/auth/signin/google"
              className="block w-full bg-[#1B2A4A] text-white py-3 rounded-xl text-center font-medium text-sm mb-2 hover:bg-[#22335c] transition"
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
