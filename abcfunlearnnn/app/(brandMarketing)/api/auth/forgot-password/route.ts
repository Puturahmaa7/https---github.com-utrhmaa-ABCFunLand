import { NextRequest, NextResponse } from "next/server";
import { checkEmailExists, saveResetCode } from "@/lib/db";
import { sendVerificationCode } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    console.log("📧 Forgot password request received");

    // 1. Parse request dengan error handling
    let body;
    try {
      body = await request.json();
    } catch (error) {
      console.error("❌ JSON parse error:", error);
      return NextResponse.json(
        { success: false, message: "Format request tidak valid" },
        { status: 400 }
      );
    }

    const { email } = body;
    console.log("📧 Email received:", email);

    // 2. Validasi input
    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email wajib diisi" },
        { status: 400 }
      );
    }

    // 3. Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Format email tidak valid" },
        { status: 400 }
      );
    }

    console.log("🔍 Checking if email exists in database...");

    // 4. CEK EMAIL DI DATABASE (STRICT CHECK)
    const userExists = await checkEmailExists(email);
    console.log("📊 Email exists in database:", userExists);

    // **STRICT MODE: Return error jika email tidak ditemukan**
    if (!userExists) {
      console.log(`❌ Email not found in database: ${email}`);
      return NextResponse.json(
        {
          success: false,
          message: "Email tidak terdaftar dalam sistem kami",
        },
        { status: 404 }
      );
    }

    console.log("✅ Email found in database, generating code...");

    // 5. Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`🔑 Generated code for ${email}: ${code}`);

    // 6. Simpan ke database
    console.log("💾 Saving code to database...");
    const saved = await saveResetCode(email, code);

    if (!saved) {
      console.error("❌ Failed to save reset code");
      throw new Error("Gagal menyimpan kode ke database");
    }

    console.log("✅ Code saved to database");

    // 7. Kirim email (development mode: hanya log)
    console.log("📤 Sending verification email...");
    const emailSent = await sendVerificationCode(email, code, 3);

    if (!emailSent) {
      console.warn("⚠️ Email sending failed (but code is saved in DB)");
    } else {
      console.log("✅ Email sent (simulated in development)");
    }

    // 8. Return response
    const responseData: any = {
      success: true,
      message: "Kode verifikasi telah dikirim ke email Anda",
      expiresIn: 3,
    };

    // Hanya di development: tampilkan kode untuk testing
    if (process.env.NODE_ENV === "development") {
      responseData.debugCode = code;
      console.log("🧪 DEV MODE: Displaying code in response:", code);
    }

    console.log("✅ Request completed successfully");
    return NextResponse.json(responseData);
  } catch (error: any) {
    console.error("❌ Forgot password error:", {
      message: error.message,
      stack: error.stack,
    });

    // Always return valid JSON
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan server. Silakan coba lagi nanti.",
      },
      { status: 500 }
    );
  }
}
