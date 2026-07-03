import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ConnectScreen from "./components/ConnectScreen";

export default async function HomePage() {
  const session = await getServerSession();

  if (!session) {
    return <ConnectScreen />;
  }

  redirect("/home");
}
