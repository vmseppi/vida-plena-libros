import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Sección Hero - fondo #DF4233 */}
      <section className="bg-brand-header text-white">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-16 lg:py-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div className="flex flex-col gap-4 lg:max-w-xl">
              <h1 className="font-script text-4xl font-normal tracking-tight md:text-5xl lg:text-6xl">
                Yoga vida plena libros
              </h1>
              <p className="font-serif-body text-lg text-white/95 md:text-xl">
                Descubre los manuales y la guía de meditación Raja Yoga para
                llevar la práctica a tu día a día.
              </p>
              <Link
                href="/ebooks"
                className="inline-flex w-fit rounded-lg bg-brand-cta px-6 py-3 text-base font-semibold text-gray-900 transition hover:opacity-95"
              >
               SABER MÁS
              </Link>
            </div>
            <div className="flex shrink-0 justify-center lg:justify-end">
              <div className="h-64 w-48 overflow-hidden rounded-lg border-2 border-white/30 shadow-lg md:h-80 md:w-56 lg:h-96 lg:w-64">
                <img
                  src="/images/libros/guia_de_meditacion_raja_yoga.png"
                  alt="Guía de Meditación Raja Yoga - Claudia Peresson"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección media - fondo #EFA079 - Libros */}
      <section className="bg-brand-section-alt text-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16 lg:py-20">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
            <div className="flex flex-1 flex-col gap-4 lg:max-w-md">
              <h2 className="font-serif-heading text-3xl font-bold leading-tight md:text-4xl">
                Nuestros libros
              </h2>
              <p className="font-serif-body text-gray-700">
                Guías y manuales de yoga y meditación para tu práctica personal.
                Descubre cada título y encuentra el que mejor se adapte a tu camino.
              </p>
              <Link
                href="/ebooks"
                className="inline-flex w-fit rounded-lg bg-brand-red px-6 py-3 text-base font-semibold text-white transition hover:opacity-95"
              >
                VER TODOS LOS EBOOKS
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-2 lg:flex-1">
              {[
                {
                  src: "/images/libros/guia_de_meditacion_raja_yoga.png",
                  title: "Guía de Meditación Raja Yoga",
                  alt: "Portada Guía de Meditación Raja Yoga - Claudia Peresson",
                },
                {
                  src: "/images/libros/manual_de_yoga_tomo_1.png",
                  title: "Manual de Yoga en una Vida Plena · Tomo I",
                  alt: "Portada Manual de Yoga en una Vida Plena Tomo I - Claudia Peresson",
                },
                {
                  src: "/images/libros/mancia_tapa.png",
                  title: "Tu mancia tu sadhana",
                  alt: "Portada Tu mancia tu sadhana - Claudia Peresson",
                },
                {
                  src: "/images/libros/manual_de_yoga_tomo_2.png",
                  title: "Manual de Yoga en una Vida Plena · Tomo II",
                  alt: "Portada Manual de Yoga en una Vida Plena Tomo II - Claudia Peresson",
                },
              ].map((libro) => (
                <Link
                  key={libro.src}
                  href="/ebooks"
                  className="group flex flex-col overflow-hidden rounded-lg border-2 border-gray-300/50 bg-white/50 shadow-sm transition hover:border-gray-400/60 hover:shadow-md"
                >
                  <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                    <img
                      src={libro.src}
                      alt={libro.alt}
                      className="h-full w-full object-cover transition group-hover:scale-[1.02]"
                    />
                  </div>
                  <p className="font-serif-body px-2 py-2 text-center text-sm font-medium text-gray-800">
                    {libro.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sección inferior - sobre el autor, fondo naranja tostado */}
      <section className="bg-brand-toast text-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16 lg:py-20">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
            <div className="order-2 lg:order-1 lg:flex-1">
              <div className="max-w-sm overflow-hidden rounded-lg border-2 border-gray-700/30 [&_img]:block [&_img]:w-full [&_img]:h-auto">
                <img
                  src="/images/autora/taj-majal.jpg"
                  alt="Claudia Peresson - Vida Plena"
                  className="block w-full h-auto"
                />
              </div>
            </div>
            <div className="order-1 flex flex-1 flex-col gap-4 lg:order-2">
              <h2 className="font-serif-heading text-3xl font-bold leading-tight md:text-4xl">
              Acerca de la autora Claudia:
              </h2>
              <p className="font-serif-body text-sm font-medium text-gray-800">
                Profesora de yoga y escritora
              </p>
              <p className="font-serif-body text-gray-700">
                Nacida en Buenos Aires en 1969, Claudia Peresson une su
                formación académica con décadas de práctica y enseñanza de yoga
                tradicional. Sus cursos y talleres acercan, con un lenguaje
                claro y cercano, la sabiduría milenaria de los Maestros
                orientales a la vida cotidiana en Occidente.
              </p>
              <Link
                href="/sobre-la-autora"
                className="inline-flex w-fit rounded-lg bg-brand-cta-dark px-6 py-3 text-base font-semibold text-white transition hover:opacity-95"
              >
                  SABER MÁS
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
