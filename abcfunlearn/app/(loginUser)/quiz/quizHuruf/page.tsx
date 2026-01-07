"use client";

import { useState, useEffect } from "react";

export default function QuizHurufPage() {
  const huruf = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  const [soal, setSoal] = useState<string>("");
  const [opsi, setOpsi] = useState<string[]>([]);
  const [jawaban, setJawaban] = useState<string | null>(null);

  useEffect(() => {
    generateSoal();
  }, []);

  function generateSoal() {
    const correct = huruf[Math.floor(Math.random() * huruf.length)];

    const wrong = huruf
      .filter((h) => h !== correct)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const pilihan = shuffleArray([correct, ...wrong]);

    setSoal(correct);
    setOpsi(pilihan);
    setJawaban(null);
  }

  function handleJawab(h: string) {
    if (jawaban) return;
    setJawaban(h);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2
        style={{
          fontFamily: "var(--font-baloo)",
          fontSize: "26px",
          marginBottom: "16px",
        }}
      >
        Pilih huruf: <strong>{soal}</strong>
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "16px",
        }}
      >
        {opsi.map((h) => {
          const benar = h === soal;
          const dipilih = h === jawaban;

          let bg = "#";
          if (jawaban) {
            if (benar) bg = "#4CAF50";
            else if (dipilih) bg = "#EF5350";
          }

          return (
            <div
              key={h}
              onClick={() => handleJawab(h)}
              style={{
                height: "96px",
                borderRadius: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                backgroundColor: bg,
                fontFamily: "var(--font-baloo)",
                fontSize: "44px",
                fontWeight: "800",
                color: "#1B5E20",

                cursor: "pointer",
                userSelect: "none",

                boxShadow: "0 5px 10px rgba(0,0,0,0.18)",
                transition: "all 0.2s ease",
              }}
            >
              {h}
            </div>
          );
        })}
      </div>

      {jawaban && (
        <button
          onClick={generateSoal}
          style={{
            marginTop: "24px",
            width: "100%",
            height: "48px",
            borderRadius: "24px",
            border: "none",
            backgroundColor: "#2196F3",
            color: "white",
            fontSize: "16px",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          Lanjut
        </button>
      )}
    </div>
  );
}

function shuffleArray<T>(arr: T[]) {
  return [...arr].sort(() => Math.random() - 0.5);
}
