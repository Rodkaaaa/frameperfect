import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Tournament } from "@/models/Tournament";

/* GET ONE */
export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  await connectDB();

  const tournament = await Tournament.findById(params.id)
    .populate("organizer")
    .populate("players");

  return NextResponse.json(tournament);
}

/* UPDATE */
export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  await connectDB();

  const body = await req.json();

  const updated = await Tournament.findByIdAndUpdate(params.id, body, {
    new: true,
  });

  return NextResponse.json(updated);
}

/* DELETE */
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  await connectDB();

  await Tournament.findByIdAndDelete(params.id);

  return NextResponse.json({ message: "Tournament deleted" });
}
