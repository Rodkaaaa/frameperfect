import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

import { Player } from "@/models/Player";
import { Tournament } from "@/models/Tournament";

import { applySeeding } from "../../../lib/brackets/applySeeding";
import { singleElimination } from "../../../services/brackets/singleElimination";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { tournamentId } = await req.json();

    if (!tournamentId)
      return NextResponse.json(
        { error: "tournamentId required" },
        { status: 400 },
      );

    /* ---------------- GET TOURNAMENT ---------------- */

    const tournament = await Tournament.findById(tournamentId);

    if (!tournament)
      return NextResponse.json(
        { error: "Tournament not found" },
        { status: 404 },
      );

    /* ---------------- GET PLAYERS ---------------- */

    const players = await Player.find({
      tournament: tournamentId,
    });

    if (players.length < 2)
      return NextResponse.json(
        { error: "Not enough players" },
        { status: 400 },
      );

    /* ---------------- SEEDING ---------------- */

    const seededPlayers = applySeeding(players, tournament.seeding || "random");

    /* ---------------- GENERATE BRACKET ---------------- */

    const matches = await singleElimination(
      tournamentId,
      seededPlayers.map((p) => p.id.toString()),
    );

    return NextResponse.json(matches);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Bracket generation failed" },
      { status: 500 },
    );
  }
}
