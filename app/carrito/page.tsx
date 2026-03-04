"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { getProductById, formatPrice } from "@/lib/ebooks-config";
import { Trash2 } from "lucide-react";

function CarritoContent() {
  const { items, removeItem, updateQuantity, totalCount } = useCart();

  if (totalCount === 0) {
    return (
      <main className="min-h-screen bg-brand-peach">
        <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
          <h1 className="font-serif-heading text-3xl font-bold text-gray-900 md:text-4xl">
            Carrito
          </h1>
          <div className="mt-8 rounded-lg border-2 border-gray-300/50 bg-white/50 p-8 text-center">
            <p className="font-serif-body text-gray-600">
              El carrito está vacío.
            </p>
            <Link
              href="/ebooks"
              className="mt-4 inline-block rounded-lg bg-brand-red px-4 py-2 font-serif-body text-sm font-semibold text-white transition hover:opacity-95"
            >
              Ver ebooks
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const total = items.reduce((sum, { id, quantity }) => {
    const p = getProductById(id);
    return sum + (p ? p.price * quantity : 0);
  }, 0);

  return (
    <main className="min-h-screen bg-brand-peach">
      <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
        <h1 className="font-serif-heading text-3xl font-bold text-gray-900 md:text-4xl">
          Carrito
        </h1>
        <p className="mt-2 font-serif-body text-gray-700">
          {totalCount} {totalCount === 1 ? "producto" : "productos"} en tu
          carrito.
        </p>

        <ul className="mt-8 space-y-4">
          {items.map(({ id, quantity }) => {
            const product = getProductById(id);
            if (!product) return null;
            return (
              <li
                key={id}
                className="flex flex-wrap items-center gap-4 rounded-lg border-2 border-gray-300/50 bg-white/50 p-4 shadow-sm"
              >
                <Link
                  href={`/ebooks/${id}`}
                  className="h-20 w-14 shrink-0 overflow-hidden rounded bg-gray-100"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.coverSrc}
                    alt={product.title}
                    className="h-full w-full object-cover"
                  />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/ebooks/${id}`}
                    className="font-serif-body font-medium text-gray-900 hover:underline"
                  >
                    {product.title}
                  </Link>
                  <p className="mt-0.5 text-sm font-semibold text-gray-800">
                    ${formatPrice(product.price)} × {quantity} = $
                    {formatPrice(product.price * quantity)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateQuantity(id, quantity - 1)}
                    className="h-8 w-8 rounded border border-gray-300 bg-white text-gray-700 transition hover:bg-gray-100"
                    aria-label="Quitar una unidad"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-serif-body text-sm font-semibold text-red-600">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(id, quantity + 1)}
                    className="h-8 w-8 rounded border border-gray-300 bg-white text-gray-700 transition hover:bg-gray-100"
                    aria-label="Agregar una unidad"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(id)}
                    className="rounded p-2 text-red-600 transition hover:bg-red-50"
                    aria-label={`Quitar ${product.title} del carrito`}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 rounded-lg border-2 border-gray-300/50 bg-white/50 p-6">
          <p className="font-serif-body text-lg font-semibold text-gray-900">
            Total: ${formatPrice(total)}
          </p>
          <p className="mt-1 text-sm text-gray-600">
            El pago se procesará con Mercado Pago (próximamente).
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/ebooks"
              className="rounded-lg border-2 border-gray-700 px-4 py-2 font-serif-body text-sm font-semibold text-gray-800 transition hover:bg-gray-700 hover:text-white"
            >
              Seguir comprando
            </Link>
            <button
              type="button"
              disabled
              className="cursor-not-allowed rounded-lg bg-gray-400 px-4 py-2 font-serif-body text-sm font-semibold text-white"
              title="Próximamente: checkout con Mercado Pago"
            >
              Ir a pagar
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function CarritoPage() {
  return <CarritoContent />;
}
