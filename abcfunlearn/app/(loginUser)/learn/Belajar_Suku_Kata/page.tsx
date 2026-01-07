"use client";
import { useState } from "react";
import LearnSlide from "./LearnSlide";

const slides = [
  {
    syllables: ["BA", "BI", "BU", "BE"],
    correct: "BA",
  },
  {
    syllables: ["MA", "MI", "MU", "ME"],
    correct: "MA",
  },
  {
    syllables: ["DA", "DI", "DU", "DE"],
    correct: "DA",
  },
];

export default function LearnPage() {
  const [index, setIndex] = useState(0);

  return (
    <LearnSlide
      syllables={slides[index].syllables}
      correctAnswer={slides[index].correct}
      onNext={() =>
        setIndex((prev) => Math.min(prev + 1, slides.length - 1))
      }
      onPrev={() =>
        setIndex((prev) => Math.max(prev - 1, 0))
      }
    />
  );
}
