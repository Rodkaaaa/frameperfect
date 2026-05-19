import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Tournament } from "@/models/Tournament";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const { playerId } = await req.json();

  const tournament = await Tournament.findById(params.id);

  if (!tournament)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (tournament.players.includes(playerId))
    return NextResponse.json({ error: "Already joined" });

  if (tournament.players.length >= tournament.maxPlayers)
    return NextResponse.json({ error: "Tournament full" });

  tournament.players.push(playerId);

  await tournament.save();

  return NextResponse.json(tournament);
}