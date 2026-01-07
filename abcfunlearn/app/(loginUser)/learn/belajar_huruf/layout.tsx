"use client";

import { useRouter, usePathname } from "next/navigation";

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleBack = () => {
    // contoh pathname:
    // /learn/belajar_huruf/detail_huruf
    // /learn/belajar_huruf
    // /learn

    const segments = pathname.split("/").filter(Boolean);

    // kalau sudah di /learn → jangan ke mana-mana
    if (segments.length <= 1) {
      return;
    }

    // buang 1 level folder terakhir
    const targetPath = "/" + segments.slice(0, -1).join("/");

    router.push(targetPath);
  };

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
        {/* TOMBOL KEMBALI DINAMIS */}
        <button
          onClick={handleBack}
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

        {/* SPACER */}
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
