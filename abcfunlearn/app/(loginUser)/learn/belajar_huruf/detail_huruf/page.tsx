"use client";

import { useSearchParams } from "next/navigation";

export default function DetailHurufPage() {
  const params = useSearchParams();
  const huruf = params.get("huruf") ?? "A";

  return (
    <div
      style={{
        marginTop: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "30px",
      }}
    >
      <div
        style={{
          backgroundColor: "#7ED957",
          width: "320px",
          height: "200px",
          borderRadius: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "120px",
          fontWeight: "800",
        }}
      >
        {huruf}
      </div>

      <button
        style={{
          fontSize: "48px",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        🔊
      </button>
    </div>
  );
}
