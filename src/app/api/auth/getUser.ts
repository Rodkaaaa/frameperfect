import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { AuthUser } from "@/types/auth";

export async function getUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as AuthUser; // 🔥 CAST CORRECTO

    return decoded;
  } catch {
    return null;
  }
}