"use client";

import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();

  return (
    <div className="relative bg-white min-h-screen flex items-center justify-center px-6">
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 text-gray-500 hover:text-gray-800 text-2xl font-light transition"
        aria-label="Kembali"
      >
        ✕
      </button>

      <div className="w-full max-w-sm">
        <img src="/images/Logo.png" className="mx-auto h-20 mb-6" />

        <h2 className="text-center text-2xl font-bold mb-6">
          Masuk ke Akun Anda
        </h2>

        <SignIn
          redirectUrl="/"
          appearance={{
            elements: {
              card: "shadow-none border-none p-5 flex flex-col gap-4",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              footer: "hidden",

              formButtonPrimary: "clerk-button",
              socialButtonsBlockButton:
                "w-full border rounded-md py-2 hover:bg-gray-50",
              dividerText: "text-gray-400",
            },
          }}
        />
      </div>
    </div>
  );
}
