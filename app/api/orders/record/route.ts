import { NextRequest, NextResponse } from "next/server";
import { addOrder, type OrderItem, type SavedOrder } from "@/lib/orders";
import { sendOrderEmail } from "@/lib/send-order-email";

const MP_ACCESS_TOKEN =
  process.env.MP_ACCESS_TOKEN ?? process.env.MPACCESS_TOKEN;

export async function POST(request: NextRequest) {
  if (!MP_ACCESS_TOKEN) {
    return NextResponse.json(
      { error: "Mercado Pago no configurado." },
      { status: 500 }
    );
  }

  let body: { payment_id: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "payment_id requerido." },
      { status: 400 }
    );
  }

  const paymentId = body?.payment_id;
  if (!paymentId || typeof paymentId !== "string") {
    return NextResponse.json(
      { error: "payment_id requerido." },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}` },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "No se pudo obtener el pago." },
        { status: res.status }
      );
    }

    const payment = await res.json();

    if (payment.status !== "approved") {
      return NextResponse.json(
        { error: "El pago no está aprobado." },
        { status: 400 }
      );
    }

    const payerEmail =
      payment.payer?.email ??
      payment.additional_info?.payer?.email ??
      "";
    if (!payerEmail) {
      return NextResponse.json(
        { error: "Pago sin email de comprador." },
        { status: 400 }
      );
    }

    const items: OrderItem[] = [];
    const rawItems = payment.additional_info?.items ?? payment.items ?? [];
    if (Array.isArray(rawItems)) {
      for (const it of rawItems) {
        items.push({
          id: String(it.id ?? ""),
          title: String(it.title ?? "Producto"),
          quantity: Number(it.quantity ?? 1),
          unit_price: Number(it.unit_price ?? 0),
        });
      }
    }
    if (items.length === 0 && payment.description) {
      items.push({
        id: payment.id?.toString() ?? paymentId,
        title: payment.description,
        quantity: 1,
        unit_price: Number(payment.transaction_amount ?? 0),
      });
    }

    const order: SavedOrder = {
      payment_id: String(payment.id ?? paymentId),
      payer_email: payerEmail,
      amount: Number(payment.transaction_amount ?? 0),
      currency: payment.currency_id ?? "ARS",
      items,
      date: payment.date_approved ?? payment.date_created ?? new Date().toISOString(),
      status: payment.status ?? "approved",
    };

    await addOrder(order);

    const emailResult = await sendOrderEmail(
      order.payer_email,
      order.items,
      order.payment_id
    );
    if (!emailResult.ok) {
      console.error("[orders/record] Email no enviado:", emailResult.error);
    }

    return NextResponse.json({
      ok: true,
      payment_id: order.payment_id,
      email_sent: emailResult.ok,
    });
  } catch {
    return NextResponse.json(
      { error: "Error al registrar la compra." },
      { status: 500 }
    );
  }
}
