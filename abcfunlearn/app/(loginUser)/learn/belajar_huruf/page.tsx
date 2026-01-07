"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BelajarHurufPage() {
  const router = useRouter();

  const huruf = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  return (
    <>
      {/* GRID HURUF */}
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

      {/* TOMBOL KEMBALI */}
      <button
        onClick={() => router.push("/learn")}
        style={{
          position: "fixed",
          left: "20px",
          bottom: "20px",
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          backgroundColor: "#666",
          color: "#fff",
          fontSize: "28px",
          border: "none",
          cursor: "pointer",
          zIndex: 9999, 
        }}
      >
        ◀
      </button>
    </>
  );
}
