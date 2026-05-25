export type QuizAlternative = {
  id: number;
  description: string;
  isCorrect: boolean;
};

export type QuizQuestion = {
  id: number;
  title: string;
  alternatives: QuizAlternative[];
};

export type Answer = {
  id: number;
  label: string;
  text: string;
  color: string;
  isCorrect: boolean;
};

export type Question = {
  id: number;
  title: string;
  answers: Answer[];
};

export type QuizState = {
  questionIndex: number;
  countdown: number | null;
  timeLeft: number;
  selectedAnswer: Answer | null;
  submittedAnswer: Answer | null;
  revealResult: boolean;
  isComplete: boolean;
};

export type QuizAction =
  | { type: "advance" }
  | { type: "countdown" }
  | { type: "tick" }
  | { type: "select"; answer: Answer };
