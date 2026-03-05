"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice, type ProductItem } from "@/lib/ebooks-config";

const WHATSAPP_NUMBER = "5493518153347";
const WHATSAPP_ENVIO_TEXT = "Hola, quisiera solicitar envío a domicilio.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_ENVIO_TEXT)}`;

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
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group/whatsapp mt-2 flex min-h-[2.75rem] items-center justify-center gap-2 rounded-xl border-2 border-green-600 bg-white/80 px-3 py-2.5 text-center text-xs font-semibold leading-tight text-gray-800 shadow-sm transition hover:border-green-700 hover:bg-green-600 hover:text-white hover:shadow-md sm:text-sm"
            aria-label="Solicitar envío a domicilio por WhatsApp"
          >
            <MessageCircle className="h-4 w-4 shrink-0 text-green-600 group-hover/whatsapp:text-white" aria-hidden />
            <span className="break-words">Solicitar envío a domicilio</span>
          </a>
        )}
      </div>
    </div>
  );
}
