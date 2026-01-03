"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const password_confirmation = formData.get("password_confirmation");

    if (password !== password_confirmation) {
      setError("Konfirmasi password tidak cocok");
      setLoading(false);
      return;
    }

    // 1️⃣ REGISTER KE DB
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data?.message || "Registrasi gagal");
      setLoading(false);
      return;
    }

    // 2️⃣ AUTO LOGIN VIA NEXTAUTH
    const login = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (login?.error) {
      router.push("/login");
      return;
    }

    // 3️⃣ MASUK APLIKASI
    router.push("/learn");
    router.refresh();
  }

  return (
    <div className="bg-white">
      <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
          <button
            onClick={() => router.back()}
            className="absolute top-4 left-4 text-2xl font-bold text-black hover:text-gray-600"
            aria-label="Kembali"
          >
            ×
          </button>

          <img
            src="/images/Logo.png"
            alt="Logo"
            className="mx-auto h-20 w-auto"
          />
          <h2 className="mt-6 text-2xl font-bold tracking-tight text-black">
            Buat Akun Baru
          </h2>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-black">
                Nama Lengkap
              </label>
              <input
                name="name"
                type="text"
                required
                className="mt-1 block w-full rounded-md px-3 py-2 text-black border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                className="mt-1 block w-full rounded-md px-3 py-2 text-black border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                className="mt-1 block w-full rounded-md px-3 py-2 text-black border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black">
                Konfirmasi Password
              </label>
              <input
                name="password_confirmation"
                type="password"
                required
                className="mt-1 block w-full rounded-md px-3 py-2 text-black border"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-white font-semibold text-sm hover:bg-blue-500 disabled:opacity-60"
            >
              {loading ? "Memproses..." : "Daftar"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm">
            Sudah punya akun?{" "}
            <a href="/login" className="font-semibold text-blue-500">
              Masuk di sini
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
