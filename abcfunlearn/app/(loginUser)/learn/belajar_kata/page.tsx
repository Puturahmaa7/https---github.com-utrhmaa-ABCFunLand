"use client";

import Link from "next/link";
import { useState } from "react";

export default function BelajarKataPage() {
  // sesuai permintaan: sampai IKAN
  const kata = ["AYAM", "BOLA", "CERI", "DOMBA", "ELANG", "IKAN"];

  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
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
            onMouseEnter={() => setHovered(k)}
            onMouseLeave={() => setHovered(null)}
            style={{
              backgroundColor: "#7ED957",
              height: "120px",
              borderRadius: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              /* FONT ANAK-ANAK */
              fontFamily: "var(--font-baloo)",
              fontSize: "44px",
              fontWeight: "800",
              color: "#1B5E20",

              cursor: "pointer",
              userSelect: "none",

              /* HOVER */
              transform: hovered === k ? "scale(1.12)" : "scale(1)",
              boxShadow:
                hovered === k
                  ? "0 14px 28px rgba(0,0,0,0.25)"
                  : "0 6px 12px rgba(0,0,0,0.15)",

              transition: "all 0.25s ease",
            }}
          >
            {k}
          </div>
        </Link>
      ))}
    </div>
  );
}
