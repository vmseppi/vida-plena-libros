"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Search, User, ShoppingCart } from "lucide-react";

const NAV_LINKS = [
  { href: "/ebooks", label: "Ebooks" },
  { href: "/sobre-la-autora", label: "Sobre la autora" },
  { href: "/clases-yoga", label: "Clases de yoga" },
  { href: "/carrito", label: "Carrito" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-brand-header text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="text-lg font-semibold tracking-wide md:text-xl">
          VIDA PLENA LIBROS
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition hover:opacity-90 ${
                pathname === href ? "underline underline-offset-4" : ""
              }`}
            >
              {label}
            </Link>
          ))}
          <button
            type="button"
            className="rounded p-1.5 hover:bg-white/10"
            aria-label="Buscar"
          >
            <Search className="h-5 w-5" strokeWidth={2} />
          </button>
          <button
            type="button"
            className="rounded p-1.5 hover:bg-white/10"
            aria-label="Usuario"
          >
            <User className="h-5 w-5" strokeWidth={2} />
          </button>
          <Link
            href="/carrito"
            className="flex items-center gap-2 rounded bg-brand-cta px-3 py-1.5 text-sm font-semibold text-gray-900 transition hover:opacity-95"
          >
            <ShoppingCart className="h-4 w-4" strokeWidth={2} />
            <span className="hidden sm:inline">ADD ITEM</span>
          </Link>
        </nav>

        {/* Hamburger button - visible on mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/carrito"
            className="rounded p-2 hover:bg-white/10"
            aria-label="Carrito"
          >
            <ShoppingCart className="h-5 w-5" />
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded p-2 hover:bg-white/10"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
          >
            <span className="block h-5 w-6">
              {menuOpen ? (
                <span className="text-xl leading-none" aria-hidden>✕</span>
              ) : (
                <span className="flex h-full w-6 flex-col justify-between" aria-hidden>
                  <span className="h-0.5 w-full rounded-full bg-current" />
                  <span className="h-0.5 w-full rounded-full bg-current" />
                  <span className="h-0.5 w-full rounded-full bg-current" />
                </span>
              )}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`overflow-hidden transition-all duration-200 ease-out md:hidden ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 border-t border-white/20 bg-brand-header px-4 pb-4 pt-2">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`rounded px-3 py-2.5 text-sm font-medium hover:bg-white/10 ${
                pathname === href ? "bg-white/15" : ""
              }`}
            >
              {label}
            </Link>
          ))}
          <div className="mt-2 flex gap-2 border-t border-white/20 pt-2">
            <button
              type="button"
              className="flex flex-1 items-center justify-center gap-2 rounded bg-white/10 py-2 text-sm"
            >
              <Search className="h-4 w-4" /> Buscar
            </button>
            <button
              type="button"
              className="flex flex-1 items-center justify-center gap-2 rounded bg-white/10 py-2 text-sm"
            >
              <User className="h-4 w-4" /> Cuenta
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
