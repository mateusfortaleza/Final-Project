"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  IconChartBar,
  IconCircleCheck,
  IconClock,
  IconDeviceGamepad2,
  IconLogin2,
  IconUserPlus,
  IconLock,
  IconPlayerPlayFilled,
  IconPlus,
} from "@tabler/icons-react";
import JoinLockToggle from "../components/JoinLockToggle";

const stats = [
  { label: "Questions", value: "10", icon: IconChartBar },
  { label: "Time", value: "20s", icon: IconClock },
  { label: "Status", value: "Ready", icon: IconCircleCheck },
];

function createPin() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export default function Home() {
  const [pin, setPin] = useState("438921");
  const [joinPin, setJoinPin] = useState("");
  const [isRouterReady, setIsRouterReady] =  useState(false);

  useEffect(() => {
    setIsRouterReady(true);

    const refreshPin = () => {
      setPin(createPin());
      setJoinPin("");
    };

    refreshPin();
    const interval = window.setInterval(refreshPin, 5 * 60 * 1000);

    return () => window.clearInterval(interval);
  }, []);

  const canStart = joinPin.trim() === pin;

  return (
    <main className="min-h-screen bg-[#f7f7fb] text-slate-950">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-lg bg-[#4f2bd8] text-white shadow-sm">
              <IconDeviceGamepad2 size={26} strokeWidth={2.5} />
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
              className="grid size-11 cursor-pointer place-items-center rounded-md border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
              aria-label="Sign in"
              title="Sign in"
            >
              <IconLogin2 size={20} strokeWidth={2.5} />
            </Link>
            <Link
              href="/create-account"
              className="grid size-11 cursor-pointer place-items-center rounded-md border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
              aria-label="Create account"
              title="Create account"
            >
              <IconUserPlus size={20} strokeWidth={2.5} />
            </Link>
            <button className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-md border border-slate-200 bg-white px-4 text-sm font-black shadow-sm transition hover:bg-slate-50">
              <IconPlus size={18} strokeWidth={2.5} />
              New quiz
            </button>
            <Link
              href={`/questions?pin=${pin}`}
              className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-md bg-slate-950 px-5 text-sm font-black text-white shadow-sm transition hover:bg-slate-800"
            >
              <IconPlayerPlayFilled size={18} />
              Preview
            </Link>
          </div>
        </header>

        <div className="grid flex-1 gap-5 py-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="flex min-h-130 flex-col justify-between rounded-lg bg-[#4f2bd8] p-5 text-white shadow-xl sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="mb-2 inline-flex items-center gap-2 rounded-md bg-white/15 px-3 py-1 text-sm font-black">
                  <IconLock size={16} strokeWidth={2.5} />
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
                      strokeWidth={2.5}
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
                      setJoinPin(locked ? "" : pin);
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
                <Link
                  href={`/questions?pin=${pin}`}
                  aria-disabled={!canStart || !isRouterReady}
                  prefetch={false}
                  onNavigate={(event) => {
                    if (!canStart || !isRouterReady) {
                      event.preventDefault();
                    }
                  }}
                  className={`inline-flex h-12 items-center justify-center gap-2 rounded-md px-4 font-black text-white shadow-sm transition ${
                    canStart && isRouterReady
                      ? "cursor-pointer bg-[#e21b3c] hover:bg-[#c91533]"
                      : "cursor-not-allowed bg-slate-300"
                  }`}
                >
                  <IconPlayerPlayFilled size={18} />
                  {canStart ? "Start test" : "Locked"}
                </Link>
              </div>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}