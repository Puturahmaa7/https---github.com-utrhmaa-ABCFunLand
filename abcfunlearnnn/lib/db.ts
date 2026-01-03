import mysql, {
  Pool,
  PoolConnection,
  RowDataPacket,
  ResultSetHeader,
} from "mysql2/promise";

// =====================
// KONFIGURASI DATABASE
// =====================

const poolConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
};

let pool: Pool;

try {
  pool = mysql.createPool(poolConfig);
  console.log("✅ Database pool created");
} catch (error) {
  console.error("❌ Failed to create database pool:", error);
  throw error;
}

// =====================
// TIPE DATA
// =====================

export interface User {
  id: number;
  nama_lengkap_user: string;
  email_user: string;
  password_user: string;
  created_at: Date;
  reset_code: string | null;
  reset_expired: Date | null;
}

// =====================
// FUNGSI UTILITY
// =====================

async function getConnection(): Promise<PoolConnection> {
  return await pool.getConnection();
}

// =====================
// HELPER FUNCTIONS
// =====================
async function query<T = any>(sql: string, params: any[] = []): Promise<T> {
  const [rows] = await pool.execute(sql, params);
  return rows as T;
}

// =====================
// AUTH FUNCTIONS
// =====================

// 1. Cek email exists
export async function checkEmailExists(email: string): Promise<boolean> {
  try {
    const result = await query<RowDataPacket[]>(
      "SELECT 1 FROM users WHERE email_user = ?",
      [email]
    );
    return result.length > 0;
  } catch (error) {
    console.error("Error checking email:", error);
    return false;
  }
}

// 2. Simpan reset code
export async function saveResetCode(
  email: string,
  code: string
): Promise<boolean> {
  try {
    const expiresAt = new Date(Date.now() + 3 * 60 * 1000); // 3 menit

    const result = await query(
      `UPDATE users 
       SET reset_code = ?, reset_expired = ? 
       WHERE email_user = ?`,
      [code, expiresAt, email]
    );

    return true;
  } catch (error) {
    console.error("Error saving reset code:", error);
    return false;
  }
}

// 3. Reset password (SIMPLE VERSION - NO TRANSACTION)
export async function resetPassword(
  email: string,
  code: string,
  newPassword: string
): Promise<{ success: boolean; message: string }> {
  try {
    console.log("🔐 Starting password reset for:", email);

    // 1. Cek kode valid
    const result = await query<RowDataPacket[]>(
      `SELECT reset_code, reset_expired 
       FROM users 
       WHERE email_user = ?`,
      [email]
    );

    if (result.length === 0) {
      return { success: false, message: "Email tidak ditemukan" };
    }

    const user = result[0];
    const now = new Date();

    // Cek reset_code ada
    if (!user.reset_code || !user.reset_expired) {
      return { success: false, message: "Kode reset tidak ditemukan" };
    }

    // Cek expired
    const expiredAt = new Date(user.reset_expired);
    if (now > expiredAt) {
      // Clear expired code
      await query(
        "UPDATE users SET reset_code = NULL, reset_expired = NULL WHERE email_user = ?",
        [email]
      );
      return { success: false, message: "Kode sudah expired" };
    }

    // Cek kode cocok
    if (user.reset_code !== code) {
      return { success: false, message: "Kode tidak valid" };
    }

    console.log("✅ Code verified, hashing password...");

    // 2. Hash password baru
    const bcrypt = require("bcryptjs");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // 3. Update password dan clear reset code
    await query(
      `UPDATE users 
       SET password_user = ?, 
           reset_code = NULL, 
           reset_expired = NULL 
       WHERE email_user = ?`,
      [hashedPassword, email]
    );

    console.log("✅ Password updated successfully");

    return {
      success: true,
      message: "Password berhasil direset. Silakan login dengan password baru.",
    };
  } catch (error: any) {
    console.error("❌ Reset password error:", error);
    return {
      success: false,
      message: "Terjadi kesalahan server. Silakan coba lagi.",
    };
  }
}

// 4. Test connection
export async function testConnection(): Promise<boolean> {
  try {
    await query("SELECT 1");
    console.log("✅ Database connected");
    return true;
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    return false;
  }
}

// SIMPLE VERSION - Hanya untuk development

export async function sendVerificationCode(
  email: string,
  code: string,
  expiresInMinutes: number = 3
): Promise<boolean> {
  try {
    // DI DEVELOPMENT: Hanya log ke console
    console.log("📧 [EMAIL SIMULATION]");
    console.log("To:", email);
    console.log("Code:", code);
    console.log("Expires in:", expiresInMinutes, "minutes");
    console.log("---");

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Selalu return true di development
    return true;
  } catch (error) {
    console.error("Email error (ignored in dev):", error);
    return true; // Tetap true supaya flow lanjut
  }
}
