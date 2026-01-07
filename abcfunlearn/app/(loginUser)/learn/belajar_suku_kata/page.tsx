"use client";

import Link from "next/link";

export default function BelajarSukuKataPage() {
  const sukuKata = ["BA", "BI", "BU", "BE", "BO"];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "24px",
      }}
    >
      {sukuKata.map((s) => (
        <Link
          key={s}
          href={'/learn/belajar_suku_kata/detail_suku_kata?suku=${s}'}
          style={{ textDecoration: "none" }}
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
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            {s}
          </div>
        </Link>
      ))}
    </div>
  );
}