"use client";

import { useRouter } from "next/navigation";

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          backgroundColor: "#7ED957",
          margin: "20px",
          padding: "20px",
          borderRadius: "40px",
          display: "flex",
          alignItems: "center",
          gap: "20px",
          flexShrink: 0,
        }}
      >
        {/* TOMBOL KEMBALI */}
        <button
          onClick={() => router.push("/learn")}
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            backgroundColor: "#666",
            color: "#fff",
            fontSize: "24px",
            border: "none",
            cursor: "pointer",
          }}
        >
          ◀
        </button>

        {/* JUDUL */}
        <div
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: "36px",
            fontWeight: "800",
          }}
        >
          Belajar
        </div>

        {/* SPACER biar judul tetap tengah */}
        <div style={{ width: "56px" }} />
      </div>

      {/* CONTENT */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px",
        }}
      >
        {children}
      </div>
    </div>
  );
}
