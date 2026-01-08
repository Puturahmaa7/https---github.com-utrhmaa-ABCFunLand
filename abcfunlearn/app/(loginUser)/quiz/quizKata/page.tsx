"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Question = {
  correct: string;
  options: string[];
};

const SKIP_ANSWER = "__SKIP__";

export default function QuizKataPage() {
  const router = useRouter();

  const kataList = ["AYAM", "BOLA", "CERI", "DOMBA", "ELANG", "IKAN"];
  const TOTAL_SOAL = 4;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>([]);
  const [hoverSound, setHoverSound] = useState(false);

  const diSoalTerakhir = currentIndex === TOTAL_SOAL - 1;

  const jumlahTerjawab = answers.filter((a) => a !== null).length;
  const jumlahBenar = answers.filter(
    (ans, i) => ans && ans === questions[i]?.correct
  ).length;
  const jumlahSalah = jumlahTerjawab - jumlahBenar;

  /* 🔊 MAIN SOUND */
  const playSoal = () => {
    const audio = new Audio(
      `/suaraKata/${questions[currentIndex].correct.toLowerCase()}.mp3`
    );
    audio.play();
  };

  /* 🔊 OPTION SOUND */
  const playOption = (kata: string) => {
    const audio = new Audio(`/suaraKata/${kata.toLowerCase()}.mp3`);
    audio.play();
  };

  const generateQuiz = () => {
    const soal: Question[] = [];

    for (let i = 0; i < TOTAL_SOAL; i++) {
      const correct = kataList[Math.floor(Math.random() * kataList.length)];
      const wrong = kataList
        .filter((k) => k !== correct)
        .sort(() => Math.random() - 0.5)
        .slice(0, 2);

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

  const pilihJawaban = (k: string) => {
    if (jawaban) return;

    playOption(k);

    const copy = [...answers];
    copy[currentIndex] = k;
    setAnswers(copy);
  };

  const nextSoal = () => {
    if (!answers[currentIndex]) {
      const copy = [...answers];
      copy[currentIndex] = SKIP_ANSWER;
      setAnswers(copy);
    }
    setCurrentIndex((i) => i + 1);
  };

  const selesaiKuis = () => router.push("/quiz");

  return (
    <div style={container}>
      <div style={tracker}>
        Soal {currentIndex + 1} dari {TOTAL_SOAL}
      </div>

      <div style={instruksi}>Dengarkan lalu pilih kata</div>

      {/* 🔊 BUTTON SUARA */}
      <button
        onClick={playSoal}
        onMouseEnter={() => setHoverSound(true)}
        onMouseLeave={() => setHoverSound(false)}
        style={{
          ...soundBtn,
          transform: hoverSound ? "scale(1.15)" : "scale(1)",
        }}
      >
        🔊
      </button>

      {/* OPSI */}
      <div style={grid}>
        {current.options.map((k) => {
          const benar = k === current.correct;
          const dipilih = k === jawaban;

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
              key={k}
              onClick={() => pilihJawaban(k)}
              disabled={!!jawaban}
              style={{
                ...opsiBtn,
                backgroundColor: bg,
                boxShadow: shadow,
              }}
            >
              <Image src={`/kata/${k}.png`} alt={k} width={90} height={90} />
              <div style={opsiText}>{k}</div>
            </button>
          );
        })}
      </div>

      {/* NAV */}
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

      {/* HASIL */}
      {diSoalTerakhir && (
        <div style={hasilBox}>
          <div style={hasilTitle}>Hasil Quiz</div>
          <div style={{ ...hasilText, color: "#4CAF50" }}>
            ✅ Benar: {jumlahBenar}
          </div>
          <div style={{ ...hasilText, color: "#EF5350" }}>
            ❌ Salah: {jumlahSalah}
          </div>

          <div style={hasilBtnWrap}>
            <button onClick={generateQuiz} style={ulangBtn}>
              Ulang
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

const container = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "22px",
  alignItems: "center",
  marginTop: "20px",
};

const tracker = {
  fontFamily: "var(--font-baloo)",
  fontSize: "20px",
  fontWeight: "700",
  color: "#F57C00",
};

const instruksi = {
  fontFamily: "var(--font-baloo)",
  fontSize: "28px",
  fontWeight: "800",
  color: "#1976D2",
};

const soundBtn = {
  fontSize: "46px",
  width: "72px",
  height: "72px",
  borderRadius: "50%",
  border: "none",
  cursor: "pointer",
  backgroundColor: "#FFD54F",
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
  height: "150px",
  borderRadius: "28px",
  border: "none",
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  justifyContent: "center",
  gap: "6px",
  cursor: "pointer",
};

const opsiText = {
  fontFamily: "var(--font-baloo)",
  fontSize: "18px",
  fontWeight: "700",
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
};

const hasilText = {
  fontFamily: "var(--font-baloo)",
  fontSize: "22px",
  fontWeight: "700",
};

const hasilBtnWrap = {
  marginTop: "18px",
  display: "flex",
  justifyContent: "center",
  gap: "12px",
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
