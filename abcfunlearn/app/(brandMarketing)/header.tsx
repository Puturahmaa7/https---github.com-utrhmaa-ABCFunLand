"use client";

import { useState } from "react";
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { links } from "@/config";
import { cn } from "@/lib/utils";

export const Header = () => {
  const { isSignedIn } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hideBanner, setHideBanner] = useState(false);

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
              className="object-contain"
            />
          </Link>

          {/* Menu Desktop */}
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

          {/* Auth Desktop */}
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
                <SignInButton mode="modal">
                  <Button variant="primaryAccent">Masuk</Button>
                </SignInButton>
                <Link href="/register">
                  <Button variant="secondaryAccent">Daftar</Button>
                </Link>
              </SignedOut>
            </ClerkLoaded>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden rounded border p-2"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
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
              <SignInButton mode="modal">
                <Button className="w-full" variant="primaryAccent">
                  Masuk
                </Button>
              </SignInButton>
              <Link href="/register">
                <Button className="mt-2 w-full" variant="secondaryAccent">
                  Daftar
                </Button>
              </Link>
            </SignedOut>
          </ClerkLoaded>
        </div>
      )}
    </header>
  );
};

export default Header;
