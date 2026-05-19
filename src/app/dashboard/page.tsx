import { redirect } from "next/navigation";
import { getUser } from "../api/auth/getUser";

export default async function Dashboard() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role === "organizer") {
    redirect("/dashboard/organizer");
  }

  redirect("/dashboard/player");
}