"use client";

import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();

  const [role, setRole] = useState<"player" | "organizer">("player");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
        role,
      }),
    });

    if (res.ok) {
      router.push("/login");
    }
  }

  return (
    <Paper
      elevation={10}
      className="p-8 backdrop-blur-md bg-white/10 text-white"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        Create Account
      </h2>

      {/* ROLE SELECTOR */}
      <ToggleButtonGroup
        color="primary"
        exclusive
        value={role}
        onChange={(_, value) => value && setRole(value)}
        fullWidth
        className="mb-6"
      >
        <ToggleButton value="player">Player</ToggleButton>
        <ToggleButton value="organizer">Organizer</ToggleButton>
      </ToggleButtonGroup>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          onChange={(e) => setName(e.target.value)}
        />

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
        >
          Register
        </Button>
      </form>
    </Paper>
  );
}