"use client";

import { useSearchParams, useRouter } from "next/navigation";

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
        marginTop: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "30px",
      }}
    >
      {/* PANAH + HURUF */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "40px",
        }}
      >
        {/* PANAH KIRI */}
        {hurufSebelumnya ? (
          <button onClick={() => pindahHuruf(hurufSebelumnya)} style={panahStyle}>
            ◀
          </button>
        ) : (
          <div style={{ width: "70px" }} />
        )}

        {/* HURUF BESAR */}
        <div
          style={{
            backgroundColor: "#7ED957",
            width: "320px",
            height: "200px",
            borderRadius: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "120px",
            fontWeight: "800",
            userSelect: "none",
          }}
        >
          {huruf}
        </div>

        {/* PANAH KANAN */}
        {hurufSelanjutnya ? (
          <button onClick={() => pindahHuruf(hurufSelanjutnya)} style={panahStyle}>
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
