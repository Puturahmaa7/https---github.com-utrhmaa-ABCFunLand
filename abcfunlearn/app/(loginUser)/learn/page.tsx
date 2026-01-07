"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

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
      {/* BELAJAR HURUF */}
      <div onClick={() => router.push("/learn/belajar_huruf")} style={cardStyle}>
        <Image
          src="/image/belajar_huruf.png"
          alt="Belajar Huruf"
          fill
          style={{ objectFit: "cover", borderRadius: "40px" }}
        />
      </div>

      {/* BELAJAR SUKU KATA */}
      <div
        onClick={() => router.push("/learn/belajar_suku_kata")}
        style={cardStyle}
      >
        <Image
          src="/image/belajar_suku_kata.png"
          alt="Belajar Suku Kata"
          fill
          style={{ objectFit: "cover", borderRadius: "40px" }}
        />
      </div>

      {/* BELAJAR KATA */}
      <div onClick={() => router.push("/learn/belajar_kata")} style={cardStyle}>
        <Image
          src="/image/belajar_kata.png"
          alt="Belajar Kata"
          fill
          style={{ objectFit: "cover", borderRadius: "40px" }}
        />
      </div>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  width: "280px",
  height: "240px",
  borderRadius: "40px",
  cursor: "pointer",
  position: "relative", 
  overflow: "hidden",
};
