import Link from "next/link";
import {
  IconArrowLeft,
  IconDeviceGamepad2,
  IconLogin2,
} from "@tabler/icons-react";

export default function SignInPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f7f7fb] px-4 py-8 text-slate-950">
      <section className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-xl">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-black text-slate-500 transition hover:text-slate-950"
        >
          <IconArrowLeft size={18} strokeWidth={2.5} />
          Dashboard
        </Link>

        <div className="mb-7 flex items-center gap-3">
          <div className="grid size-12 place-items-center rounded-lg bg-[#4f2bd8] text-white">
            <IconDeviceGamepad2 size={27} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-sm font-black uppercase text-[#4f2bd8]">
              QuizPop
            </p>
            <h1 className="text-3xl font-black">Sign in</h1>
          </div>
        </div>

        <form className="grid gap-4">
          <label className="grid gap-2 text-sm font-black">
            Name
            <input
              type="text"
              placeholder="Your name"
              className="h-12 rounded-md border border-slate-200 bg-slate-50 px-4 text-base font-semibold outline-none transition focus:border-[#4f2bd8] focus:bg-white"
            />
          </label>

          <label className="grid gap-2 text-sm font-black">
            Game PIN
            <input
              type="text"
              inputMode="numeric"
              placeholder="438921"
              className="h-12 rounded-md border border-slate-200 bg-slate-50 px-4 font-mono text-base font-semibold tracking-wide outline-none transition focus:border-[#4f2bd8] focus:bg-white"
            />
          </label>

          <button className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-slate-950 px-4 font-black text-white transition hover:bg-slate-800">
            <IconLogin2 size={18} strokeWidth={2.5} />
            Enter room
          </button>
        </form>

        <p className="mt-6 text-center text-sm font-bold text-slate-500">
          Need an account?{" "}
          <Link href="/create-account" className="text-[#4f2bd8] hover:underline">
            Create one
          </Link>
        </p>
      </section>
    </main>
  );
}
