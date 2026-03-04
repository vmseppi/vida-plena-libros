const INSTRUCTORADO_IMAGES: { src: string; alt: string }[] = [
  // Agregá aquí las rutas de imágenes en /public/images/instructorado-yoga/
  // Ej: { src: "/images/instructorado-yoga/foto1.jpg", alt: "Descripción" },
];

export default function InstructoradoYogaPage() {
  return (
    <main className="min-h-screen bg-brand-toast">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <h1 className="font-serif-heading text-3xl font-bold text-gray-900 md:text-4xl">
          Instructorado de yoga
        </h1>
        <p className="mt-4 font-serif-body text-gray-700">
          Información sobre el instructorado y formación en yoga.
        </p>
        <p className="mt-2 font-serif-body font-medium text-gray-800">
          LUNES A JUEVES 18 Y 19 HORAS
        </p>
        <p className="mt-1 font-serif-body text-gray-700">
          27 DE ABRIL 1968 - CÓRDOBA
        </p>

        {INSTRUCTORADO_IMAGES.length > 0 && (
          <div className="masonry-clases mt-10 columns-2 gap-x-3 lg:columns-3 lg:gap-x-5">
            {INSTRUCTORADO_IMAGES.map((item) => (
              <div
                key={item.src}
                className="masonry-clases-item break-inside-avoid mb-3 lg:mb-5"
              >
                <div className="overflow-hidden rounded-lg border-2 border-gray-700/20 bg-white/10 shadow-md transition hover:border-gray-700/40 hover:shadow-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.src} alt={item.alt} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
