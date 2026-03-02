export default function ClasesYogaPage() {
  return (
    <main className="min-h-screen bg-brand-toast">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
          Clases de yoga
        </h1>
        <p className="mt-4 text-gray-700">
          Información sobre clases y horarios. (Maqueta — contenido por definir.)
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-lg border-2 border-gray-700/30 bg-white/10 p-6"
            >
              <div className="mb-4 h-32 rounded bg-white/20" />
              <h2 className="font-semibold text-gray-900">Clase {i}</h2>
              <p className="mt-2 text-sm text-gray-700">Descripción placeholder.</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
