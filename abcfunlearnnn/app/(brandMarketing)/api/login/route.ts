import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    const [rows]: any = await db.query(
      "SELECT * FROM users WHERE email_user = ?",
      [email]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Email tidak ditemukan" },
        { status: 401 }
      );
    }

    const valid = await bcrypt.compare(password, rows[0].password_user);

    if (!valid) {
      return NextResponse.json({ message: "Password salah" }, { status: 401 });
    }

    const response = NextResponse.json({
      message: "Login berhasil",
    });

    response.cookies.set("user_id", rows[0].id.toString(), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 🔥 7 HARI
    });

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
