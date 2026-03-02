export default function SobreLaAutoraPage() {
  return (
    <main className="min-h-screen bg-brand-peach">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
          Sobre la autora
        </h1>
        <p className="mt-4 text-gray-700">
          Biografía y trayectoria. (Maqueta — contenido por definir.)
        </p>
        <div className="mt-8 flex flex-col gap-6 sm:flex-row">
          <div className="h-64 w-48 shrink-0 rounded-lg border-2 border-gray-300/50 bg-white/50 sm:h-80 sm:w-56" />
          <div className="flex-1 space-y-4 text-gray-700">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
