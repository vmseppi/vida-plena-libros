"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { search, type SearchResult } from "@/lib/search-data";

function BuscarContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const [input, setInput] = useState(q);
  const [results, setResults] = useState<SearchResult[]>([]);

  const runSearch = useCallback((term: string) => {
    setResults(search(term));
  }, []);

  useEffect(() => {
    runSearch(q);
    setInput(q);
  }, [q, runSearch]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const term = input.trim();
    if (term) {
      router.push(`/buscar?q=${encodeURIComponent(term)}`);
      runSearch(term);
    }
  }

  return (
    <main className="min-h-screen bg-brand-peach">
      <div className="mx-auto max-w-2xl px-4 py-8 md:px-6 md:py-12">
        <h1 className="font-serif-heading text-2xl font-bold text-gray-900 md:text-3xl">
          Buscar
        </h1>
        <p className="mt-2 font-serif-body text-gray-700">
          Buscá por título de libro o por sección de la web.
        </p>

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="flex gap-2">
            <input
              type="search"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ej. meditación, manual, contacto…"
              className="flex-1 rounded-lg border-2 border-gray-300/70 bg-white px-4 py-2.5 font-serif-body text-gray-900 placeholder:text-gray-500 focus:border-brand-header focus:outline-none"
              autoFocus
            />
            <button
              type="submit"
              className="rounded-lg bg-brand-header px-4 py-2.5 font-serif-body font-semibold text-white transition hover:opacity-95"
            >
              Buscar
            </button>
          </div>
        </form>

        <section className="mt-8">
          {input.trim() === "" ? (
            <p className="font-serif-body text-gray-600">
              Escribí algo arriba para buscar en ebooks y páginas.
            </p>
          ) : results.length === 0 ? (
            <p className="font-serif-body text-gray-600">
              No hay resultados para &quot;{input}&quot;.
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {results.map((r) =>
                r.type === "ebook" ? (
                  <li key={`ebook-${r.id}`}>
                    <Link
                      href={r.href}
                      className="block rounded-lg border-2 border-gray-300/50 bg-white/80 p-4 transition hover:border-brand-header hover:bg-white"
                    >
                      <span className="font-serif-body font-semibold text-gray-900">
                        {r.title}
                      </span>
                      <span className="mt-1 block font-serif-body text-sm text-gray-600 line-clamp-2">
                        {r.description}
                      </span>
                      <span className="mt-1 block text-xs text-gray-500">
                        Libro / Ebook
                      </span>
                    </Link>
                  </li>
                ) : (
                  <li key={`page-${r.href}`}>
                    <Link
                      href={r.href}
                      className="block rounded-lg border-2 border-gray-300/50 bg-white/80 p-4 transition hover:border-brand-header hover:bg-white"
                    >
                      <span className="font-serif-body font-semibold text-gray-900">
                        {r.title}
                      </span>
                      <span className="mt-1 block text-xs text-gray-500">
                        Página
                      </span>
                    </Link>
                  </li>
                )
              )}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

export default function BuscarPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-brand-peach">
          <div className="mx-auto max-w-2xl px-4 py-8 md:px-6 md:py-12">
            <h1 className="font-serif-heading text-2xl font-bold text-gray-900 md:text-3xl">
              Buscar
            </h1>
            <p className="mt-4 font-serif-body text-gray-600">Cargando…</p>
          </div>
        </main>
      }
    >
      <BuscarContent />
    </Suspense>
  );
}
