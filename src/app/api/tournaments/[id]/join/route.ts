import { NextResponse } from "next/server";
import {connectDB} from "@/lib/mongodb";
import Participant from "@/models/Participant";
import { Player } from "@/models/Player";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const body = await req.json();

    const playerId = body.playerId;
    const tournamentId = params.id;

    // verificar jugador existe
    const player = await Player.findById(playerId);

    if (!player) {
      return NextResponse.json(
        { error: "Player not found" },
        { status: 404 }
      );
    }

    // evitar doble inscripción
    const alreadyJoined = await Participant.findOne({
      playerId,
      tournamentId,
    });

    if (alreadyJoined) {
      return NextResponse.json(
        { error: "Player already registered" },
        { status: 400 }
      );
    }

    const participant = await Participant.create({
      playerId,
      tournamentId,
    });

    return NextResponse.json(participant, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Join failed" },
      { status: 500 }
    );
  }
}