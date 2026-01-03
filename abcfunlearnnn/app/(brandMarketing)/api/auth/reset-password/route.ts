import { NextRequest, NextResponse } from "next/server";
import { resetPassword } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    // 1. Parse request
    const { email, code, newPassword, confirmPassword } = await request.json();

    console.log("🔄 Reset request for:", email);

    // 2. Validasi input
    if (!email || !code || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { success: false, message: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    if (code.length !== 6) {
      return NextResponse.json(
        { success: false, message: "Kode harus 6 digit" },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { success: false, message: "Password tidak cocok" },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password minimal 6 karakter" },
        { status: 400 }
      );
    }

    // 3. Proses reset password
    const result = await resetPassword(email, code, newPassword);

    // 4. Return response berdasarkan result
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message,
    });
  } catch (error: any) {
    console.error("Reset password API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan server",
      },
      { status: 500 }
    );
  }
}
