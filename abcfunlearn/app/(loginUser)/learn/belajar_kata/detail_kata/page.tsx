"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function DetailKataPage() {
  const params = useSearchParams();
  const router = useRouter();

  // DAFTAR KATA (URUTAN PENTING)
  const daftarKata = [
    "AYAM",
    "BOLA",
    "CERI",
    "DOMBA",
    "ELANG",
    "IKAN",
    "JERUK",
    "KUCING",
    "SAPI",
    "ZEBRA",
  ];

  const kataParam = params.get("kata")?.toUpperCase() ?? daftarKata[0];
  const indexKata = daftarKata.indexOf(kataParam);

  const kataSebelumnya =
    indexKata > 0 ? daftarKata[indexKata - 1] : null;

  const kataSelanjutnya =
    indexKata < daftarKata.length - 1
      ? daftarKata[indexKata + 1]
      : null;

  const pindahKata = (k: string) => {
    router.push(`/learn/belajar_kata/detail_kata?kata=${k}`);
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
      {/* PANAH + KATA */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "40px",
        }}
      >
        {/* PANAH KIRI */}
        {kataSebelumnya ? (
          <button onClick={() => pindahKata(kataSebelumnya)} style={panahStyle}>
            ◀
          </button>
        ) : (
          <div style={{ width: "70px" }} />
        )}

        {/* KATA BESAR */}
        <div
          style={{
            backgroundColor: "#7ED957",
            width: "360px",
            height: "200px",
            borderRadius: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "56px",
            fontWeight: "800",
            userSelect: "none",
            textAlign: "center",
          }}
        >
          {kataParam}
        </div>

        {/* PANAH KANAN */}
        {kataSelanjutnya ? (
          <button onClick={() => pindahKata(kataSelanjutnya)} style={panahStyle}>
            ▶
          </button>
        ) : (
          <div style={{ width: "70px" }} />
        )}
      </div>

      {/* TOMBOL SUARA */}
      <button
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
