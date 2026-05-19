import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Player } from "@/models/Player";

/* ======================
   GET ALL PLAYERS
====================== */
export async function GET() {
  try {
    await connectDB();

    const players = await Player.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(players);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch players" },
      { status: 500 }
    );
  }
}

/* ======================
   CREATE PLAYER
====================== */
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    if (!body.gamerTag) {
      return NextResponse.json(
        { error: "gamerTag is required" },
        { status: 400 }
      );
    }

    // evitar duplicados
    const exists = await Player.findOne({
      gamerTag: body.gamerTag,
    });

    if (exists) {
      return NextResponse.json(
        { error: "Player already exists" },
        { status: 400 }
      );
    }

    const player = await Player.create({
      gamerTag: body.gamerTag,
      country: body.country ?? "Unknown",
      avatar: body.avatar ?? "",
    });

    return NextResponse.json(player, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create player" },
      { status: 500 }
    );
  }
}