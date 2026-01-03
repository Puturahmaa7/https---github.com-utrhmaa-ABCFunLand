// Simpan di database atau cache (Redis lebih baik)
const verificationCodes = new Map<string, { code: string; expiresAt: Date }>();

export function generateVerificationCode(): string {
  // 6 digit angka
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function saveVerificationCode(
  email: string,
  code: string,
  expiresAt: Date
): Promise<void> {
  // Simpan di database atau cache
  verificationCodes.set(email, { code, expiresAt });

  // Auto delete setelah expire
  setTimeout(() => {
    verificationCodes.delete(email);
  }, expiresAt.getTime() - Date.now());
}

export async function verifyCode(
  email: string,
  code: string
): Promise<boolean> {
  const stored = verificationCodes.get(email);

  if (!stored) {
    return false;
  }

  // Cek expired
  if (new Date() > stored.expiresAt) {
    verificationCodes.delete(email);
    return false;
  }

  // Cek kode cocok
  const isValid = stored.code === code;

  // Hapus setelah digunakan (one-time use)
  if (isValid) {
    verificationCodes.delete(email);
  }

  return isValid;
}

export async function generateResetToken(email: string): Promise<string> {
  // Generate JWT token untuk reset password
  const token = require("crypto").randomBytes(32).toString("hex");

  // Simpan token ke database dengan expiry (15 menit)
  // ...

  return token;
}
