"use client";

import Link from "next/link";

export default function BelajarSukuKataPae() {
  const sukuKata = ["BA", "BI", "BU", "BE", "BO"];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "24px",
        maxWidth: "720px",
        margin: "40px auto",
      }}
    >
      {sukuKata.map((s, index) => (
        <Link
          key={s}
          href={`/learn/belajar_suku_kata/detail_suku_kata?suku=${s}`}
          style={{
            textDecoration: "none",

            // 🎯 POSISI BARIS KE-2
            gridColumn:
              index === 3 ? "2 / 3" : // BE di tengah
              index === 4 ? "3 / 4" : // BO di kanan
              "auto",
          }}
        >
          <div
            style={{
              backgroundColor: "#7ED957",
              height: "120px",
              borderRadius: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "52px",
              fontWeight: "800",
              color: "#000",
              userSelect: "none",
              cursor: "pointer",
            }}
          >
            {s}
          </div>
        </Link>
      ))}
    </div>
  );
}
