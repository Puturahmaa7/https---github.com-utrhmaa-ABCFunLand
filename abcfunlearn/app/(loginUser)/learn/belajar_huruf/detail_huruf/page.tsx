"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

export default function DetailHurufPage() {
  const params = useSearchParams();
  const router = useRouter();

  const huruf = params.get("huruf")?.toUpperCase() ?? "A";
  const kodeHuruf = huruf.charCodeAt(0);

  const [hover, setHover] = useState<string | null>(null);

  const hurufSebelumnya =
    kodeHuruf > 65 ? String.fromCharCode(kodeHuruf - 1) : null;
  const hurufSelanjutnya =
    kodeHuruf < 90 ? String.fromCharCode(kodeHuruf + 1) : null;

  const pindahHuruf = (h: string) => {
    router.push(`/learn/belajar_huruf/detail_huruf?huruf=${h}`);
  };

  // 🔊 audio lokal berdasarkan huruf
  const playAudio = () => {
    const audioPath = `/suaraHuruf/${huruf.toLowerCase()}.mp3`;
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
        {hurufSebelumnya ? (
          <button
            onClick={() => pindahHuruf(hurufSebelumnya)}
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

        {/* GAMBAR HURUF */}
        <div
          style={{
            width: "300px",
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
            src={`/huruf/${huruf}.png`}
            alt={`Huruf ${huruf}`}
            width={200}
            height={200}
            style={{ objectFit: "contain" }}
            priority
          />
        </div>

        {/* PANAH KANAN */}
        {hurufSelanjutnya ? (
          <button
            onClick={() => pindahHuruf(hurufSelanjutnya)}
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

      {/* TEKS */}
      <div
        style={{
          fontFamily: "var(--font-baloo)",
          fontSize: "48px",
          fontWeight: "800",
          color: "#1976D2",
        }}
      >
        Huruf {huruf}
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
