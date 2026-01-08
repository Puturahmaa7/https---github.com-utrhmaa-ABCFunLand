"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SKIP_ANSWER = "__SKIP__";

type Question = {
  correct: string;
  options: string[];
};

export default function QuizHurufPage() {
  const router = useRouter(); // ✅ DI SINI SAJA
  const hurufList = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  const TOTAL_SOAL = 7;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>([]);
  const [hover, setHover] = useState<string | null>(null);

  const diSoalTerakhir = currentIndex === TOTAL_SOAL - 1;

  // =============================
  // HITUNG HASIL (AMAN)
  // =============================
  const jumlahTerjawab = answers.filter((a) => a !== null).length;

  const jumlahBenar = answers.filter(
    (ans, i) => ans !== null && ans === questions[i]?.correct
  ).length;

  const jumlahSalah = jumlahTerjawab - jumlahBenar;

  // =============================
  // AUDIO
  // =============================
  const playHuruf = (huruf: string) => {
    const audio = new Audio(`/suaraHuruf/${huruf.toLowerCase()}.mp3`);
    audio.play();
  };

  const playSoal = () => {
    const audio = new Audio(
      `/suaraHuruf/${questions[currentIndex].correct.toLowerCase()}.mp3`
    );
    audio.play();
  };

  // =============================
  // GENERATE QUIZ
  // =============================
  const generateQuiz = () => {
    const soal: Question[] = [];

    for (let i = 0; i < TOTAL_SOAL; i++) {
      const correct = hurufList[Math.floor(Math.random() * hurufList.length)];
      const wrong = hurufList
        .filter((h) => h !== correct)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      soal.push({
        correct,
        options: shuffleArray([correct, ...wrong]),
      });
    }

    setQuestions(soal);
    setAnswers(Array(TOTAL_SOAL).fill(null));
    setCurrentIndex(0);
  };

  useEffect(() => {
    generateQuiz();
  }, []);

  if (questions.length === 0) return null;

  const current = questions[currentIndex];
  const jawaban = answers[currentIndex];

  const nextSoal = () => {
    // jika belum menjawab → otomatis salah
    if (!answers[currentIndex]) {
      const copy = [...answers];
      copy[currentIndex] = SKIP_ANSWER;
      setAnswers(copy);
    }

    setCurrentIndex((i) => i + 1);
  };

  const pilihJawaban = (h: string) => {
    if (jawaban) return;

    playHuruf(h);

    const copy = [...answers];
    copy[currentIndex] = h;
    setAnswers(copy);
  };

  const selesaiKuis = () => {
    router.push("/quiz");
  };

  return (
    <div
      style={{
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "22px",
      }}
    >
      {/* TRACKER */}
      <div style={tracker}>
        Soal {currentIndex + 1} dari {TOTAL_SOAL}
      </div>

      {/* INSTRUKSI */}
      <div style={instruksi}>Dengarkan suara lalu pilih huruf</div>

      {/* TOMBOL AUDIO */}
      <button
        onClick={playSoal}
        onMouseEnter={() => setHover("sound")}
        onMouseLeave={() => setHover(null)}
        style={{
          ...btnSound,
          backgroundColor: hover ? "#FFEB3B" : "#FFD54F",
          transform: hover ? "scale(1.2)" : "scale(1)",
        }}
      >
        🔊
      </button>

      {/* PILIHAN */}
      <div style={grid}>
        {current.options.map((h) => {
          const benar = h === current.correct;
          const dipilih = h === jawaban;

          let bg = "#FFFFFF";
          let shadow = "0 6px 14px rgba(0,0,0,0.2)";

          if (jawaban) {
            if (benar) {
              bg = "#4CAF50";
              shadow = "0 0 20px rgba(76,175,80,0.8)";
            } else if (dipilih) {
              bg = "#EF5350";
              shadow = "0 0 20px rgba(239,83,80,0.8)";
            }
          }

          return (
            <button
              key={h}
              onClick={() => pilihJawaban(h)}
              disabled={!!jawaban}
              style={{
                ...opsiBtn,
                backgroundColor: bg,
                boxShadow: shadow,
              }}
            >
              <Image src={`/huruf/${h}.png`} alt={h} width={80} height={80} />
            </button>
          );
        })}
      </div>

      {/* NAVIGASI */}
      <div style={{ display: "flex", gap: "12px" }}>
        <button
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((i) => i - 1)}
          style={navBtn}
        >
          ◀ Sebelumnya
        </button>

        <button disabled={diSoalTerakhir} onClick={nextSoal} style={navBtn}>
          Selanjutnya ▶
        </button>
      </div>

      {/* HASIL AKHIR */}
      {diSoalTerakhir && (
        <div style={hasilBox}>
          <div style={hasilTitle}>Hasil Quiz</div>

          <div style={{ ...hasilText, color: "#4CAF50" }}>
            ✅ Benar: {jumlahBenar}
          </div>

          <div style={{ ...hasilText, color: "#EF5350" }}>
            ❌ Salah: {jumlahSalah}
          </div>

          <div style={{ marginTop: "18px", display: "flex", gap: "12px" }}>
            <button onClick={generateQuiz} style={ulangBtn}>
              Ulang Kuis
            </button>

            <button onClick={selesaiKuis} style={selesaiBtn}>
              Selesai
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= STYLES ================= */

const tracker = {
  fontFamily: "var(--font-baloo)",
  fontSize: "20px",
  fontWeight: "700",
  color: "#F57C00",
};

const instruksi = {
  fontFamily: "var(--font-baloo)",
  fontSize: "34px",
  fontWeight: "800",
  color: "#1976D2",
  textAlign: "center" as const,
};

const btnSound = {
  fontSize: "46px",
  border: "none",
  borderRadius: "50%",
  width: "72px",
  height: "72px",
  cursor: "pointer",
  boxShadow: "0 6px 14px rgba(0,0,0,0.2)",
  transition: "0.2s",
};

const grid = {
  width: "100%",
  maxWidth: "420px",
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "18px",
};

const opsiBtn = {
  height: "120px",
  borderRadius: "28px",
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "0.2s",
};

const navBtn = {
  padding: "10px 16px",
  borderRadius: "20px",
  border: "none",
  backgroundColor: "#2196F3",
  color: "white",
  fontWeight: "700",
  cursor: "pointer",
};

const hasilBox = {
  marginTop: "32px",
  width: "100%",
  maxWidth: "420px",
  padding: "24px",
  borderRadius: "32px",
  backgroundColor: "#FFFFFF",
  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  textAlign: "center" as const,
};

const hasilTitle = {
  fontFamily: "var(--font-baloo)",
  fontSize: "32px",
  fontWeight: "800",
  color: "#1976D2",
  marginBottom: "12px",
};

const hasilText = {
  fontFamily: "var(--font-baloo)",
  fontSize: "22px",
  fontWeight: "700",
};

const ulangBtn = {
  padding: "12px 18px",
  borderRadius: "24px",
  border: "none",
  backgroundColor: "#4CAF50",
  color: "white",
  fontWeight: "700",
  cursor: "pointer",
};

const selesaiBtn = {
  padding: "12px 18px",
  borderRadius: "24px",
  border: "none",
  backgroundColor: "#F44336",
  color: "white",
  fontWeight: "700",
  cursor: "pointer",
};

function shuffleArray<T>(arr: T[]) {
  return [...arr].sort(() => Math.random() - 0.5);
}
