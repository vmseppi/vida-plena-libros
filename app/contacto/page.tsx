import Link from "next/link";
import { Mail, MessageCircle, MapPin } from "lucide-react";

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-brand-peach">
      <div className="mx-auto max-w-xl px-4 py-12 md:px-6 md:py-16">
        <h1 className="font-serif-heading text-3xl font-bold text-gray-900 md:text-4xl">
          Contacto
        </h1>
        <p className="mt-4 font-serif-body text-gray-700">
          Consultas sobre libros, clases de yoga o envíos.
        </p>

        <ul className="mt-8 flex flex-col gap-6 font-serif-body text-gray-800">
          <li className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-header" />
            <span>
              <strong className="block text-gray-900">Dirección</strong>
              27 de abril 1868, Córdoba, Argentina
            </span>
          </li>
          <li className="flex items-start gap-3">
            <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
            <span>
              <strong className="block text-gray-900">WhatsApp / Celular</strong>
              <Link
                href="https://wa.me/5493518153347"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-header underline underline-offset-2 hover:opacity-90"
              >
                351 815 3347
              </Link>
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand-header" />
            <span>
              <strong className="block text-gray-900">Correo</strong>
              <Link
                href="mailto:clauperesson@gmail.com"
                className="text-brand-header underline underline-offset-2 hover:opacity-90"
              >
                clauperesson@gmail.com
              </Link>
            </span>
          </li>
        </ul>
      </div>
    </main>
  );
}
