import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { getOrdersByEmail } from "@/lib/orders";
import { formatPrice } from "@/lib/ebooks-config";

export default async function MisComprasPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");

  const email = session.user?.email ?? "";
  const orders = await getOrdersByEmail(email);

  return (
    <main className="min-h-screen bg-brand-peach">
      <div className="mx-auto max-w-2xl px-4 py-12 md:px-6 md:py-16">
        <h1 className="font-serif-heading text-3xl font-bold text-gray-900 md:text-4xl">
          Mis compras y recibos
        </h1>
        <p className="mt-4 font-serif-body text-gray-700">
          Hola, {email}. Acá podés ver tus compras. Te enviamos los ebooks y la
          factura al correo indicado en cada compra.
        </p>

        {orders.length === 0 ? (
          <div className="mt-8 rounded-lg border-2 border-gray-300/50 bg-white/50 p-6 font-serif-body text-gray-600">
            <p>Aún no tenés compras registradas.</p>
            <p className="mt-2 text-sm">
              Cuando hagas una compra con esta cuenta (o con este correo en
              Mercado Pago), aparecerá acá.
            </p>
            <p className="mt-2 text-sm">
              Si acabas de pagar y no ves la compra, entrá de nuevo a la página
              de &quot;Gracias por tu compra&quot; con el mismo navegador para
              que quede registrada.
            </p>
          </div>
        ) : (
          <ul className="mt-8 space-y-4">
            {orders.map((order) => (
              <li
                key={order.payment_id}
                className="rounded-lg border-2 border-gray-300/50 bg-white/80 p-4 font-serif-body"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-semibold text-gray-900">
                    Nº {order.payment_id}
                  </span>
                  <span className="text-sm text-gray-600">
                    {new Date(order.date).toLocaleDateString("es-AR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="mt-1 text-gray-700">
                  Total: {order.currency} {formatPrice(order.amount)}
                </p>
                {order.items.length > 0 && (
                  <ul className="mt-2 list-inside list-disc text-sm text-gray-600">
                    {order.items.map((item, i) => (
                      <li key={i}>
                        {item.title} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}

        <p className="mt-6 text-sm text-gray-500">
          <Link href="/" className="underline hover:no-underline">
            Volver al inicio
          </Link>
        </p>
      </div>
    </main>
  );
}
