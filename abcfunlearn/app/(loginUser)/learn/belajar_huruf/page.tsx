"use client";

import Link from "next/link";

export default function BelajarHurufPage() {
  const huruf = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "24px",
      }}
    >
      {huruf.map((h) => (
        <Link
          key={h}
          href={`/learn/belajar_huruf/detail_huruf?huruf=${h}`}
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
            {h}
          </div>
        </Link>
      ))}
    </div>
  );
}
