import type { Metadata } from "next";
import { Inter, Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CelebrationOverlay } from "./components/CelebrationOverlay";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "The Rally — Smart Study Planner",
  description:
    "The Rally is a smart study planner that syncs your Google Classroom, plans your week, and cheers you on with focus sessions and AI insights.",
  authors: [{ name: "The Rally" }],
  openGraph: {
    title: "The Rally — Smart Study Planner",
    description: "Sync your classes, plan your week, and rally your focus.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${fraunces.variable} ${jakarta.variable} antialiased bg-[#FBF9F5] text-[#1B2A4A]`}
      >
        <CelebrationOverlay />
        {children}
      </body>
    </html>
  );
}