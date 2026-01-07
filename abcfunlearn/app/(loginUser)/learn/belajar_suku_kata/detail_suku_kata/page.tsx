"use client";

import { useRouter } from "next/navigation";

export default function BelajarSukuKataPage() {
  const router = useRouter();

  const sukuKataList = ["BA", "BI", "BU", "BE", "BO"];

  return (
    <div
      style={{
        paddingTop: "32px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* JUDUL */}
      <div
        style={{
          backgroundColor: "#7ED957",
          width: "90%",
          maxWidth: "900px",
          height: "70px",
          borderRadius: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "28px",
          fontWeight: "700",
          marginBottom: "48px",
        }}
      >
        Belajar Suku Kata
      </div>

      {/* DAFTAR SUKU KATA VARIATIF */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: "24px",
          width: "90%",
          maxWidth: "800px",
        }}
      >
        {sukuKataList.map((suku, index) => (
          <button
            key={suku}
            onClick={() =>
              router.push(
                `/learn/belajar_suku_kata/detail_suku_kata?suku=${suku}`
              )
            }
            style={{
              backgroundColor: "#7ED957",
              height: "90px",
              borderRadius: "24px",
              fontSize: "32px",
              fontWeight: "700",
              border: "none",
              cursor: "pointer",
              userSelect: "none",

              // ✨ VARIASI POSISI
              transform:
                index % 2 === 0 ? "translateY(-8px)" : "translateY(8px)",
            }}
          >
            {suku}
          </button>
        ))}
      </div>
    </div>
  );
}
