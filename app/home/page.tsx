import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import SyncOnboarding from "../components/SyncOnboarding";
import HomeList from "../components/HomeList";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const taskCount = await prisma.task.count();

  if (taskCount === 0) {
    return <SyncOnboarding />;
  }

  const tasks = await prisma.task.findMany({
    orderBy: { dueDate: "asc" },
  });

  return <HomeList tasks={tasks} />;
}
