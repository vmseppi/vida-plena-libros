/**
 * Órdenes guardadas por email del comprador.
 * Requiere Vercel KV (Redis) configurado en el proyecto; las variables se inyectan al conectar el store.
 */

import { kv } from "@vercel/kv";

const ORDERS_KEY_PREFIX = "orders:";

export interface OrderItem {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
}

export interface SavedOrder {
  payment_id: string;
  payer_email: string;
  amount: number;
  currency: string;
  items: OrderItem[];
  date: string; // ISO
  status: string;
}

export async function getOrdersByEmail(email: string): Promise<SavedOrder[]> {
  const list = await kv.get<SavedOrder[]>(`${ORDERS_KEY_PREFIX}${email}`);
  if (!Array.isArray(list)) return [];
  return list.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Guarda la orden. Si `storeUnderEmail` se indica (ej. usuario logueado), la orden
 * queda asociada a ese email (aparece en "Mis compras" de ese usuario). Si no, se usa payer_email.
 */
export async function addOrder(
  order: SavedOrder,
  options?: { storeUnderEmail?: string }
): Promise<void> {
  const email = options?.storeUnderEmail ?? order.payer_email;
  const key = `${ORDERS_KEY_PREFIX}${email}`;
  const list = (await kv.get<SavedOrder[]>(key)) ?? [];
  if (list.some((o) => o.payment_id === order.payment_id)) return;
  await kv.set(key, [...list, order]);
}
