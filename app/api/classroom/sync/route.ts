import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { fetchClassroomDeadlines } from "@/lib/classroom";

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const { coursesFound, tasks } = await fetchClassroomDeadlines(
      session.accessToken
    );

    let newCount = 0;
    for (const t of tasks) {
      const existing = await prisma.task.findFirst({
        where: { title: t.title, subject: t.subject, source: "gcr" },
      });

      if (!existing) {
        await prisma.task.create({
          data: {
            title: t.title,
            subject: t.subject,
            description: t.description,
            dueDate: t.dueDate,
            source: "gcr",
          },
        });
        newCount++;
      }
    }

    const allGcrTasks = await prisma.task.findMany({
      where: { source: "gcr" },
      orderBy: { dueDate: "asc" },
    });

    return NextResponse.json({
      coursesFound,
      tasksFound: allGcrTasks.length,
      newTasks: newCount,
      tasks: allGcrTasks,
    });
  } catch (err) {
    console.error("Classroom sync failed:", err);
    return NextResponse.json({ error: "Sync failed" }, { status: 500 });
  }
}
