"use client";

import { useRouter, usePathname } from "next/navigation";

export default function LearnSukuKataLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleBack = () => {
    const segments = pathname.split("/").filter(Boolean);

    // kalau sudah di /learn → jangan ke mana-mana
    if (segments.length <= 1) return;

    // naik 1 folder
    const targetPath = "/" + segments.slice(0, -1).join("/");
    router.push(targetPath);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#EAF6FF", // biru muda
      }}
    >
      {/* HEADER */}
      <div
        style={{
          margin: "16px",
          padding: "20px 24px",
          borderRadius: "36px",
          display: "flex",
          alignItems: "center",
          gap: "20px",
          flexShrink: 0,
          background:
            "linear-gradient(135deg, #4FC3F7, #81C784)", // biru → hijau
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        }}
      >
        {/* TOMBOL KEMBALI */}
        <button
          onClick={handleBack}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: "#FFD54F", // kuning cerah
            color: "#333",
            fontSize: "28px",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          }}
          aria-label="Kembali"
        >
          ◀
        </button>

        {/* JUDUL */}
        <div
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: "38px",
            fontWeight: "800",
            color: "#FFFFFF",
            letterSpacing: "1px",
            textShadow: "0 2px 4px rgba(0,0,0,0.25)",
          }}
        >
          Belajar Suku Kata
        </div>

        {/* SPACER supaya judul tetap tengah */}
        <div style={{ width: "60px" }} />
      </div>

      {/* CONTENT */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "24px",
        }}
      >
        {children}
      </div>
    </div>
  );
}
