type Answer = {
  label: string;
  text: string;
  color: string;
};

const answers: Answer[] = [
  { label: "A", text: "Mercury", color: "bg-red-500" },
  { label: "B", text: "Venus", color: "bg-blue-500" },
  { label: "C", text: "Earth", color: "bg-yellow-500" },
  { label: "D", text: "Mars", color: "bg-emerald-500" },
];

export function GameHeader() {
  return (
    <header className="flex items-center justify-between gap-4 px-6 py-4 text-white">
      <div className="text-2xl font-black tracking-wide">QuizPop</div>
      <div className="rounded-md bg-white/20 px-4 py-2 text-sm font-bold">
        PIN 438 921
      </div>
    </header>
  );
}

export function QuestionCard() {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-4 py-6">
      <div className="rounded-lg bg-white p-6 text-center shadow-xl">
        <div className="mb-4 flex items-center justify-between gap-3 text-sm font-bold text-slate-600">
          <span>Question 1 of 10</span>
          <span className="rounded-md bg-slate-100 px-3 py-1">20 sec</span>
        </div>
        <h1 className="text-3xl font-black text-slate-950 md:text-5xl">
          Which planet is known as the Red Planet?
        </h1>
      </div>
    </section>
  );
}

export function AnswerGrid() {
  return (
    <section className="grid w-full grid-cols-1 gap-3 p-4 md:grid-cols-2 md:p-6">
      {answers.map((answer) => (
        <button
          key={answer.label}
          className={`${answer.color} flex min-h-28 items-center gap-4 rounded-lg p-5 text-left text-white shadow-lg transition hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-white/70`}
        >
          <span className="grid size-12 shrink-0 place-items-center rounded-md bg-black/20 text-2xl font-black">
            {answer.label}
          </span>
          <span className="text-2xl font-black">{answer.text}</span>
        </button>
      ))}
    </section>
  );
}

export function KahootQuestion() {
  return (
    <main className="flex min-h-screen flex-col bg-violet-700">
      <GameHeader />
      <QuestionCard />
      <AnswerGrid />
    </main>
  );
}
