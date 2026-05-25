"use client";

import { useEffect, useReducer } from "react";
import type {
  Answer,
  Question,
  QuizAction,
  QuizQuestion,
  QuizState,
} from "../definitions";

const answerColors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-yellow-500",
  "bg-emerald-500",
];
const answerLabels = ["A", "B", "C", "D"];

function mapQuizQuestions(quizQuestions: QuizQuestion[]): Question[] {
  return quizQuestions.map((question) => ({
    id: question.id,
    title: question.title,
    answers: question.alternatives.map((alternative, index) => ({
      id: alternative.id,
      label: answerLabels[index] ?? String(index + 1),
      text: alternative.description,
      color: answerColors[index] ?? "bg-slate-500",
      isCorrect: alternative.isCorrect,
    })),
  }));
}

function quizReducer(
  state: QuizState,
  action: QuizAction,
  questionsLength: number,
): QuizState {
  if (action.type === "select") {
    if (state.revealResult || state.countdown !== null) {
      return state;
    }

    return {
      ...state,
      selectedAnswer: action.answer,
    };
  }

  if (state.isComplete) {
    return state;
  }

  if (action.type === "countdown") {
    return {
      ...state,
      countdown:
        state.countdown === null || state.countdown <= 1
          ? null
          : state.countdown - 1,
    };
  }

  if (action.type === "advance") {
    if (state.questionIndex >= questionsLength - 1) {
      return {
        ...state,
        isComplete: true,
      };
    }

    return {
      questionIndex: state.questionIndex + 1,
      countdown: 5,
      timeLeft: 20,
      selectedAnswer: null,
      submittedAnswer: null,
      revealResult: false,
      isComplete: false,
    };
  }

  if (state.revealResult) {
    return state;
  }

  if (state.countdown !== null) {
    return state;
  }

  if (state.timeLeft > 1) {
    return {
      ...state,
      timeLeft: state.timeLeft - 1,
    };
  }

  return {
    ...state,
    timeLeft: 0,
    selectedAnswer: null,
    submittedAnswer: state.selectedAnswer,
    revealResult: true,
  };
}

export function GameHeader({ pin }: { pin: string }) {
  return (
    <header className="flex items-center justify-between gap-4 px-6 py-4 text-white">
      <div className="text-2xl font-black tracking-wide">QuizPop</div>
      <div className="rounded-md bg-white/20 px-4 py-2 text-sm font-bold">
        PIN {pin}
      </div>
    </header>
  );
}

export function QuestionCard({
  question,
  questionIndex,
  timeLeft,
  questionsLength,
}: {
  question: Question;
  questionIndex: number;
  timeLeft: number;
  questionsLength: number;
}) {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-4 py-6">
      <div className="rounded-lg bg-white p-6 text-center shadow-xl">
        <div className="mb-4 flex items-center justify-between gap-3 text-sm font-bold text-slate-600">
          <span>
            Question {questionIndex + 1} of {questionsLength}
          </span>
          <span className="rounded-md bg-slate-100 px-3 py-1">
            {timeLeft} sec
          </span>
        </div>
        <h1 className="text-3xl font-black text-slate-950 md:text-5xl">
          {question.title}
        </h1>
      </div>
    </section>
  );
}

export function AnswerGrid({
  answers,
  submittedAnswer,
  revealResult,
  onSelect,
}: {
  answers: Answer[];
  submittedAnswer: Answer | null;
  revealResult: boolean;
  onSelect: (answer: Answer) => void;
}) {
  return (
    <section className="grid w-full grid-cols-1 gap-3 p-4 md:grid-cols-2 md:p-6">
      {answers.map((answer) => {
        const isSubmitted = submittedAnswer?.id === answer.id;
        const resultClass =
          revealResult && isSubmitted && answer.isCorrect
            ? "ring-4 ring-white"
            : revealResult && isSubmitted
              ? "opacity-80 ring-4 ring-black/40"
              : "";

        return (
          <button
            key={answer.id}
            type="button"
            onClick={() => onSelect(answer)}
            className={`${answer.color} ${resultClass} flex min-h-28 cursor-pointer items-center gap-4 rounded-lg p-5 text-left text-white shadow-lg transition hover:scale-[1.01] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-white/70`}
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-md bg-black/20 text-2xl font-black">
              {answer.label}
            </span>
            <span className="flex flex-1 items-center justify-between gap-3 text-2xl font-black">
              <span>{answer.text}</span>
              {isSubmitted && revealResult ? (
                <span className="rounded-md bg-black/25 px-3 py-1 text-base">
                  {answer.isCorrect ? "Correct" : "Incorrect"}
                </span>
              ) : null}
            </span>
          </button>
        );
      })}
    </section>
  );
}

function CountdownOverlay({
  countdown,
  variant = "simple",
}: {
  countdown: number | null;
  variant?: "intro" | "simple";
}) {
  if (countdown === null) {
    return null;
  }

  if (variant === "intro") {
    return (
      <div className="quiz-countdown-bg absolute inset-0 z-10 grid place-items-center text-white">
        <div className="quiz-countdown-ring">
          <div className="quiz-countdown-number font-black" key={countdown}>
            {countdown}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-10 grid place-items-center bg-violet-700 text-white">
      <div className="quiz-simple-countdown font-black" key={countdown}>
        {countdown}
      </div>
    </div>
  );
}

export function KahootQuestion({
  pin,
  questions: quizQuestions,
}: {
  pin: string;
  questions: QuizQuestion[];
}) {
  const questions = mapQuizQuestions(quizQuestions);
  const [
    {
      questionIndex,
      countdown,
      timeLeft,
      submittedAnswer,
      revealResult,
      isComplete,
    },
    dispatch,
  ] = useReducer(
    (state: QuizState, action: QuizAction) =>
      quizReducer(state, action, questions.length),
    {
      questionIndex: 0,
      countdown: 3,
      timeLeft: 20,
      selectedAnswer: null,
      submittedAnswer: null,
      revealResult: false,
      isComplete: false,
    },
  );

  useEffect(() => {
    if (isComplete || revealResult || countdown !== null) {
      return;
    }

    const timer = window.setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [countdown, isComplete, revealResult]);

  useEffect(() => {
    if (isComplete || revealResult || countdown === null) {
      return;
    }

    const countdownTimer = window.setTimeout(() => {
      dispatch({ type: "countdown" });
    }, 1000);

    return () => window.clearTimeout(countdownTimer);
  }, [countdown, isComplete, revealResult]);

  useEffect(() => {
    if (!revealResult) {
      return;
    }

    const revealTimer = window.setTimeout(() => {
      dispatch({ type: "advance" });
    }, 2000);

    return () => window.clearTimeout(revealTimer);
  }, [revealResult]);

  if (questions.length === 0) {
    return (
      <main className="flex min-h-screen flex-col bg-violet-700">
        <GameHeader pin={pin} />
        <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-4 py-6">
          <div className="rounded-lg bg-white p-6 text-center shadow-xl">
            <h1 className="text-4xl font-black text-slate-950 md:text-6xl">
              No questions found
            </h1>
          </div>
        </section>
      </main>
    );
  }

  if (isComplete) {
    return (
      <main className="flex min-h-screen flex-col bg-violet-700">
        <GameHeader pin={pin} />
        <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-4 py-6">
          <div className="rounded-lg bg-white p-6 text-center shadow-xl">
            <h1 className="text-4xl font-black text-slate-950 md:text-6xl">
              Quiz complete
            </h1>
          </div>
        </section>
      </main>
    );
  }

  const currentQuestion = questions[questionIndex];

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-violet-700">
      <CountdownOverlay
        countdown={countdown}
        variant={questionIndex === 0 ? "intro" : "simple"}
      />
      <GameHeader pin={pin} />
      <QuestionCard
        question={currentQuestion}
        questionIndex={questionIndex}
        timeLeft={timeLeft}
        questionsLength={questions.length}
      />
      <AnswerGrid
        answers={currentQuestion.answers}
        submittedAnswer={submittedAnswer}
        revealResult={revealResult}
        onSelect={(answer) => dispatch({ type: "select", answer })}
      />
    </main>
  );
}
