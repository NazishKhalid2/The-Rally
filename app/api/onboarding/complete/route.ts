import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const existing = await prisma.streak.findFirst();
  if (!existing) {
    await prisma.streak.create({ data: { currentCount: 0 } });
  }
  return NextResponse.json({ ok: true });
}