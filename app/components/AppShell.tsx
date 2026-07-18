"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Home, Sparkles, Target, User, Users } from "lucide-react";
import type { ReactNode } from "react";

const nav = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/week", label: "Week", icon: CalendarDays },
  { href: "/focus", label: "Focus", icon: Target },
  { href: "/ai", label: "Rally AI", icon: Sparkles },
  { href: "/together", label: "Together", icon: Users },
  { href: "/profile", label: "Profile", icon: User },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex max-w-[1400px] gap-8 px-6 py-8 lg:px-10">
        <aside className="sticky top-8 hidden h-[calc(100vh-4rem)] w-64 shrink-0 flex-col justify-between rounded-3xl border border-border bg-sidebar p-5 lg:flex">
          <div>
            <Link href="/" className="flex items-center gap-2 px-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-display text-lg font-bold">
                R
              </span>
              <span className="font-display text-xl font-semibold">The Rally</span>
            </Link>
            <nav className="mt-8 flex flex-col gap-1">
              {nav.map(({ href, label, icon: Icon }) => {
                const active =
                  pathname === href || (href !== "/home" && pathname.startsWith(href));
                return (
                  <Link
                    key={href}
                    href={href}
                    className={
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors " +
                      (active
                        ? "bg-primary text-primary-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent")
                    }
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="rounded-2xl bg-primary/5 p-4 text-xs text-muted-foreground">
            <p className="font-display text-sm font-semibold text-foreground">
              Synced with Google Classroom
            </p>
            <p className="mt-1">Last sync · just now</p>
          </div>
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>

      <nav className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-full border border-border bg-card px-2 py-2 shadow-lg lg:hidden">
        {nav.slice(0, 5).map(({ href, label, icon: Icon }) => {
          const active =
            pathname === href || (href !== "/home" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={
                "flex flex-col items-center gap-0.5 rounded-full px-3 py-1.5 text-[10px] font-medium " +
                (active ? "bg-primary text-primary-foreground" : "text-muted-foreground")
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}