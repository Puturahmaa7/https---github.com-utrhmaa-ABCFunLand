"use client";
import { useEffect, useRef, useState } from "react";

type Props = {
  syllables: string[];
  correctAnswer: string;
  onNext: () => void;
  onPrev: () => void;
};

export default function LearnSlide({
  syllables,
  correctAnswer,
  onNext,
  onPrev,
}: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  // autoplay saat slide muncul
  useEffect(() => {
    audioRef.current?.play();
    setSelected(null);
  }, [correctAnswer]);

  const playAudio = () => {
    audioRef.current?.play();
  };

  const checkAnswer = (value: string) => {
    setSelected(value);
  };

  return (
    <>
      {/* AUDIO */}
      <audio
        ref={audioRef}
        src={`/audio/${correctAnswer.toLowerCase()}.mp3`}
      />

      {/* PILIHAN SUKU KATA */}
      <div style={gridStyle}>
        {syllables.map((item) => (
          <button
            key={item}
            onClick={() => checkAnswer(item)}
            style={{
              ...cardStyle,
              background:
                selected === item
                  ? item === correctAnswer
                    ? "#4CAF50"
                    : "#FF6B6B"
                  : "#7ED957",
              color: selected === item ? "#fff" : "#000",
            }}
          >
            {item}
          </button>
        ))}
      </div>

      {/* KONTROL */}
      <div style={controlStyle}>
        <button onClick={onPrev}>⬅</button>
        <button onClick={playAudio}>🔊</button>
        <button onClick={onNext}>➡</button>
      </div>
    </>
  );
}

/* STYLE */
const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 160px)",
  gap: "30px",
  justifyContent: "center",
};

const cardStyle: React.CSSProperties = {
  border: "none",
  borderRadius: "16px",
  fontSize: "36px",
  fontWeight: 700,
  padding: "30px",
  cursor: "pointer",
};

const controlStyle: React.CSSProperties = {
  marginTop: "60px",
  display: "flex",
  justifyContent: "center",
  gap: "80px",
  fontSize: "32px",
};
