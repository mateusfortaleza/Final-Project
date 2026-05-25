"use client";

import { useState } from "react";
import Link from "next/link";
import {
  IconArrowLeft,
  IconDeviceGamepad2,
  IconLogin2,
  IconShieldLock,
} from "@tabler/icons-react";
import { signInSchema, type SignInInput } from "../src/validation/auth";

type SignInErrors = Partial<Record<keyof SignInInput, string>>;

function firstError(errors?: string[]) {
  return errors?.[0] ?? "";
}

export default function SignInPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminCode, setAdminCode] = useState("");
  const [formErrors, setFormErrors] = useState<SignInErrors>({});
  const [formMessage, setFormMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const result = signInSchema.safeParse({
      name: formData.get("name"),
      gamePin: formData.get("gamePin"),
      isAdmin,
      adminCode,
    });

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      setFormErrors({
        name: firstError(errors.name),
        gamePin: firstError(errors.gamePin),
        adminCode: firstError(errors.adminCode),
      });
      setFormMessage("");
      return;
    }

    setFormErrors({});
    setFormMessage(
      result.data.isAdmin ? "Admin sign-in validated." : "Sign-in validated.",
    );
  }

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

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-2 text-sm font-black">
            Name
            <input
              name="name"
              type="text"
              placeholder="Your name"
              aria-invalid={formErrors.name ? "true" : "false"}
              className={`h-12 rounded-md border bg-slate-50 px-4 text-base font-semibold outline-none transition focus:bg-white ${
                formErrors.name
                  ? "border-[#e21b3c] focus:border-[#e21b3c]"
                  : "border-slate-200 focus:border-[#4f2bd8]"
              }`}
            />
            {formErrors.name ? (
              <span className="text-sm font-bold text-[#e21b3c]">
                {formErrors.name}
              </span>
            ) : null}
          </label>

          <label className="grid gap-2 text-sm font-black">
            Game PIN
            <input
              name="gamePin"
              type="text"
              inputMode="numeric"
              placeholder="438921"
              aria-invalid={formErrors.gamePin ? "true" : "false"}
              className={`h-12 rounded-md border bg-slate-50 px-4 font-mono text-base font-semibold tracking-wide outline-none transition focus:bg-white ${
                formErrors.gamePin
                  ? "border-[#e21b3c] focus:border-[#e21b3c]"
                  : "border-slate-200 focus:border-[#4f2bd8]"
              }`}
            />
            {formErrors.gamePin ? (
              <span className="text-sm font-bold text-[#e21b3c]">
                {formErrors.gamePin}
              </span>
            ) : null}
          </label>

          <label className="flex cursor-pointer items-center justify-between gap-3 rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black transition hover:bg-white">
            <span className="inline-flex items-center gap-2">
              <IconShieldLock size={18} strokeWidth={2.5} />
              I am an admin
            </span>
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(event) => {
                setIsAdmin(event.target.checked);
                setAdminCode("");
                setFormErrors((current) => ({
                  ...current,
                  adminCode: "",
                }));
                setFormMessage("");
              }}
              className="size-5 accent-[#4f2bd8]"
            />
          </label>

          {isAdmin ? (
            <label className="grid gap-2 text-sm font-black">
              Admin code
              <input
                type="password"
                inputMode="numeric"
                value={adminCode}
                onChange={(event) => {
                  setAdminCode(event.target.value);
                  setFormErrors((current) => ({
                    ...current,
                    adminCode: "",
                  }));
                  setFormMessage("");
                }}
                placeholder="Enter code"
                aria-invalid={formErrors.adminCode ? "true" : "false"}
                className={`h-12 rounded-md border bg-slate-50 px-4 font-mono text-base font-semibold tracking-wide outline-none transition focus:bg-white ${
                  formErrors.adminCode
                    ? "border-[#e21b3c] focus:border-[#e21b3c]"
                    : "border-slate-200 focus:border-[#4f2bd8]"
                }`}
              />
              {formErrors.adminCode ? (
                <span className="text-sm font-bold text-[#e21b3c]">
                  {formErrors.adminCode}
                </span>
              ) : null}
            </label>
          ) : null}

          {formMessage ? (
            <p className="rounded-md bg-[#0f9f6e]/10 px-4 py-3 text-sm font-bold text-[#0f7f58]">
              {formMessage}
            </p>
          ) : null}

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
