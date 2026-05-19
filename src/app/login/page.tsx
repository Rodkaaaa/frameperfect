"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

import AnimatedBackground from "@/components/register/AnimatedBackground";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    setLoading(false);

    if (!res.ok) {
      alert(data.error);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center text-white">

      {/* BACKGROUND */}
      <AnimatedBackground />

      {/* LOGIN CARD */}
      <Paper
        elevation={10}
        className="p-10 w-full max-w-md backdrop-blur-md bg-white/10"
      >
        <h1 className="text-3xl font-bold text-center mb-8">
          Welcome Back 🎮
        </h1>

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-5"
        >
          <TextField
            label="Email"
            type="email"
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            variant="contained"
            size="large"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        {/* REGISTER LINK */}
        <p className="text-center mt-6 text-sm opacity-80">
          New here?{" "}
          <span
            className="underline cursor-pointer"
            onClick={() => router.push("/register")}
          >
            Create an account
          </span>
        </p>
      </Paper>

    </main>
  );
}