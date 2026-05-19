import Button from "@mui/material/Button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="text-center py-24 bg-gradient-to-b from-black to-gray-900 text-white">

      <h1 className="text-5xl font-extrabold mb-6">
        The Tournament Platform for Fighting Games
      </h1>

      <p className="text-lg max-w-2xl mx-auto text-gray-300">
        FramePerfect is a platform designed for FGC organizers and players.
        Create tournaments, manage brackets, and compete with precision.
      </p>

      <div className="mt-8 flex justify-center gap-4">
        <Link href="/register">
          <Button variant="contained" size="large">
            Start Organizing
          </Button>
        </Link>

        <Link href="/login">
          <Button variant="outlined" color="inherit" size="large">
            Join as Player
          </Button>
        </Link>
      </div>
    </section>
  );
}