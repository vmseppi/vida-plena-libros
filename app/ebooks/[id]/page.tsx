import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { getProductById, formatPrice, PRODUCTS } from "@/lib/ebooks-config";
import AddToCartButton from "@/app/components/AddToCartButton";

const WHATSAPP_NUMBER = "5493518153347";
function whatsAppEnvioUrl(bookTitle: string) {
  const text = `Hola, quisiera solicitar envío a domicilio del libro "${bookTitle}".`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EbookDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  return (
    <main className="min-h-screen bg-brand-peach">
      <div className="mx-auto max-w-4xl px-4 py-8 md:px-6 md:py-12">
        <Link
          href="/ebooks"
          className="font-serif-body mb-6 inline-block text-sm font-medium text-gray-600 underline-offset-2 hover:underline"
        >
          ← Volver al catálogo
        </Link>

        <article className="flex flex-col gap-8 md:flex-row md:gap-12">
          <div className="shrink-0">
            <div className="aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-lg border-2 border-gray-300/50 bg-white/50 shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.coverSrc}
                alt={product.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="font-serif-heading text-2xl font-bold text-gray-900 md:text-3xl">
              {product.title}
            </h1>
            <p className="mt-4 font-serif-body text-gray-700 leading-relaxed">
              {product.description}
            </p>

            {product.videoSrc && (
              <div className="mt-6">
                <h2 className="font-serif-heading mb-2 text-lg font-semibold text-gray-900">
                  Video
                </h2>
                <div className="overflow-hidden rounded-lg border-2 border-gray-300/50 bg-black/5">
                  <video
                    controls
                    className="w-full"
                    preload="metadata"
                    poster={product.coverSrc}
                  >
                    <source src={product.videoSrc} type="video/mp4" />
                    Tu navegador no soporta la reproducción de video.
                  </video>
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-xl font-semibold text-gray-900">
                ${formatPrice(product.price)}
                {!product.digital && (
                  <span className="block text-sm font-normal text-gray-600">
                    + gastos de envío
                  </span>
                )}
              </p>
              {product.digital ? (
                <AddToCartButton
                  productId={product.id}
                  label="Añadir al carrito"
                />
              ) : (
                <a
                  href={whatsAppEnvioUrl(product.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/whatsapp inline-flex items-center gap-2 rounded-xl border-2 border-green-600 bg-white/80 px-6 py-3 text-base font-semibold text-gray-800 shadow-sm transition hover:border-green-700 hover:bg-green-600 hover:text-white hover:shadow-md"
                  aria-label="Solicitar envío a domicilio por WhatsApp"
                >
                  <MessageCircle className="h-5 w-5 shrink-0 text-green-600 group-hover/whatsapp:text-white" aria-hidden />
                  <span className="whitespace-nowrap">Solicitar envío a domicilio</span>
                </a>
              )}
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
