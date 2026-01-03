"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const router = useRouter();

  // State
  const [step, setStep] = useState<"email" | "verifikasi" | "reset">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [debugCode, setDebugCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  // Format countdown
  const formatCountdown = () => {
    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // =====================
  // STEP 1: REQUEST CODE
  // =====================
  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    setDebugCode("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      // Parse response
      const text = await res.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Invalid response from server");
      }

      if (!res.ok) {
        throw new Error(data.message || "Request failed");
      }

      // Jika berhasil, SET STEP KE "verifikasi" BUKAN "reset"
      setStep("verifikasi");
      setCountdown(180); // 3 menit

      // Simpan debug code jika ada
      if (data.debugCode) {
        setDebugCode(data.debugCode);
        console.log("🔑 Debug code:", data.debugCode);
      }

      setSuccess("Kode verifikasi telah dikirim ke email Anda");
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  // =====================
  // STEP 2: VERIFY CODE
  // =====================
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Validasi
      if (code.length !== 6) {
        throw new Error("Kode harus 6 digit");
      }

      // Simulasi verifikasi kode
      // Untuk development, kita bisa bypass dengan debug code
      if (
        process.env.NODE_ENV === "development" &&
        debugCode &&
        code === debugCode
      ) {
        console.log("✅ Development mode: Code verified");
        setSuccess("Kode berhasil diverifikasi!");

        // Pindah ke step reset setelah 1 detik
        setTimeout(() => {
          setStep("reset");
        }, 1000);

        setLoading(false);
        return;
      }

      // Kirim request verifikasi
      const res = await fetch("/api/auth/verify-reset-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      // Parse response
      const text = await res.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Invalid response from server");
      }

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Kode verifikasi salah");
      }

      // Jika berhasil
      setSuccess("Kode berhasil diverifikasi!");

      // Pindah ke step reset setelah 1 detik
      setTimeout(() => {
        setStep("reset");
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Gagal verifikasi kode");
    } finally {
      setLoading(false);
    }
  };

  // =====================
  // STEP 3: RESET PASSWORD
  // =====================
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Validasi
      if (password !== confirmPassword) {
        throw new Error("Password tidak cocok");
      }

      if (password.length < 6) {
        throw new Error("Password minimal 6 karakter");
      }

      // Kirim request
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          code,
          newPassword: password,
          confirmPassword,
        }),
      });

      // Parse response
      const text = await res.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Invalid response from server");
      }

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Reset failed");
      }

      // Success
      setSuccess("Password berhasil direset! Mengalihkan...");

      // Redirect setelah 2 detik
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Gagal reset password");
    } finally {
      setLoading(false);
    }
  };

  // =====================
  // RESEND CODE
  // =====================
  const handleResendCode = async () => {
    if (countdown > 30) {
      // Minimal tunggu 30 detik
      setError(`Tunggu ${countdown - 30} detik untuk kirim ulang`);
      return;
    }

    await handleRequestCode(new Event("submit") as any);
  };

  // =====================
  // COPY DEBUG CODE
  // =====================
  const copyDebugCode = () => {
    if (debugCode) {
      navigator.clipboard.writeText(debugCode);
      setSuccess(`Kode ${debugCode} telah disalin!`);
      setTimeout(() => setSuccess(""), 2000);
    }
  };

  // Auto-submit jika kode sudah 6 digi

  return (
    <div className="bg-white">
      <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
          {/* Tombol Kembali */}
          <button
            onClick={() => {
              if (step === "verifikasi") {
                setStep("email");
              } else if (step === "reset") {
                setStep("verifikasi");
              } else {
                router.back();
              }
            }}
            className="absolute top-4 left-4 text-2xl font-bold text-black hover:text-gray-600"
            aria-label="Kembali"
          >
            ×
          </button>

          {/* Logo */}
          <img
            src="/images/Logo.png"
            alt="Logo"
            className="mx-auto h-20 w-auto"
          />

          {/* Progress Indicator */}
          <div className="mt-6 flex justify-center mb-6">
            <div className="flex items-center">
              {/* Step 1 */}
              <div
                className={`flex flex-col items-center ${
                  step === "email" ? "text-blue-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    step === "email"
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-300"
                  }`}
                >
                  1
                </div>
                <span className="text-xs mt-1">Email</span>
              </div>

              {/* Garis */}
              <div
                className={`w-16 h-0.5 mx-2 ${
                  step === "verifikasi" || step === "reset"
                    ? "bg-blue-600"
                    : "bg-gray-300"
                }`}
              ></div>

              {/* Step 2 */}
              <div
                className={`flex flex-col items-center ${
                  step === "verifikasi" || step === "reset"
                    ? "text-blue-600"
                    : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    step === "verifikasi" || step === "reset"
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-300"
                  }`}
                >
                  2
                </div>
                <span className="text-xs mt-1">Verifikasi</span>
              </div>

              {/* Garis */}
              <div
                className={`w-16 h-0.5 mx-2 ${
                  step === "reset" ? "bg-blue-600" : "bg-gray-300"
                }`}
              ></div>

              {/* Step 3 */}
              <div
                className={`flex flex-col items-center ${
                  step === "reset" ? "text-blue-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    step === "reset"
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-300"
                  }`}
                >
                  3
                </div>
                <span className="text-xs mt-1">Reset</span>
              </div>
            </div>
          </div>

          {/* Header */}
          <h2 className="text-2xl font-bold tracking-tight text-black">
            {step === "email" && "Lupa Password"}
            {step === "verifikasi" && "Verifikasi Kode"}
            {step === "reset" && "Reset Password"}
          </h2>

          {/* Subtitle */}
          <p className="mt-2 text-sm text-gray-600">
            {step === "email" &&
              "Masukkan email untuk mendapatkan kode verifikasi"}
            {step === "verifikasi" && "Masukkan kode verifikasi 6 digit"}
            {step === "reset" && "Buat password baru untuk akun Anda"}
          </p>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-6">
          {/* Debug Info (Development Only) */}
          {debugCode && step !== "email" && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-blue-800">
                    🧪 Development Mode
                  </p>
                  <p className="text-sm text-blue-600">
                    Kode: <span className="font-bold">{debugCode}</span>
                  </p>
                </div>
                <button
                  onClick={copyDebugCode}
                  className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded"
                >
                  Salin
                </button>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md">
              {success}
            </div>
          )}

          {/* STEP 1: Email Form */}
          {step === "email" && (
            <form onSubmit={handleRequestCode} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-black">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md px-3 py-2 text-black border"
                  placeholder="Masukkan email Anda"
                  required
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading || !email}
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-white font-semibold text-sm hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Mengirim..." : "Kirim Kode Verifikasi"}
              </button>
            </form>
          )}

          {/* STEP 2: Verifikasi Kode Form */}
          {step === "verifikasi" && (
            <form onSubmit={handleVerifyCode} className="space-y-6">
              {/* Email Info */}
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-600">
                  Kode dikirim ke:{" "}
                  <span className="font-semibold text-black">{email}</span>
                </p>
                <button
                  type="button"
                  onClick={() => setStep("email")}
                  className="text-sm text-blue-500 hover:text-blue-700 mt-1"
                >
                  Ganti email
                </button>
              </div>

              {/* Countdown */}
              {countdown > 0 && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md flex justify-between items-center">
                  <span className="text-yellow-700 text-sm">
                    ⏰ Kode berlaku: {formatCountdown()}
                  </span>
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={loading || countdown > 30}
                    className="text-sm text-blue-500 hover:text-blue-700 disabled:text-gray-400"
                  >
                    Kirim ulang
                  </button>
                </div>
              )}

              {/* Code Input */}
              <div>
                <label className="block text-sm font-medium text-black">
                  Kode Verifikasi (6 digit)
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                    setCode(value);
                  }}
                  className="mt-1 block w-full rounded-md px-3 py-2 text-black border text-center text-2xl tracking-widest"
                  placeholder="123456"
                  required
                  disabled={loading}
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep("email")}
                  disabled={loading}
                  className="flex-1 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 disabled:opacity-50"
                >
                  Kembali
                </button>
                <button
                  type="submit"
                  disabled={loading || code.length !== 6}
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-md disabled:opacity-50"
                >
                  {loading ? "Memverifikasi..." : "Verifikasi"}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Reset Form */}
          {step === "reset" && (
            <form onSubmit={handleResetPassword} className="space-y-6">
              {/* Email Info */}
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-600">
                  Reset password untuk:{" "}
                  <span className="font-semibold text-black">{email}</span>
                </p>
              </div>

              {/* Password Inputs */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-black">
                    Password Baru
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1 block w-full rounded-md px-3 py-2 text-black border pr-10"
                      placeholder="Minimal 6 karakter"
                      required
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black">
                    Konfirmasi Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="mt-1 block w-full rounded-md px-3 py-2 text-black border pr-10"
                      placeholder="Ulangi password"
                      required
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? "🙈" : "👁️"}
                    </button>
                  </div>

                  {/* Password Match Indicator */}
                  {confirmPassword.length > 0 && (
                    <div className="mt-2 flex items-center gap-2">
                      {password === confirmPassword ? (
                        <>
                          <svg
                            className="w-4 h-4 text-green-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-sm text-green-600">
                            Password cocok
                          </span>
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-4 h-4 text-red-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-sm text-red-600">
                            Password tidak cocok
                          </span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep("verifikasi")}
                  disabled={loading}
                  className="flex-1 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 disabled:opacity-50"
                >
                  Kembali
                </button>
                <button
                  type="submit"
                  disabled={
                    loading ||
                    password.length < 6 ||
                    password !== confirmPassword
                  }
                  className="flex-1 py-2 bg-green-600 hover:bg-green-500 text-white font-medium rounded-md disabled:opacity-50"
                >
                  {loading ? "Memproses..." : "Reset Password"}
                </button>
              </div>
            </form>
          )}

          {/* Back to Login */}
          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <Link
              href="/login"
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              ← Kembali ke Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
