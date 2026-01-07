"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function DetailSukuKataPage() {
  const params = useSearchParams();
  const router = useRouter();

  // Daftar suku kata
  const sukuKataList = ["BA", "BI", "BU", "BE", "BO"];
  const current = params.get("suku")?.toUpperCase() ?? "BA";

  const currentIndex = sukuKataList.indexOf(current);

  const sukuSebelumnya =
    currentIndex > 0 ? sukuKataList[currentIndex - 1] : null;
  const sukuSelanjutnya =
    currentIndex < sukuKataList.length - 1
      ? sukuKataList[currentIndex + 1]
      : null;

  // Fungsi pindah suku kata ke halaman baru di folder belajar_suku_kata
  const pindahSuku = (s: string) => {
    router.push(/learn/belajar_suku_kata/detail_suku_kata?suku=${s});
  };

  // Fungsi mainkan audio dari folder masing-masing suku kata
  const playAudio = (s: string) => {
    // Pastikan audio ada di public/audio/<suku>/<suku>.mp3
    const audioPath = /audio/${s.toLowerCase()}/${s.toLowerCase()}.mp3;
    const audio = new Audio(audioPath);
    audio.play();
  };


  return (
    <div
      style={{
        marginTop: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "30px",
      }}
    >
      {/* PANAH + SUKU KATA */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "40px",
        }}
      >
        {/* PANAH KIRI */}
        {sukuSebelumnya ? (
          <button onClick={() => pindahSuku(sukuSebelumnya)} style={panahStyle}>
            ◀
          </button>
        ) : (
          <div style={{ width: "70px" }} />
        )}

        {/* SUKU KATA */}
        <div
          style={{
            backgroundColor: "#7ED957",
            width: "320px",
            height: "200px",
            borderRadius: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "80px",
            fontWeight: "800",
            userSelect: "none",
          }}
        >
          {current}
        </div>

        {/* PANAH KANAN */}
        {sukuSelanjutnya ? (
          <button onClick={() => pindahSuku(sukuSelanjutnya)} style={panahStyle}>
            ▶
          </button>
        ) : (
          <div style={{ width: "70px" }} />
        )}
      </div>

      {/* TOMBOL SUARA */}
      <button
        onClick={() => playAudio(current)}
        style={{
          fontSize: "48px",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        🔊
      </button>
    </div>
  );
}

const panahStyle: React.CSSProperties = {
  width: "70px",
  height: "70px",
  borderRadius: "50%",
  backgroundColor: "#666",
  color: "#fff",
  fontSize: "28px",
  border: "none",
  cursor: "pointer",
};