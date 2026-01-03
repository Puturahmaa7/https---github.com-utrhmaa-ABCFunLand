import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db1";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { message: "Data tidak lengkap" },
      { status: 400 }
    );
  }

  const [exist]: any = await db.query(
    "SELECT id FROM users WHERE email_user = ?",
    [email]
  );

  if (exist.length) {
    return NextResponse.json(
      { message: "Email sudah terdaftar" },
      { status: 409 }
    );
  }

  const hashed = await bcrypt.hash(password, 10);

  await db.query(
    "INSERT INTO users (nama_lengkap_user, email_user, password_user) VALUES (?, ?, ?)",
    [name, email, hashed]
  );

  return NextResponse.json({ success: true });
}
