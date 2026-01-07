"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

export default function LearnPage() {
  const router = useRouter();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        gap: "60px",
      }}
    >
      {/* BELAJAR HURUF */}
      <div
        onClick={() => router.push("/learn/belajar_huruf")}
        onMouseEnter={() => setHovered("huruf")}
        onMouseLeave={() => setHovered(null)}
        style={{
          ...cardStyle,
          transform: hovered === "huruf" ? "scale(1.08)" : "scale(1)",
          boxShadow:
            hovered === "huruf"
              ? "0 16px 30px rgba(0,0,0,0.25)"
              : "0 8px 16px rgba(0,0,0,0.15)",
        }}
      >
        <Image
          src="/images/belajar_huruf.png"
          alt="Belajar Huruf"
          fill
          style={{ objectFit: "cover", borderRadius: "40px" }}
        />
      </div>

      {/* BELAJAR SUKU KATA */}
      <div
        onClick={() => router.push("/learn/belajar_suku_kata")}
        onMouseEnter={() => setHovered("suku")}
        onMouseLeave={() => setHovered(null)}
        style={{
          ...cardStyle,
          transform: hovered === "suku" ? "scale(1.08)" : "scale(1)",
          boxShadow:
            hovered === "suku"
              ? "0 16px 30px rgba(0,0,0,0.25)"
              : "0 8px 16px rgba(0,0,0,0.15)",
        }}
      >
        <Image
          src="/images/belajar_suku_kata.png"
          alt="Belajar Suku Kata"
          fill
          style={{ objectFit: "cover", borderRadius: "40px" }}
        />
      </div>

      {/* BELAJAR KATA */}
      <div
        onClick={() => router.push("/learn/belajar_kata")}
        onMouseEnter={() => setHovered("kata")}
        onMouseLeave={() => setHovered(null)}
        style={{
          ...cardStyle,
          transform: hovered === "kata" ? "scale(1.08)" : "scale(1)",
          boxShadow:
            hovered === "kata"
              ? "0 16px 30px rgba(0,0,0,0.25)"
              : "0 8px 16px rgba(0,0,0,0.15)",
        }}
      >
        <Image
          src="/images/belajar_kata.png"
          alt="Belajar Kata"
          fill
          style={{ objectFit: "cover", borderRadius: "40px" }}
        />
      </div>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  width: "280px",
  height: "240px",
  borderRadius: "40px",
  cursor: "pointer",
  position: "relative",
  overflow: "hidden",
  transition: "transform 0.25s ease, box-shadow 0.25s ease",
};
