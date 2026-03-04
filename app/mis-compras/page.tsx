import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function MisComprasPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");

  return (
    <main className="min-h-screen bg-brand-peach">
      <div className="mx-auto max-w-2xl px-4 py-12 md:px-6 md:py-16">
        <h1 className="font-serif-heading text-3xl font-bold text-gray-900 md:text-4xl">
          Mis compras y recibos
        </h1>
        <p className="mt-4 font-serif-body text-gray-700">
          Hola, {session.user?.email}. Acá vas a poder ver tus compras y
          descargar recibos cuando esté implementado el carrito y Mercado Pago.
        </p>
        <div className="mt-8 rounded-lg border-2 border-gray-300/50 bg-white/50 p-6 font-serif-body text-gray-600">
          <p>Aún no tenés compras registradas.</p>
          <p className="mt-2 text-sm">
            Cuando hagas una compra con esta cuenta, aparecerá acá junto con el
            enlace para descargar la factura.
          </p>
        </div>
      </div>
    </main>
  );
}
