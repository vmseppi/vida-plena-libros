import { NextResponse } from "next/server";

/**
 * POST /api/contacto
 * Recibe nombre, email, mensaje. Por ahora solo devuelve éxito.
 * Más adelante: integrar Nodemailer (o Resend) para enviar a tu correo.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, email, mensaje } = body;
    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: "Faltan nombre, email o mensaje" },
        { status: 400 }
      );
    }
    // TODO: enviar correo con Nodemailer al dueño del sitio
    // ej. await sendEmail({ to: process.env.CONTACTO_EMAIL, from: email, subject: `Contacto: ${nombre}`, text: mensaje });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
