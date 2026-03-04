"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice, type ProductItem } from "@/lib/ebooks-config";

interface EbookCardProps {
  libro: ProductItem;
}

export default function EbookCard({ libro }: EbookCardProps) {
  const { addItem } = useCart();

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border-2 border-gray-300/50 bg-white/50 shadow-sm transition hover:border-gray-400/60 hover:shadow-md">
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
            onClick={() => addItem(libro.id)}
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
  );
}
