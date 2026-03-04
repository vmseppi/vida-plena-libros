import { NextRequest, NextResponse } from "next/server";
import { getProductById, type EbookId } from "@/lib/ebooks-config";

const MP_PREFERENCES_URL = "https://api.mercadopago.com/checkout/preferences";

interface CartItemBody {
  id: EbookId;
  quantity: number;
}

export async function POST(request: NextRequest) {
  const accessToken =
    process.env.MP_ACCESS_TOKEN ?? process.env.MPACCESS_TOKEN;
  if (!accessToken) {
    return NextResponse.json(
      {
        error:
          "Mercado Pago no configurado. Agregá MP_ACCESS_TOKEN o MPACCESS_TOKEN en .env.local y reiniciá el servidor (npm run dev).",
      },
      { status: 500 }
    );
  }

  let body: { items: CartItemBody[]; email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Cuerpo de la petición inválido." },
      { status: 400 }
    );
  }

  const { items: rawItems, email } = body ?? {};
  if (!Array.isArray(rawItems) || rawItems.length === 0) {
    return NextResponse.json(
      { error: "El carrito está vacío o el formato es incorrecto." },
      { status: 400 }
    );
  }

  const baseUrl =
    (process.env.NEXTAUTH_URL || "").replace(/\/$/, "").trim() ||
    "http://localhost:3000";
  const successUrl = `${baseUrl}/carrito/gracias?status=approved`;
  const failureUrl = `${baseUrl}/carrito?status=failure`;
  const pendingUrl = `${baseUrl}/carrito/gracias?status=pending`;
  const useHttps = baseUrl.startsWith("https://");

  const items: { id: string; title: string; quantity: number; unit_price: number; currency_id: string }[] = [];
  for (const { id, quantity } of rawItems as CartItemBody[]) {
    if (quantity < 1) continue;
    const product = getProductById(id);
    if (!product || !product.digital) {
      return NextResponse.json(
        { error: `Producto no válido o no disponible para compra: ${id}` },
        { status: 400 }
      );
    }
    items.push({
      id: product.id,
      title: product.title,
      quantity,
      unit_price: product.price,
      currency_id: "ARS",
    });
  }

  if (items.length === 0) {
    return NextResponse.json(
      { error: "No hay ítems válidos en el carrito." },
      { status: 400 }
    );
  }

  const preferenceBody: Record<string, unknown> = {
    items,
    back_urls: {
      success: successUrl,
      failure: failureUrl,
      pending: pendingUrl,
    },
  };
  // auto_return solo con HTTPS; con HTTP (localhost) MP puede devolver "back_url.success must be defined"
  if (useHttps) {
    preferenceBody.auto_return = "approved";
  }
  if (email?.trim()) {
    preferenceBody.payer = { email: String(email).trim() };
    preferenceBody.metadata = { payer_email: String(email).trim() };
  }

  const preference = preferenceBody;

  try {
    const res = await fetch(MP_PREFERENCES_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preference),
    });

    const data = await res.json();

    if (!res.ok) {
      const msg =
        data?.message ??
        data?.error ??
        (Array.isArray(data?.cause) ? data.cause.map((c: { description?: string }) => c.description).join(". ") : null) ??
        "Error al crear la preferencia.";
      return NextResponse.json(
        { error: typeof msg === "string" ? msg : "Error de Mercado Pago." },
        { status: res.status >= 400 ? res.status : 500 }
      );
    }

    // Preferir sandbox_init_point si existe (modo prueba); en producción MP devuelve solo init_point
    const initPoint = data.sandbox_init_point ?? data.init_point;
    if (!initPoint) {
      return NextResponse.json(
        { error: "Mercado Pago no devolvió la URL de pago." },
        { status: 500 }
      );
    }

    return NextResponse.json({ init_point: initPoint });
  } catch {
    return NextResponse.json(
      { error: "Error al conectar con Mercado Pago." },
      { status: 500 }
    );
  }
}
