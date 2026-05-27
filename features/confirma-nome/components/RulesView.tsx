"use client";

import Link from "next/link";

import { useRules } from "../hooks/use-rules";

export function RulesView() {
  const { rules, isLoading, error } = useRules();

  return (
    <main className="min-h-screen bg-[#0b0f19] px-5 py-8 text-slate-50">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-sm flex-col gap-5 rounded-3xl bg-[#111827] p-5 shadow-2xl shadow-black/30 ring-1 ring-white/10">
        <div className="space-y-1">
          <p className="text-sm font-medium text-blue-300">Regras do jogo</p>
          <h1 className="text-2xl font-semibold tracking-normal text-white">
            Leia antes de confirmar
          </h1>
          <p className="text-sm leading-6 text-slate-300">
            Estas regras são carregadas em modo somente leitura.
          </p>
        </div>

        <div
          aria-live="polite"
          className="flex-1 overflow-hidden rounded-3xl bg-[#1f2937] ring-1 ring-white/10"
        >
          {isLoading ? (
            <p className="px-4 py-4 text-sm text-slate-300">
              Carregando regras...
            </p>
          ) : null}

          {error ? (
            <p className="m-3 rounded-2xl bg-red-400/10 px-4 py-3 text-sm leading-5 text-red-200 ring-1 ring-red-300/20">
              {error}
            </p>
          ) : null}

          {!isLoading && !error && rules.length === 0 ? (
            <p className="px-4 py-4 text-sm text-slate-300">
              Nenhuma regra cadastrada.
            </p>
          ) : null}

          {!isLoading && !error && rules.length > 0 ? (
            <ol className="max-h-[62vh] divide-y divide-white/10 overflow-y-auto">
              {rules.map((rule) => (
                <li
                  className="grid grid-cols-[2.25rem_1fr] gap-3 px-4 py-4"
                  key={`${rule.id}-${rule.text}`}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/15 text-sm font-semibold text-blue-200">
                    {rule.id}
                  </span>
                  <p className="self-center text-sm leading-6 text-slate-100">
                    {rule.text}
                  </p>
                </li>
              ))}
            </ol>
          ) : null}
        </div>

        <Link
          className="flex min-h-14 w-full items-center justify-center rounded-full border border-blue-400/40 px-5 text-base font-semibold text-blue-100 transition hover:bg-blue-500/10 focus:outline-none focus:ring-4 focus:ring-blue-400/20"
          href="/"
        >
          Voltar para confirmar nome
        </Link>
      </section>
    </main>
  );
}
