"use client";

import { useCart } from "@/lib/cart-context";
import type { EbookId } from "@/lib/ebooks-config";

interface AddToCartButtonProps {
  productId: EbookId;
  label?: string;
  className?: string;
}

export default function AddToCartButton({
  productId,
  label = "Añadir al carrito",
  className = "w-fit rounded-lg bg-brand-red px-6 py-3 text-base font-semibold text-white transition hover:opacity-95",
}: AddToCartButtonProps) {
  const { addItem } = useCart();

  return (
    <button
      type="button"
      onClick={() => addItem(productId)}
      className={className}
      aria-label={label}
    >
      {label}
    </button>
  );
}
