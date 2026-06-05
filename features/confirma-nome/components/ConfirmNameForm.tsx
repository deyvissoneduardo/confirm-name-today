"use client";

import { FormEvent } from "react";
import Link from "next/link";

import { useConfirmName } from "../hooks/use-confirm-name";

export function ConfirmNameForm() {
  const { name, setName, isSubmitting, message, handleConfirmName } =
    useConfirmName();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await handleConfirmName();
  }

  return (
    <main
      className="flex min-h-screen items-center justify-center bg-[#0b0f19] px-5 py-8 text-slate-50"
      data-testid="confirm-name-page"
    >
      <form
        aria-label="Confirmar nome"
        className="flex w-full max-w-sm flex-col gap-5 rounded-3xl bg-[#111827] p-5 shadow-2xl shadow-black/30 ring-1 ring-white/10"
        onSubmit={handleSubmit}
      >
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-normal text-white">
            Confirme seu nome
          </h1>
          <p className="text-sm leading-6 text-slate-300">
            Use o nome que será identificado na lista.
          </p>
        </div>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
          Nome
          <input
            aria-label="Nome"
            autoComplete="name"
            className="min-h-14 w-full rounded-2xl border border-transparent bg-[#1f2937] px-4 text-base text-white caret-blue-400 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-[#243044] focus:ring-4 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isSubmitting}
            onChange={(event) => setName(event.target.value)}
            placeholder="Digite seu nome"
            type="text"
            value={name}
          />
        </label>

        <div className="flex flex-col gap-3">
          <button
            className="min-h-14 w-full rounded-full bg-blue-600 px-5 text-base font-semibold text-white shadow-lg shadow-blue-950/40 transition hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-400/30 active:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-900 disabled:text-blue-100 disabled:shadow-none"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Processando..." : "Confirmar"}
          </button>
          <Link
            className="flex min-h-14 w-full items-center justify-center gap-2 rounded-full border border-blue-400/50 bg-blue-500/10 px-5 text-base font-semibold text-blue-100 shadow-sm shadow-blue-950/30 transition hover:border-blue-300 hover:bg-blue-500/20 focus:outline-none focus:ring-4 focus:ring-blue-400/20 active:bg-blue-500/25"
            href="/regras"
          >
            <span
              aria-hidden="true"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500/20 text-lg leading-none text-blue-100"
            >
              i
            </span>
            <span>Ler regras</span>
          </Link>
          {message ? (
            <div
              className={
                message.type === "success"
                  ? "flex items-start gap-3 rounded-2xl border-l-4 border-emerald-300 bg-emerald-500/25 px-4 py-3 text-sm font-semibold leading-5 text-emerald-50 shadow-lg shadow-emerald-950/30 ring-1 ring-emerald-200/40"
                  : "flex items-start gap-3 rounded-2xl border-l-4 border-[#FF2C2C] bg-[#FF2C2C]/25 px-4 py-3 text-sm font-semibold leading-5 text-red-50 shadow-lg shadow-red-950/30 ring-1 ring-[#FF2C2C]/40"
              }
              role="status"
            >
              <span
                aria-hidden="true"
                className={
                  message.type === "success"
                    ? "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-300 text-xs font-black text-emerald-950"
                    : "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FF2C2C] text-xs font-black text-white"
                }
              >
                {message.type === "success" ? "OK" : "!"}
              </span>
              <span>{message.text}</span>
            </div>
          ) : null}
        </div>
      </form>
    </main>
  );
}
