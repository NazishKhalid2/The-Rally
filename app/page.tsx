import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import LandingScreen from "./components/LandingScreen";

export default async function RootPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/home");
  }

  return <LandingScreen />;
}