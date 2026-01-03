"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";
  const verificationCode = searchParams.get("code") || "";

  const [code, setCode] = useState(verificationCode);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Validasi email dan kode di query parameter
  useEffect(() => {
    if (!email || !verificationCode) {
      router.push("/forgot-password");
    }
  }, [email, verificationCode, router]);

  // Hitung kekuatan password
  useEffect(() => {
    if (password.length === 0) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;

    // Minimal 6 karakter
    if (password.length >= 6) strength += 25;

    // Mengandung huruf kecil
    if (/[a-z]/.test(password)) strength += 25;

    // Mengandung huruf besar
    if (/[A-Z]/.test(password)) strength += 25;

    // Mengandung angka atau simbol
    if (/[0-9!@#$%^&*]/.test(password)) strength += 25;

    setPasswordStrength(strength);
  }, [password]);

  // Format indikator kekuatan password
  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return "Masukkan password";
    if (passwordStrength <= 25) return "Lemah";
    if (passwordStrength <= 50) return "Cukup";
    if (passwordStrength <= 75) return "Baik";
    return "Sangat Kuat";
  };

  // Format warna indikator
  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 25) return "bg-red-500";
    if (passwordStrength <= 50) return "bg-yellow-500";
    if (passwordStrength <= 75) return "bg-blue-500";
    return "bg-green-500";
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Validasi
      if (code.length !== 6) {
        throw new Error("Kode harus 6 digit");
      }

      if (password !== confirmPassword) {
        throw new Error("Password tidak cocok");
      }

      if (password.length < 6) {
        throw new Error("Password minimal 6 karakter");
      }

      // Simulasi API call untuk development
      if (process.env.NODE_ENV === "development") {
        console.log("🧪 Development Mode - Password Reset");
        console.log("Email:", email);
        console.log("Code:", code);
        console.log("New Password:", password);

        // Simulasi delay API
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setSuccess(
          "Password berhasil direset! Mengalihkan ke halaman login..."
        );

        // Redirect setelah 2 detik
        setTimeout(() => {
          router.push("/login");
        }, 2000);

        setLoading(false);
        return;
      }

      // Normal API call untuk production
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          code,
          newPassword: password,
          confirmPassword,
        }),
      });

      const text = await res.text();

      if (!text) {
        throw new Error("Empty response from server");
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Invalid server response");
      }

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Gagal reset password");
      }

      // Success
      setSuccess("Password berhasil direset! Mengalihkan...");

      // Redirect setelah 2 detik
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      const errorMessage = err.message || "Gagal reset password";

      // Error handling khusus
      if (
        errorMessage.toLowerCase().includes("expired") ||
        errorMessage.toLowerCase().includes("kadaluarsa")
      ) {
        setError("Kode verifikasi telah kadaluarsa. Silakan minta kode baru.");
      } else if (
        errorMessage.toLowerCase().includes("invalid") ||
        errorMessage.toLowerCase().includes("salah")
      ) {
        setError("Kode verifikasi tidak valid. Silakan periksa kembali.");
      } else {
        setError(errorMessage);
      }

      console.error("Reset password error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Tombol kembali ke verifikasi
  const handleBackToVerification = () => {
    router.push(`/verify-reset-code?email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="bg-white">
      <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
          {/* Tombol Kembali */}
          <button
            onClick={handleBackToVerification}
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

          {/* Header */}
          <h2 className="mt-6 text-2xl font-bold tracking-tight text-black">
            Reset Password
          </h2>

          {/* Subtitle */}
          <p className="mt-2 text-sm text-gray-600">
            Buat password baru untuk akun Anda
          </p>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-6">
          {/* Info Akun */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Reset password untuk</p>
                <p className="font-semibold text-black truncate">{email}</p>
              </div>
              <button
                onClick={handleBackToVerification}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Ubah email
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 text-red-700">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 text-green-700">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="font-medium">{success}</p>
              </div>
            </div>
          )}

          {/* Reset Password Form */}
          <form onSubmit={handleResetPassword} className="space-y-6">
            {/* Kode Verifikasi */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Kode Verifikasi
              </label>
              <div className="flex gap-2">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className={`w-12 h-12 flex items-center justify-center border-2 rounded-lg text-xl font-bold ${
                      code[index]
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 bg-white text-gray-400"
                    }`}
                  >
                    {code[index] || "•"}
                  </div>
                ))}
              </div>
              <input
                type="text"
                value={code}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                  setCode(value);
                }}
                className="sr-only"
                required
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-2">
                Kode 6 digit yang telah dikirim ke email Anda
              </p>
            </div>

            {/* Password Baru */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
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

              {/* Password Strength Indicator */}
              {password.length > 0 && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">Kekuatan password:</span>
                    <span
                      className={`font-medium ${
                        passwordStrength <= 25
                          ? "text-red-600"
                          : passwordStrength <= 50
                          ? "text-yellow-600"
                          : passwordStrength <= 75
                          ? "text-blue-600"
                          : "text-green-600"
                      }`}
                    >
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
                      style={{ width: `${passwordStrength}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Konfirmasi Password */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Konfirmasi Password Baru
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md px-3 py-2 text-black border pr-10"
                  placeholder="Ulangi password baru"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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

            {/* Tips Password */}
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-medium text-blue-800 mb-1">
                Tips Password Aman:
              </p>
              <ul className="text-xs text-blue-600 space-y-1">
                <li className="flex items-center gap-2">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      password.length >= 6 ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                  Minimal 6 karakter
                </li>
                <li className="flex items-center gap-2">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      /[a-z]/.test(password) ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                  Mengandung huruf kecil
                </li>
                <li className="flex items-center gap-2">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      /[A-Z]/.test(password) ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                  Mengandung huruf besar
                </li>
                <li className="flex items-center gap-2">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      /[0-9!@#$%^&*]/.test(password)
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  />
                  Mengandung angka atau simbol
                </li>
              </ul>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={
                loading ||
                code.length !== 6 ||
                password.length < 6 ||
                password !== confirmPassword
              }
              className={`w-full py-3 font-medium rounded-lg transition ${
                code.length === 6 &&
                password.length >= 6 &&
                password === confirmPassword &&
                !loading
                  ? "bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white shadow-lg"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Memproses...
                </span>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>

          {/* Back to Verification */}
          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <button
              onClick={handleBackToVerification}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Kembali ke Verifikasi Kode
            </button>
          </div>

          {/* Back to Login */}
          <div className="mt-4 text-center">
            <Link
              href="/login"
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              ← Kembali ke Halaman Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
