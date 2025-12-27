import { redirect } from "next/navigation"

export const metadata = {
  title: "WarRoom - SaintSal AI Chat Interface",
  description:
    "Access the SaintSal AI WarRoom for multi-model AI conversations, voice synthesis, and intelligent assistance.",
}

export default function WarRoomPage() {
  // Redirect to dashboard which has the full WarRoom interface
  redirect("/dashboard")
}
