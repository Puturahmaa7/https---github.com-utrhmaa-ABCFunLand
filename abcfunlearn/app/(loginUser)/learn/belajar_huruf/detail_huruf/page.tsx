"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";

export default function DetailHurufPage() {
  const params = useSearchParams();
  const router = useRouter();

  const huruf = params.get("huruf")?.toUpperCase() ?? "A";
  const kodeHuruf = huruf.charCodeAt(0);

  const hurufSebelumnya =
    kodeHuruf > 65 ? String.fromCharCode(kodeHuruf - 1) : null;

  const hurufSelanjutnya =
    kodeHuruf < 90 ? String.fromCharCode(kodeHuruf + 1) : null;

  const pindahHuruf = (h: string) => {
    router.push(`/learn/belajar_huruf/detail_huruf?huruf=${h}`);
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
      {/* PANAH + GAMBAR HURUF */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "32px",
        }}
      >
        {/* PANAH KIRI */}
        {hurufSebelumnya ? (
          <button onClick={() => pindahHuruf(hurufSebelumnya)} style={panahStyle}>
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
          <button onClick={() => pindahHuruf(hurufSelanjutnya)} style={panahStyle}>
            ▶
          </button>
        ) : (
          <div style={{ width: "64px" }} />
        )}
      </div>

      {/* TEKS HURUF */}
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
        style={{
          fontSize: "52px",
          backgroundColor: "#FFD54F",
          border: "none",
          borderRadius: "50%",
          width: "80px",
          height: "80px",
          cursor: "pointer",
          boxShadow: "0 6px 14px rgba(0,0,0,0.2)",
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
  backgroundColor: "#4FC3F7", // biru cerah
  color: "#fff",
  fontSize: "26px",
  border: "none",
  cursor: "pointer",
  boxShadow: "0 6px 14px rgba(0,0,0,0.25)",
};
