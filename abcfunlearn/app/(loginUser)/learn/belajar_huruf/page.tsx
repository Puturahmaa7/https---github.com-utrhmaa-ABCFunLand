"use client";

import Link from "next/link";
import { useState } from "react";

export default function BelajarHurufPage() {
  const huruf = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  const [hovered, setHovered] = useState<string | null>(null);

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
            onMouseEnter={() => setHovered(h)}
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
              fontSize: "56px",
              fontWeight: "800",
              color: "#1B5E20",

              cursor: "pointer",
              userSelect: "none",

              /* HOVER (ROVER) */
              transform: hovered === h ? "scale(1.12)" : "scale(1)",
              boxShadow:
                hovered === h
                  ? "0 14px 28px rgba(0,0,0,0.25)"
                  : "0 6px 12px rgba(0,0,0,0.15)",

              transition: "all 0.25s ease",
            }}
          >
            {h}
          </div>
        </Link>
      ))}
    </div>
  );
}
