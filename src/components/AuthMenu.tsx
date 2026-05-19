"use client";

import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

export default function AuthMenu({
  user,
}: {
  user: { id: string; role: string } | null;
}) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/");
    router.refresh();
  }

  if (!user) {
    return (
      <div className="flex gap-3">
        <Button href="/login" variant="outlined" color="inherit">
          Login
        </Button>

        <Button href="/register" variant="contained">
          Register
        </Button>
      </div>
    );
  }

  return (
    <div className="flex gap-3 items-center">

      <Button
        variant="outlined"
        color="inherit"
        onClick={() => router.push("/dashboard")}
      >
        Dashboard
      </Button>

      <Button
        variant="contained"
        color="error"
        onClick={logout}
      >
        Logout
      </Button>

    </div>
  );
}