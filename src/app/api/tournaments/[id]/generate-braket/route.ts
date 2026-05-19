import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Tournament } from "@/models/Tournament";
import { generateSingleEliminationBracket } from "@/lib/bracket";
import { Player } from "@/types/player";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const tournament = await Tournament.findById(params.id);

  if (!tournament)
    return NextResponse.json({ error: "Not found" });

  const players = tournament.players.map((p: Player) =>
    p.toString()
  );

  const bracket = await generateSingleEliminationBracket(
    tournament._id.toString(),
    players
  );

  return NextResponse.json(bracket);
}