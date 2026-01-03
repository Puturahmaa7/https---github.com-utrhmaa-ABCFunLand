// lib/session-simple.ts
// Session management dengan plain object (no Map errors)

export interface SessionData {
  email: string;
  verified: boolean;
  expiresAt: number;
  createdAt: number;
}

// Simple session store dengan object
const sessions: Record<string, SessionData> = {};

// Debug mode
const DEBUG = process.env.NODE_ENV === "development";

/**
 * Simpan session data
 */
export async function setSessionData(
  sessionId: string,
  data: SessionData
): Promise<void> {
  if (DEBUG) {
    console.log("📝 Setting session:", sessionId.substring(0, 10) + "...", {
      email: data.email,
      expiresIn: Math.round((data.expiresAt - Date.now()) / 1000) + "s",
    });
  }

  sessions[sessionId] = data;

  // Auto cleanup
  const ttl = data.expiresAt - Date.now();
  if (ttl > 0) {
    setTimeout(() => {
      if (sessions[sessionId]) {
        delete sessions[sessionId];
        if (DEBUG) console.log("🗑️ Auto-deleted expired session");
      }
    }, ttl);
  }
}

/**
 * Ambil session data
 */
export async function getSessionData(
  sessionId: string
): Promise<SessionData | null> {
  const data = sessions[sessionId];

  if (!data) {
    if (DEBUG)
      console.log("❌ Session not found:", sessionId.substring(0, 10) + "...");
    return null;
  }

  // Cek expired
  if (Date.now() > data.expiresAt) {
    delete sessions[sessionId];
    if (DEBUG) console.log("❌ Session expired");
    return null;
  }

  if (DEBUG) {
    console.log("✅ Session found:", {
      email: data.email,
      expiresIn: Math.round((data.expiresAt - Date.now()) / 1000) + "s",
    });
  }

  return data;
}

/**
 * Validasi session
 */
export async function validateResetSession(
  sessionId: string,
  email: string
): Promise<{
  valid: boolean;
  message?: string;
  sessionData?: SessionData;
}> {
  if (!sessionId) {
    return { valid: false, message: "Session ID tidak ditemukan" };
  }

  const sessionData = await getSessionData(sessionId);

  if (!sessionData) {
    return {
      valid: false,
      message: "Session tidak ditemukan atau sudah expired",
    };
  }

  // Cek email cocok
  if (sessionData.email !== email) {
    if (DEBUG) console.warn("⚠️ Email mismatch");
    return { valid: false, message: "Email tidak cocok dengan session" };
  }

  // Cek sudah diverifikasi
  if (!sessionData.verified) {
    return { valid: false, message: "Session belum diverifikasi" };
  }

  return { valid: true, sessionData };
}

/**
 * Buat session baru
 */
export async function createResetSession(email: string): Promise<string> {
  const sessionId = `reset_${Date.now()}_${Math.random()
    .toString(36)
    .substr(2, 12)}`;
  const expiresAt = Date.now() + 15 * 60 * 1000; // 15 menit

  const sessionData: SessionData = {
    email,
    verified: true,
    expiresAt,
    createdAt: Date.now(),
  };

  await setSessionData(sessionId, sessionData);

  if (DEBUG) {
    console.log("🎯 Created session:", {
      id: sessionId.substring(0, 10) + "...",
      email,
      expiresIn: "15m",
    });
  }

  return sessionId;
}

/**
 * Hapus session
 */
export async function deleteSession(sessionId: string): Promise<void> {
  if (sessions[sessionId]) {
    delete sessions[sessionId];
    if (DEBUG) console.log("🗑️ Deleted session");
  }
}

/**
 * Debug semua sessions
 */
export function debugSessions(): void {
  console.log("📊 Active Sessions:", Object.keys(sessions).length);

  Object.entries(sessions).forEach(([sessionId, data]) => {
    console.log({
      id: sessionId.substring(0, 10) + "...",
      email: data.email,
      expiresIn: Math.round((data.expiresAt - Date.now()) / 1000) + "s",
    });
  });
}

// Cleanup expired sessions
setInterval(() => {
  const now = Date.now();
  let deleted = 0;

  Object.keys(sessions).forEach((sessionId) => {
    const data = sessions[sessionId];
    if (data && now > data.expiresAt) {
      delete sessions[sessionId];
      deleted++;
    }
  });

  if (deleted > 0 && DEBUG) {
    console.log(`🧹 Cleaned ${deleted} expired sessions`);
  }
}, 60 * 1000);
