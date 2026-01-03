import { NextResponse } from "next/server";

export async function GET() {
  const res = NextResponse.redirect(
    new URL("/", process.env.NEXT_PUBLIC_APP_URL)
  );
  res.cookies.set("user_id", "", { maxAge: 0, path: "/" });
  return res;
}
