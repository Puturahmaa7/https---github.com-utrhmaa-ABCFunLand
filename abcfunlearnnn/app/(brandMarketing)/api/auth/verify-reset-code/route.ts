import { NextResponse } from "next/server";

// Simpan kode verifikasi di memory (untuk development)
// Dalam produksi, gunakan database atau cache (Redis, MongoDB, dll)
const verificationCodes = new Map<
  string,
  { code: string; expiresAt: number }
>();

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json();

    // Validasi input
    if (!email || !code) {
      return NextResponse.json(
        { success: false, message: "Email dan kode diperlukan" },
        { status: 400 }
      );
    }

    if (code.length !== 6) {
      return NextResponse.json(
        { success: false, message: "Kode harus 6 digit" },
        { status: 400 }
      );
    }

    // Cari kode verifikasi untuk email ini
    const storedCode = verificationCodes.get(email);

    // Jika kode tidak ditemukan atau sudah kadaluarsa
    if (!storedCode) {
      return NextResponse.json(
        {
          success: false,
          message: "Kode tidak ditemukan atau sudah kadaluarsa",
        },
        { status: 404 }
      );
    }

    // Cek apakah kode sudah kadaluarsa (3 menit)
    if (Date.now() > storedCode.expiresAt) {
      verificationCodes.delete(email); // Hapus kode yang sudah expired
      return NextResponse.json(
        { success: false, message: "Kode sudah kadaluarsa" },
        { status: 410 }
      );
    }

    // Cek apakah kode cocok
    if (storedCode.code !== code) {
      return NextResponse.json(
        { success: false, message: "Kode verifikasi salah" },
        { status: 401 }
      );
    }

    // Jika semua validasi berhasil
    return NextResponse.json({
      success: true,
      message: "Kode berhasil diverifikasi",
      email,
      verified: true,
    });
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Helper function untuk generate dan simpan kode (digunakan di forgot-password)
export function generateAndStoreCode(email: string): string {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 3 * 60 * 1000; // 3 menit dari sekarang

  verificationCodes.set(email, {
    code,
    expiresAt,
  });

  console.log(
    `✅ Generated code for ${email}: ${code} (expires at ${new Date(
      expiresAt
    ).toLocaleTimeString()})`
  );

  return code;
}
