"use client";

import { SignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  return (
    <div className="relative bg-white min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 text-gray-500 hover:text-gray-800 text-2xl font-light transition"
        aria-label="Kembali"
      >
        ✕
      </button>

      <div className="w-full max-w-md">
        {/* Logo & Judul */}
        <div className="flex flex-col items-center mb-8">
          <img
            src="/images/Logo.png"
            alt="ABC Fun Learn"
            className="h-24 w-auto mb-4"
          />
          <h2 className="text-center text-3xl font-bold">Buat Akun Baru</h2>
        </div>

        <SignUp
          redirectUrl="/"
          appearance={{
            elements: {
              card: "shadow-none border-none p-5 flex flex-col gap-4",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              footer: "hidden",
              formButtonPrimary: "clerk-button",
            },
          }}
        />
      </div>
    </div>
  );
}
