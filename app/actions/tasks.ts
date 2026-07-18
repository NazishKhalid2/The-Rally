"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function markTaskDone(taskId: string) {
  await prisma.task.update({
    where: { id: taskId },
    data: { status: "done" },
  });
  revalidatePath("/home");
  revalidatePath(`/task/${taskId}`);
}