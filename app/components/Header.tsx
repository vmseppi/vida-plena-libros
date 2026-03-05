"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Search, User, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-context";

const NAV_LINKS = [
  { href: "/ebooks", label: "Ebooks" },
  { href: "/sobre-la-autora", label: "Sobre la autora" },
  { href: "/clases-yoga", label: "Clases de yoga" },
  { href: "/instructorado-yoga", label: "Instructorado de yoga" },
  { href: "/carrito", label: "Carrito" },
  { href: "/contacto", label: "Contacto" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const { totalCount } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full bg-brand-header text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:gap-6 md:px-6">
        <Link
          href="/"
          className="shrink-0 font-script text-2xl font-normal tracking-tight md:text-3xl lg:text-4xl xl:text-5xl"
        >
          yoga vida plena libros
        </Link>

        {/* Desktop nav - whitespace-nowrap evita que los textos se partan en dos líneas */}
        <nav className="hidden shrink-0 items-center gap-4 md:flex lg:gap-5">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`whitespace-nowrap font-serif-body text-sm font-medium transition hover:opacity-90 ${
                pathname === href ? "underline underline-offset-4" : ""
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/buscar"
            className="rounded p-1.5 hover:bg-white/10"
            aria-label="Buscar"
          >
            <Search className="h-5 w-5" strokeWidth={2} />
          </Link>
          <div className="relative">
            {status === "loading" ? (
              <span className="rounded p-1.5 opacity-70">
                <User className="h-5 w-5" strokeWidth={2} />
              </span>
            ) : session ? (
              <>
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-1.5 rounded p-1.5 hover:bg-white/10"
                  aria-label="Menú cuenta"
                  aria-expanded={userMenuOpen}
                >
                  <User className="h-5 w-5" strokeWidth={2} />
                  <span className="max-w-[120px] truncate text-sm md:max-w-[140px]">
                    {session.user?.email}
                  </span>
                </button>
                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      aria-hidden
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 top-full z-50 mt-1 w-48 rounded-lg border border-white/20 bg-brand-header py-1 shadow-lg">
                      <Link
                        href="/mis-compras"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-3 py-2 text-sm hover:bg-white/10"
                      >
                        Mis compras y recibos
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          setUserMenuOpen(false);
                          signOut();
                        }}
                        className="block w-full px-3 py-2 text-left text-sm hover:bg-white/10"
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  </>
                )}
              </>
            ) : (
              <button
                type="button"
                onClick={() => signIn("google")}
                className="flex items-center gap-1.5 rounded p-1.5 hover:bg-white/10"
                aria-label="Entrar con Google"
              >
                <User className="h-5 w-5" strokeWidth={2} />
                <span className="hidden text-sm sm:inline">Entrar</span>
              </button>
            )}
          </div>
          <Link
            href="/carrito"
            className="relative flex items-center gap-2 rounded bg-brand-cta px-3 py-1.5 text-sm font-semibold text-gray-900 transition hover:opacity-95"
            aria-label={totalCount > 0 ? `Carrito con ${totalCount} productos` : "Carrito"}
          >
            <ShoppingCart className="h-4 w-4" strokeWidth={2} />
            <span className="hidden sm:inline">Carrito</span>
            {totalCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-red text-xs font-bold text-white">
                {totalCount > 99 ? "99+" : totalCount}
              </span>
            )}
          </Link>
        </nav>

        {/* Hamburger button - visible on mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/carrito"
            className="relative rounded p-2 hover:bg-white/10"
            aria-label={totalCount > 0 ? `Carrito con ${totalCount} productos` : "Carrito"}
          >
            <ShoppingCart className="h-5 w-5" />
            {totalCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-red text-[10px] font-bold text-white">
                {totalCount > 99 ? "99+" : totalCount}
              </span>
            )}
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

      {/* Mobile menu panel: altura suficiente y scroll si hace falta */}
      <div
        className={`overflow-hidden transition-all duration-200 ease-out md:hidden ${
          menuOpen ? "max-h-[85vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 border-t border-white/20 bg-brand-header px-4 pb-6 pt-2 max-h-[85vh] overflow-y-auto overscroll-contain">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`font-serif-body rounded px-3 py-2.5 text-sm font-medium hover:bg-white/10 ${
                pathname === href ? "bg-white/15" : ""
              }`}
            >
              {label}
            </Link>
          ))}
          <div className="mt-2 flex gap-2 border-t border-white/20 pt-2">
            <Link
              href="/buscar"
              onClick={() => setMenuOpen(false)}
              className="flex flex-1 items-center justify-center gap-2 rounded bg-white/10 py-2 text-sm"
            >
              <Search className="h-4 w-4" /> Buscar
            </Link>
            {session ? (
              <>
                <Link
                  href="/mis-compras"
                  onClick={() => setMenuOpen(false)}
                  className="flex flex-1 items-center justify-center gap-2 rounded bg-white/10 py-2 text-sm"
                >
                  <User className="h-4 w-4" /> Mis compras
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    signOut();
                  }}
                  className="flex flex-1 items-center justify-center gap-2 rounded bg-white/10 py-2 text-sm"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  signIn("google");
                }}
                className="flex flex-1 items-center justify-center gap-2 rounded bg-white/10 py-2 text-sm"
              >
                <User className="h-4 w-4" /> Entrar con Google
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
