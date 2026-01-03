"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";

function Header() {
  const { data: session, status } = useSession();
  const isLogin = status === "authenticated";

  const [isMenuTerbuka, setIsMenuTerbuka] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const daftarMenu = [
    { id: "beranda", label: "Beranda" },
    { id: "fitur", label: "Fitur" },
    { id: "tentang", label: "Tentang" },
    { id: "kontak", label: "Kontak" },
    { id: "testimoni", label: "Testimoni" },
  ];

  const handleKlikMenu = (id: string) => {
    setIsMenuTerbuka(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed w-full z-50 ${
        isScrolled ? "bg-white shadow" : "bg-white"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-20 items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="relative w-36 h-14">
            <Image
              src="/images/Logo.png"
              alt="Logo"
              fill
              className="object-contain"
            />
          </Link>

          {/* MENU DESKTOP */}
          <div className="hidden lg:flex gap-4">
            {daftarMenu.map((m) => (
              <button
                key={m.id}
                onClick={() => handleKlikMenu(m.id)}
                className="px-4 py-2 text-gray-700 hover:text-blue-600"
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* AUTH DESKTOP */}
          <div className="hidden lg:flex items-center gap-3">
            {isLogin ? (
              <>
                <span className="text-sm text-gray-700">
                  Halo, <b>{session?.user?.name}</b>
                </span>

                <Link href="/learn">
                  <Button variant="primaryAccent">Dashboard</Button>
                </Link>

                <Button
                  variant="secondaryAccent"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="primaryAccent">Masuk</Button>
                </Link>
                <Link href="/register">
                  <Button variant="secondaryAccent">Daftar</Button>
                </Link>
              </>
            )}
          </div>

          {/* TOGGLE MOBILE */}
          <button
            onClick={() => setIsMenuTerbuka(!isMenuTerbuka)}
            className="lg:hidden p-2 border rounded"
          >
            ☰
          </button>
        </div>
      </div>

      {/* MENU MOBILE */}
      {isMenuTerbuka && (
        <div className="lg:hidden bg-white border-t p-4 space-y-4">
          {daftarMenu.map((m) => (
            <button
              key={m.id}
              onClick={() => handleKlikMenu(m.id)}
              className="block w-full text-left"
            >
              {m.label}
            </button>
          ))}

          {isLogin ? (
            <>
              <p className="text-sm text-gray-700 font-medium">
                Halo, {session?.user?.name}
              </p>

              <Link href="/learn">
                <Button variant="primaryAccent" className="w-full mt-3">
                  Dashboard
                </Button>
              </Link>

              <Button
                variant="secondaryAccent"
                className="w-full mt-2"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="primaryAccent" className="w-full mt-3">
                  Masuk
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="secondaryAccent" className="w-full mt-2">
                  Daftar
                </Button>
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
