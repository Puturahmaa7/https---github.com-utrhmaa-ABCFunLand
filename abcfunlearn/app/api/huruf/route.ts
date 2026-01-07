import { NextResponse } from "next/server";
import { getHurufByHuruf } from "@/db/queries";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const huruf = searchParams.get("huruf");

  if (!huruf) {
    return NextResponse.json(
      { error: "huruf wajib diisi" },
      { status: 400 }
    );
  }

  const data = await getHurufByHuruf(huruf.toUpperCase());

  return NextResponse.json(data ?? null);
}
