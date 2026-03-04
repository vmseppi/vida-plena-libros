"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useCart } from "@/lib/cart-context";

function GraciasContent() {
  const searchParams = useSearchParams();
  // Mercado Pago redirige con: status, payment_id, collection_status, external_reference, merchant_order_id
  const status =
    searchParams.get("status") ?? searchParams.get("collection_status");
  const paymentId = searchParams.get("payment_id");
  const { clearCart } = useCart();

  useEffect(() => {
    if (status === "approved") {
      clearCart();
    }
  }, [status, clearCart]);

  const isApproved = status === "approved";
  const isPending = status === "pending";
  const isRejected = status === "rejected";

  return (
    <main className="min-h-screen bg-brand-peach">
      <div className="mx-auto max-w-2xl px-4 py-12 md:px-6 md:py-16 text-center">
        <h1 className="font-serif-heading text-3xl font-bold text-gray-900 md:text-4xl">
          {isApproved && "Gracias por tu compra"}
          {isPending && "Pago pendiente"}
          {isRejected && "Pago no realizado"}
          {!isApproved && !isPending && !isRejected && "Gracias"}
        </h1>
        <p className="mt-4 font-serif-body text-gray-700">
          {isApproved &&
            "Tu pago fue aprobado. Te enviaremos los ebooks y la factura al correo indicado en la compra."}
          {isPending &&
            "Tu pago está en proceso. Cuando se acredite, te enviaremos los ebooks y la factura al correo indicado."}
          {isRejected &&
            "El pago fue rechazado o cancelado. Podés intentar de nuevo desde el carrito."}
          {!isApproved && !isPending && !isRejected &&
            "Recibirás más información por correo una vez confirmado el pago."}
        </p>
        {paymentId && (
          <p className="mt-2 font-serif-body text-sm text-gray-500">
            Nº de operación: {paymentId}
          </p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {isRejected && (
            <Link
              href="/carrito"
              className="rounded-lg bg-brand-red px-4 py-2 font-serif-body text-sm font-semibold text-white transition hover:opacity-95"
            >
              Volver al carrito
            </Link>
          )}
          <Link
            href="/ebooks"
            className="rounded-lg bg-brand-red px-4 py-2 font-serif-body text-sm font-semibold text-white transition hover:opacity-95"
          >
            Ver más ebooks
          </Link>
          <Link
            href="/"
            className="rounded-lg border-2 border-gray-700 px-4 py-2 font-serif-body text-sm font-semibold text-gray-800 transition hover:bg-gray-700 hover:text-white"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function GraciasPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-brand-peach flex items-center justify-center">
          <p className="font-serif-body text-gray-600">Cargando…</p>
        </main>
      }
    >
      <GraciasContent />
    </Suspense>
  );
}
