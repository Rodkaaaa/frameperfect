import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Tournament } from "@/models/Tournament";

/* GET tournaments */
export async function GET() {
  await connectDB();

  const tournaments = await Tournament.find()
    .populate("organizer")
    .populate("players");

  return NextResponse.json(tournaments);
}

/* CREATE tournament */
export async function POST(req: Request) {
  await connectDB();

  const body = await req.json();

  const tournament = await Tournament.create(body);

  return NextResponse.json(tournament);
}
