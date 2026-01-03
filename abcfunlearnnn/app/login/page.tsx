"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const remember = formData.get("remember") === "on";
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Email atau password salah");
      return;
    }

    router.push("/");
    router.refresh(); // 🔥 penting biar header update
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
            Masuk ke Akun Anda
          </h2>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-black">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="Masukkan email Anda"
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
                placeholder="Masukkan password Anda"
                className="mt-1 block w-full rounded-md px-3 py-2 text-black border"
              />
            </div>

            <div className="flex items-center justify-between">
              <a href="/forgot-password" className="text-sm text-blue-500">
                Lupa password?
              </a>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-white font-semibold text-sm hover:bg-blue-500"
            >
              Masuk
            </button>
          </form>

          <p className="mt-6 text-center text-sm">
            Belum punya akun?{" "}
            <a href="/register" className="font-semibold text-blue-500">
              Daftar sekarang
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
