"use client";

import Link from "next/link";

export default function BelajarKataPage() {
  // Contoh kata sederhana untuk anak
  const kata = [
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

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "24px",
      }}
    >
      {kata.map((k) => (
        <Link
          key={k}
          href={`/learn/belajar_kata/detail_kata?kata=${k}`}
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
              fontSize: "36px",
              fontWeight: "800",
              color: "#000",
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            {k}
          </div>
        </Link>
      ))}
    </div>
  );
}
