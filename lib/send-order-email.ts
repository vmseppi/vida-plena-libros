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

  const productsList =
    attachments.length > 0 && productNames.length > 0
      ? productNames.map((name) => `• ${name}`).join("<br/>")
      : "";

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tu compra - Vida Plena Libros</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
</head>
<body style="margin:0; padding:0; background-color:#FEE8D6; font-family: 'Lora', Georgia, serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FEE8D6;">
    <tr>
      <td align="center" style="padding: 32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 520px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(37, 64, 64, 0.12);">
          <tr>
            <td style="background-color: #DF4233; padding: 24px 28px; text-align: center;">
              <h1 style="margin:0; font-family: 'Playfair Display', Georgia, serif; font-size: 26px; font-weight: 700; color: #ffffff; letter-spacing: 0.02em;">
                Vida Plena Libros
              </h1>
              <p style="margin: 8px 0 0; font-family: 'Lora', Georgia, serif; font-size: 14px; color: rgba(255,255,255,0.95);">
                Tu compra fue aprobada
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 28px;">
              <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #254040;">
                Hola,
              </p>
              <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #254040;">
                Gracias por tu compra. Tu pago fue aprobado correctamente.
              </p>
              <p style="margin: 0 0 20px; font-size: 15px; line-height: 1.6; color: #254040;">
                <strong>Nº de operación:</strong> ${paymentId}
              </p>
              ${
                attachments.length > 0
                  ? `<p style="margin: 0 0 8px; font-size: 16px; line-height: 1.6; color: #254040;">
                En este correo vas a encontrar los ebooks que compraste:
              </p>
              <p style="margin: 0 0 20px; font-size: 15px; line-height: 1.8; color: #254040;">
                ${productsList}
              </p>
              <p style="margin: 0 0 24px; font-size: 14px; line-height: 1.5; color: #5a6c6c;">
                Revisá los archivos adjuntos para descargar tus PDFs.
              </p>`
                  : `<p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #254040;">
                Tu compra fue registrada correctamente.
              </p>`
              }
              <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #254040;">
                Saludos,<br/>
                <strong style="color: #DF4233;">Claudia Peresson</strong><br/>
                <span style="font-size: 14px; color: #5a6c6c;">Vida Plena Libros</span>
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #254040; padding: 16px 28px; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.85);">
                Yoga, meditación y vida plena — manuales y guías para tu práctica
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

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
