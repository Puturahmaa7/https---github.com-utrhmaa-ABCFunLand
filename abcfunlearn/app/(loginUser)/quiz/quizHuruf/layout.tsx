"use client";

import { useRouter, usePathname } from "next/navigation";

export default function QuizHurufLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleBack = () => {
    router.push("/quiz");
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FFFDE7", // kuning lembut (beda dari materi)
      }}
    >
      {/* HEADER QUIZ */}
      <div
        style={{
          margin: "16px",
          padding: "20px 24px",
          borderRadius: "36px",
          display: "flex",
          alignItems: "center",
          gap: "20px",
          flexShrink: 0,
          background: "linear-gradient(135deg, #FFB300, #FF7043)", // oranye ceria
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        }}
      >
        {/* BACK */}
        <button
          onClick={handleBack}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: "#FFD54F",
            color: "#333",
            fontSize: "26px",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          }}
          aria-label="Kembali"
        >
          ◀
        </button>

        {/* JUDUL QUIZ */}
        <div
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: "36px",
            fontWeight: "800",
            color: "#FFFFFF",
            letterSpacing: "1px",
            textShadow: "0 2px 4px rgba(0,0,0,0.25)",
          }}
        >
          Quiz Huruf
        </div>

        <div style={{ width: "60px" }} />
      </div>

      {/* CONTENT */}
      <div
        style={{
          flex: 1,
          padding: "24px",
          overflowY: "auto", // ⬅️ INI KUNCI UTAMANYA
        }}
      >
        {children}
      </div>
    </div>
  );
}
