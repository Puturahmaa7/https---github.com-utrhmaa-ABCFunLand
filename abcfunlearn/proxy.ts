import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const cookie = req.headers.get("cookie");

  if (
    req.nextUrl.pathname.startsWith("/dashboard") &&
    (!cookie || !cookie.includes("user_id="))
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
