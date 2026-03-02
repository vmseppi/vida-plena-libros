export default function CarritoPage() {
  return (
    <main className="min-h-screen bg-brand-peach">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">Carrito</h1>
        <p className="mt-4 text-gray-700">
          Tu carrito de compras. (Maqueta — contenido por definir.)
        </p>
        <div className="mt-8 rounded-lg border-2 border-gray-300/50 bg-white/50 p-8 text-center">
          <p className="text-gray-600">El carrito está vacío.</p>
        </div>
      </div>
    </main>
  );
}
