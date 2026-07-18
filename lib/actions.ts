"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createTask(formData: FormData) {
  const title = formData.get("title") as string;
  const dueDateStr = formData.get("dueDate") as string;
  const taskType = formData.get("taskType") as string;

  await prisma.task.create({
    data: {
      title,
      dueDate: dueDateStr ? new Date(dueDateStr) : null,
      taskType: taskType || "study",
      source: "manual",
    },
  });

  redirect("/home");
}
export async function logSession(data: {
  taskId: string;
  durationSec: number;
  mode: string;
  isShared?: boolean;
  friendName?: string;
}) {
  await prisma.session.create({
    data: {
      taskId: data.taskId,
      durationSec: data.durationSec,
      mode: data.mode,
      isShared: data.isShared ?? false,
      friendName: data.friendName ?? null,
      endedAt: new Date(),
    },
  });

  const streak = await prisma.streak.findFirst();
  if (streak) {
    await prisma.streak.update({
      where: { id: streak.id },
      data: {
        currentCount: streak.currentCount + 1,
        lastActiveDay: new Date(),
      },
    });
  }
}