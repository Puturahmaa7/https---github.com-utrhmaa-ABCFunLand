"use client";

import Link from "next/link";
import { useState } from "react";

export default function BelajarSukuKataPage() {
  const sukuKata = ["BA", "BI", "BU", "BE", "BO"];

  const [hovered, setHovered] = useState<string | null>(null);

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
          href={`/learn/belajar_suku_kata/detail_suku_kata?suku=${s}`}
          style={{ textDecoration: "none" }}
        >
          <div
            onMouseEnter={() => setHovered(s)}
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
              fontSize: "52px",
              fontWeight: "800",
              color: "#1B5E20",

              cursor: "pointer",
              userSelect: "none",

              /* HOVER (ROVER) */
              transform: hovered === s ? "scale(1.12)" : "scale(1)",
              boxShadow:
                hovered === s
                  ? "0 14px 28px rgba(0,0,0,0.25)"
                  : "0 6px 12px rgba(0,0,0,0.15)",

              transition: "all 0.25s ease",
            }}
          >
            {s}
          </div>
        </Link>
      ))}
    </div>
  );
}
