"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ChartBar,
  CheckCircle,
  Clock,
  GameController,
  SignIn,
  UserPlus,
  LockKey,
  Play,
  Plus,
  Users,
} from "@phosphor-icons/react/dist/ssr";
import JoinLockToggle from "../components/JoinLockToggle";

const stats = [
  { label: "Questions", value: "10", icon: ChartBar },
  { label: "Players", value: "0", icon: Users },
  { label: "Time", value: "20s", icon: Clock },
  { label: "Status", value: "Ready", icon: CheckCircle },
];

function createPin() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export default function Home() {
  const [pin, setPin] = useState("438921");
  const [joinPin, setJoinPin] = useState("");

  useEffect(() => {
    const refreshPin = () => {
      setPin(createPin());
      setJoinPin("");
    };

    refreshPin();
    const interval = window.setInterval(refreshPin, 5 * 60 * 1000);

    return () => window.clearInterval(interval);
  }, []);

  const canStart = joinPin.trim() === pin;

  useEffect(() => {
    if (canStart) {
      // navigate to quiz when PIN matches
      window.location.href = "/questions";
    }
  }, [canStart]);

  return (
    <main className="min-h-screen bg-[#f7f7fb] text-slate-950">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-lg bg-[#4f2bd8] text-white shadow-sm">
              <GameController size={26} weight="fill" />
            </div>
            <div>
              <p className="text-sm font-black uppercase text-[#4f2bd8]">
                QuizPop
              </p>
              <h1 className="text-2xl font-black leading-tight sm:text-3xl">
                Questionnaire Dashboard
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/sign-in"
              className="grid size-11 place-items-center rounded-md border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
              aria-label="Sign in"
              title="Sign in"
            >
              <SignIn size={20} weight="bold" />
            </Link>
            <Link
              href="/create-account"
              className="grid size-11 place-items-center rounded-md border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
              aria-label="Create account"
              title="Create account"
            >
              <UserPlus size={20} weight="bold" />
            </Link>
            <button className="inline-flex h-11 items-center gap-2 rounded-md border border-slate-200 bg-white px-4 text-sm font-black shadow-sm transition hover:bg-slate-50">
              <Plus size={18} weight="bold" />
              New quiz
            </button>
            <Link
              href="/questions"
              className="inline-flex h-11 items-center gap-2 rounded-md bg-slate-950 px-5 text-sm font-black text-white shadow-sm transition hover:bg-slate-800"
            >
              <Play size={18} weight="fill" />
              Preview
            </Link>
          </div>
        </header>

        <div className="grid flex-1 gap-5 py-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="flex min-h-[520px] flex-col justify-between rounded-lg bg-[#4f2bd8] p-5 text-white shadow-xl sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="mb-2 inline-flex items-center gap-2 rounded-md bg-white/15 px-3 py-1 text-sm font-black">
                  <LockKey size={16} weight="bold" />
                  Waiting room
                </p>
                <h2 className="max-w-2xl text-4xl font-black leading-[1.02] sm:text-6xl">
                  Start a live quiz session
                </h2>
              </div>
              <div className="rounded-lg bg-white px-4 py-3 text-center text-slate-950 shadow-lg">
                <p className="text-xs font-black uppercase text-slate-500">
                  Game PIN
                </p>
                <p className="font-mono text-3xl font-black tracking-wide">
                  {pin}
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["Host screen", "Project this view before players join."],
                ["Question order", "10 seeded questions, four choices each."],
                ["Scoring", "Correct answers award passes."],
                ["Rotation", "PIN refreshes every 5 minutes."],
              ].map(([title, description]) => (
                <div
                  key={title}
                  className="rounded-lg bg-white/12 p-4 ring-1 ring-white/20"
                >
                  <h3 className="font-black">{title}</h3>
                  <p className="mt-1 text-sm font-semibold text-white/80">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <aside className="flex flex-col gap-5">
            <section className="grid grid-cols-2 gap-3">
              {stats.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <Icon
                      size={23}
                      weight="bold"
                      className="mb-4 text-[#0f9f6e]"
                    />
                    <p className="text-3xl font-black">{item.value}</p>
                    <p className="text-sm font-bold text-slate-500">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-black">Join panel</h2>
                  <p className="text-sm font-semibold text-slate-500">
                    Match PIN to unlock the start button.
                  </p>
                </div>
                <span
                  className={`rounded-md px-3 py-1 text-sm font-black flex items-center justify-center ${
                    canStart
                      ? "bg-[#0f9f6e] text-white"
                      : "bg-[#ffbf00] text-slate-950"
                  }`}
                >
                  <JoinLockToggle
                    initialLocked={!canStart}
                    size={18}
                    onChange={(locked: boolean) => {


                      setJoinPin(locked ? '' : pin);
                    }}
                  />
                </span>
              </div>

              <div className="grid gap-3">
                <input
                  value={joinPin}
                  onChange={(event) => setJoinPin(event.target.value)}
                  inputMode="numeric"
                  placeholder="Enter PIN"
                  className={`h-12 rounded-md border px-4 font-mono text-base font-black tracking-wide outline-none transition ${
                    canStart
                      ? "border-[#0f9f6e] bg-white text-slate-950"
                      : "border-slate-200 bg-slate-50 text-slate-950 focus:border-[#4f2bd8] focus:bg-white"
                  }`}
                />
                <button
                  disabled={!canStart}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#e21b3c] px-4 font-black text-white shadow-sm transition hover:bg-[#c91533] disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  <Play size={18} weight="fill" />
                  {canStart ? "Start test" : "Locked"}
                </button>
              </div>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}
