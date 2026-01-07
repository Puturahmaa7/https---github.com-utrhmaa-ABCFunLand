export type QuizItem = {
  question: string;
  correctAnswer: string;
  wrongAnswers: string[];
};

export const quizHuruf: QuizItem[] = [
  {
    question: "Huruf apakah ini: A",
    correctAnswer: "A",
    wrongAnswers: ["B", "C", "D"],
  },
  {
    question: "Huruf apakah ini: B",
    correctAnswer: "B",
    wrongAnswers: ["A", "C", "D"],
  },
];
