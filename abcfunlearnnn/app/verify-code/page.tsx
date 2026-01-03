"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyCodePage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (!res.ok || !data.success)
        throw new Error(data.message || "Kode salah");

      // Redirect ke reset password dengan query email
      router.push(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      setError(err.message || "Gagal verifikasi kode");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-black text-center mb-4">
          Verifikasi Kode
        </h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Masukkan email dan kode verifikasi yang dikirim
        </p>

        {error && (
          <p className="mb-4 p-2 bg-red-50 text-red-600 rounded">{error}</p>
        )}

        <form onSubmit={handleVerifyCode} className="space-y-4">
          <input
            type="email"
            placeholder="Email Anda"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <input
            type="text"
            placeholder="Kode 6 digit"
            value={code}
            onChange={(e) =>
              setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
            }
            required
            className="w-full px-3 py-2 border rounded-md text-center text-lg tracking-widest focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || code.length !== 6 || !email}
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Verifikasi Kode"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Kembali ke{" "}
          <a href="/login" className="text-blue-500 hover:text-blue-700">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
