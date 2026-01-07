"use client";

import { useState } from "react";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const daftarMenu = [
    { id: "beranda", label: "Beranda" },
    { id: "fitur", label: "Fitur" },
    { id: "tentang", label: "Tentang" },
    { id: "kontak", label: "Kontak" },
    { id: "testimoni", label: "Testimoni" },
  ];

  const handleKlikMenu = (id: string) => {
    setIsMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed z-50 w-full bg-white shadow">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative h-14 w-36">
            <Image
              src="/images/Logo.png"
              alt="Logo"
              fill
              sizes="144px"
              className="object-contain"
            />
          </Link>

          <nav className="hidden lg:flex gap-6">
            {daftarMenu.map((m) => (
              <button
                key={m.id}
                onClick={() => handleKlikMenu(m.id)}
                className="px-4 py-2 text-gray-700 hover:text-blue-600"
              >
                {m.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <ClerkLoading>
              <Loader className="h-5 w-5 animate-spin" />
            </ClerkLoading>

            <ClerkLoaded>
              <SignedIn>
                <Link href="/learn">
                  <Button variant="primaryAccent">Dashboard</Button>
                </Link>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>

              <SignedOut>
                <SignedOut>
                  <Link href="/sign-in">
                    <Button variant="primaryAccent">Masuk</Button>
                  </Link>

                  <Link href="/sign-up">
                    <Button variant="secondaryAccent">Daftar</Button>
                  </Link>
                </SignedOut>
              </SignedOut>
            </ClerkLoaded>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden rounded border p-2"
          >
            ☰
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden border-t bg-white p-4 space-y-4">
          {daftarMenu.map((m) => (
            <button
              key={m.id}
              onClick={() => handleKlikMenu(m.id)}
              className="px-4 py-2 text-gray-700 hover:text-blue-600"
            >
              {m.label}
            </button>
          ))}

          <ClerkLoaded>
            <SignedIn>
              <Link href="/learn">
                <Button className="w-full" variant="primaryAccent">
                  Dashboard
                </Button>
              </Link>
              <div className="mt-3">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>

            <SignedOut>
              <SignedOut>
                <Link href="/sign-in">
                  <Button variant="primaryAccent">Masuk</Button>
                </Link>

                <Link href="/sign-up">
                  <Button variant="secondaryAccent">Daftar</Button>
                </Link>
              </SignedOut>
            </SignedOut>
          </ClerkLoaded>
        </div>
      )}
    </header>
  );
};

export default Header;
