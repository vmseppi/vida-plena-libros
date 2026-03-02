export default function EbooksPage() {
  return (
    <main className="min-h-screen bg-brand-peach">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">Ebooks</h1>
        <p className="mt-4 text-gray-700">
          Catálogo de ebooks. (Maqueta — contenido por definir.)
        </p>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="aspect-[3/4] rounded-lg border-2 border-gray-300/50 bg-white/50"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
