import { AuthUser } from "@/types/auth";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export function signToken(payload: AuthUser) {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET);
}
