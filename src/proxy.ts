import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/auth/jwt";

export function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // rutas protegidas
  if (req.nextUrl.pathname.startsWith("/organizer")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const user: any = verifyToken(token);

      if (user.role !== "organizer") {
        return NextResponse.redirect(new URL("/", req.url));
      }

      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/organizer/:path*"],
};