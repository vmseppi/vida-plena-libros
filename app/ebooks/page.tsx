import { PRODUCTS } from "@/lib/ebooks-config";
import EbookCard from "./EbookCard";

export default function EbooksPage() {
  return (
    <main className="min-h-screen bg-brand-peach">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <h1 className="font-serif-heading text-3xl font-bold text-gray-900 md:text-4xl">
          Ebooks
        </h1>
        <p className="mt-4 font-serif-body text-gray-700">
          Catálogo de ebooks y guías de yoga y meditación.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3">
          {PRODUCTS.map((libro) => (
            <EbookCard key={libro.id} libro={libro} />
          ))}
        </div>
      </div>
    </main>
  );
}
