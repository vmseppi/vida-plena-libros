/**
 * Envío de email post-compra con Resend.
 * Usa RESEND_API_KEY y opcionalmente EMAIL_FROM (por defecto onboarding@resend.dev).
 */

import { Resend } from "resend";
import path from "path";
import fs from "fs";
import { getProductById } from "./ebooks-config";
import type { OrderItem } from "./orders";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const EMAIL_FROM = process.env.EMAIL_FROM ?? "Vida Plena Libros <onboarding@resend.dev>";

const EBOOKS_DIR = path.join(process.cwd(), "content", "ebooks");

export async function sendOrderEmail(
  to: string,
  items: OrderItem[],
  paymentId: string
): Promise<{ ok: boolean; error?: string }> {
  if (!RESEND_API_KEY) {
    return { ok: false, error: "RESEND_API_KEY no configurado" };
  }

  const resend = new Resend(RESEND_API_KEY);

  const attachments: { filename: string; content: Buffer }[] = [];
  const productNames: string[] = [];

  for (const item of items) {
    const product = getProductById(item.id);
    if (product?.pdfFile) {
      const pdfPath = path.join(EBOOKS_DIR, product.pdfFile);
      if (fs.existsSync(pdfPath)) {
        try {
          const content = fs.readFileSync(pdfPath);
          attachments.push({ filename: product.pdfFile, content });
          productNames.push(product.title);
        } catch {
          // omitir PDF si falla la lectura
        }
      }
    } else {
      productNames.push(item.title);
    }
  }

  const subject = "Tu compra - Vida Plena Libros";
  const html = `
    <p>Hola,</p>
    <p>Gracias por tu compra. Tu pago fue aprobado (Nº ${paymentId}).</p>
    ${
      attachments.length > 0
        ? `<p>En este correo vas a encontrar los ebooks que compraste${productNames.length > 0 ? ": " + productNames.join(", ") : ""}.</p>`
        : "<p>Tu compra fue registrada correctamente.</p>"
    }
    <p>Saludos,<br/>Claudia Peresson – Vida Plena Libros</p>
  `;

  try {
    await resend.emails.send({
      from: EMAIL_FROM,
      to: [to],
      subject,
      html,
      attachments:
        attachments.length > 0
          ? attachments.map((a) => ({ filename: a.filename, content: a.content }))
          : undefined,
    });
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error al enviar email";
    return { ok: false, error: message };
  }
}
