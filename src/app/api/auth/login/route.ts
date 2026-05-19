import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { signToken } from "../../../../lib/auth/jwt";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    const cookieStore = await cookies(); // ✅ IMPORTANTE

  try {
    await connectDB();

    const { email, password } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = signToken({
      id: user._id,
      role: user.role,
    });

    cookieStore.set("token", token, {
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite: "lax",
      });

    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });

  } catch (error) {
    return NextResponse.json(
      { error: `Login failed ${error}` },
      { status: 500 }
    );
  }
}