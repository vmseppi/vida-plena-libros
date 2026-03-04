import Link from "next/link";
import { PRODUCTS, formatPrice } from "@/lib/ebooks-config";

export default function EbooksPage() {
  return (
    <main className="min-h-screen bg-brand-peach">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <h1 className="font-serif-heading text-3xl font-bold text-gray-900 md:text-4xl">
          Ebooks
        </h1>
        <p className="mt-4 font-serif-body text-gray-700">
          Catálogo de ebooks y guías de yoga y meditación.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3">
          {PRODUCTS.map((libro) => (
            <div
              key={libro.id}
              className="group flex flex-col overflow-hidden rounded-lg border-2 border-gray-300/50 bg-white/50 shadow-sm transition hover:border-gray-400/60 hover:shadow-md"
            >
              <Link
                href={`/ebooks/${libro.id}`}
                className="aspect-[3/4] block overflow-hidden bg-gray-100"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={libro.coverSrc}
                  alt={libro.title}
                  className="h-full w-full object-cover transition group-hover:scale-[1.02]"
                />
              </Link>
              <div className="flex flex-1 flex-col p-3">
                <p className="font-serif-body text-center text-sm font-medium text-gray-800">
                  {libro.title}
                </p>
                <p className="mt-1 text-center text-sm font-semibold text-gray-900">
                  ${formatPrice(libro.price)}
                  {!libro.digital && (
                    <span className="block text-xs font-normal text-gray-600">
                      + gastos de envío
                    </span>
                  )}
                </p>
                {libro.digital ? (
                  <button
                    type="button"
                    className="mt-2 w-full rounded-lg bg-brand-red py-2 text-sm font-semibold text-white transition hover:opacity-95"
                    aria-label={`Añadir ${libro.title} al carrito`}
                  >
                    Añadir al carrito
                  </button>
                ) : (
                  <Link
                    href="/carrito?envio=mancia"
                    className="mt-2 block w-full rounded-lg border-2 border-gray-700 bg-transparent py-2 text-center text-sm font-semibold text-gray-800 transition hover:bg-gray-700 hover:text-white"
                  >
                    Solicitar envío a domicilio
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
