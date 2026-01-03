// app/api/auth/verify-code/route.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyCodeOnly } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json();

    const verification = await verifyCodeOnly(email, code);

    if (!verification.valid) {
      return NextResponse.json(
        { success: false, message: verification.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Kode valid. Silakan buat password baru.",
    });
  } catch (error) {
    console.error("Verify code error:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
