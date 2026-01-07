"use client";

import { useRouter } from "next/navigation";

export default function LearnPage() {
  const router = useRouter();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        gap: "60px",
      }}
    >
      <div
        onClick={() => router.push("/learn/belajar_huruf")}
        style={cardStyle}
      />

      <div
        onClick={() => router.push("/learn/belajar_suku_kata")}
        style={cardStyle}
      />

      <div
        onClick={() => router.push("/learn/belajar_kata")}
        style={cardStyle}
      />
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  width: "280px",
  height: "240px",
  backgroundColor: "#7ED957",
  borderRadius: "40px",
  cursor: "pointer",
};
