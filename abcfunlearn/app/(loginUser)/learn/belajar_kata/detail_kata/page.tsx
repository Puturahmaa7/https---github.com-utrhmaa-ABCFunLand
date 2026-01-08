"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

export default function DetailKataPage() {
  const params = useSearchParams();
  const router = useRouter();

  // 🔹 hanya sampai IKAN
  const daftarKata = ["AYAM", "BOLA", "IKAN"];

  const kataParam = params.get("kata")?.toUpperCase() ?? daftarKata[0];
  const indexKata = daftarKata.indexOf(kataParam);

  const [hover, setHover] = useState<string | null>(null);

  const kataSebelumnya =
    indexKata > 0 ? daftarKata[indexKata - 1] : null;

  const kataSelanjutnya =
    indexKata < daftarKata.length - 1
      ? daftarKata[indexKata + 1]
      : null;

  const pindahKata = (k: string) => {
    router.push(`/learn/belajar_kata/detail_kata?kata=${k}`);
  };

  // 🔊 audio lokal berdasarkan kata
  const playAudio = () => {
    const audioPath = `/suaraKata/${kataParam.toLowerCase()}.mp3`;
    const audio = new Audio(audioPath);
    audio.play();
  };

  return (
    <div
      style={{
        marginTop: "30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "28px",
      }}
    >
      {/* PANAH + GAMBAR */}
      <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
        {/* PANAH KIRI */}
        {kataSebelumnya ? (
          <button
            onClick={() => pindahKata(kataSebelumnya)}
            onMouseEnter={() => setHover("left")}
            onMouseLeave={() => setHover(null)}
            style={{
              ...panahStyle,
              transform: hover === "left" ? "scale(1.15)" : "scale(1)",
            }}
          >
            ◀
          </button>
        ) : (
          <div style={{ width: "64px" }} />
        )}

        {/* GAMBAR KATA */}
        <div
          style={{
            width: "320px",
            height: "220px",
            borderRadius: "36px",
            backgroundColor: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
          }}
        >
          <Image
            src={`/kata/${kataParam.toLowerCase()}.png`}
            alt={`Kata ${kataParam}`}
            width={220}
            height={180}
            style={{ objectFit: "contain" }}
            priority
          />
        </div>

        {/* PANAH KANAN */}
        {kataSelanjutnya ? (
          <button
            onClick={() => pindahKata(kataSelanjutnya)}
            onMouseEnter={() => setHover("right")}
            onMouseLeave={() => setHover(null)}
            style={{
              ...panahStyle,
              transform: hover === "right" ? "scale(1.15)" : "scale(1)",
            }}
          >
            ▶
          </button>
        ) : (
          <div style={{ width: "64px" }} />
        )}
      </div>

      {/* TEKS KATA */}
      <div
        style={{
          fontFamily: "var(--font-baloo)",
          fontSize: "48px",
          fontWeight: "800",
          color: "#1976D2",
        }}
      >
        {kataParam}
      </div>

      {/* TOMBOL SUARA */}
      <button
        onClick={playAudio}
        onMouseEnter={() => setHover("sound")}
        onMouseLeave={() => setHover(null)}
        style={{
          fontSize: "52px",
          backgroundColor: hover === "sound" ? "#FFEB3B" : "#FFD54F",
          border: "none",
          borderRadius: "50%",
          width: "80px",
          height: "80px",
          cursor: "pointer",
          boxShadow:
            hover === "sound"
              ? "0 0 25px rgba(255, 235, 59, 0.9)"
              : "0 6px 14px rgba(0,0,0,0.2)",
          transform:
            hover === "sound"
              ? "scale(1.25) rotate(-5deg)"
              : "scale(1)",
          transition: "all 0.2s ease",
        }}
        aria-label="Putar suara"
      >
        🔊
      </button>
    </div>
  );
}

const panahStyle: React.CSSProperties = {
  width: "64px",
  height: "64px",
  borderRadius: "50%",
  backgroundColor: "#4FC3F7",
  color: "#fff",
  fontSize: "26px",
  border: "none",
  cursor: "pointer",
  boxShadow: "0 6px 14px rgba(0,0,0,0.25)",
  transition: "0.2s",
};
