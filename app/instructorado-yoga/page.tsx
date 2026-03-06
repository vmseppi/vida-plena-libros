const INSTRUCTORADO_BASE = "/images/clases-yoga/instructorado";

const INSTRUCTORADO_IMAGES: { src: string; alt: string }[] = [
  { src: `${INSTRUCTORADO_BASE}/2014consultaintru.jpg`, alt: "Consulta e instrucción 2014" },
  { src: `${INSTRUCTORADO_BASE}/alumna2018.jpg`, alt: "Alumna instructorado 2018" },
  { src: `${INSTRUCTORADO_BASE}/cookie2014.jpg`, alt: "Instructorado 2014" },
  { src: `${INSTRUCTORADO_BASE}/gemelas2018.jpg`, alt: "Gemelas instructorado 2018" },
  { src: `${INSTRUCTORADO_BASE}/promo2014.jpg`, alt: "Promo instructorado 2014" },
  { src: `${INSTRUCTORADO_BASE}/promo2016.jpg`, alt: "Promo instructorado 2016" },
  { src: `${INSTRUCTORADO_BASE}/promo2017.jpg`, alt: "Promo instructorado 2017" },
  { src: `${INSTRUCTORADO_BASE}/promo2018.jpg`, alt: "Promo instructorado 2018" },
  { src: `${INSTRUCTORADO_BASE}/promo2019.jpg`, alt: "Promo instructorado 2019" },
  { src: `${INSTRUCTORADO_BASE}/promo2020.jpg`, alt: "Promo instructorado 2020" },
  { src: `${INSTRUCTORADO_BASE}/salon2016.jpg`, alt: "Salón instructorado 2016" },
  { src: `${INSTRUCTORADO_BASE}/salon2018.jpg`, alt: "Salón instructorado 2018" },
  { src: `${INSTRUCTORADO_BASE}/yoganandacuadro.jpg`, alt: "Yogananda - cuadro" },
];

export default function InstructoradoYogaPage() {
  return (
    <main className="min-h-screen bg-brand-peach">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <h1 className="font-serif-heading text-3xl font-bold text-gray-900 md:text-4xl">
          Instructorado de yoga
        </h1>

        <section className="mt-6 space-y-6 font-serif-body text-gray-800">
          <p className="text-lg leading-relaxed">
            No es solo un curso, es la transmisión de una herencia. Con el respaldo de un linaje ancestral y siendo la tercera generación de profesoras de yoga, te invitamos a nuestra formación anual de marzo a diciembre. ✨🙏✨
          </p>

          <div>
            <h2 className="font-serif-heading text-xl font-semibold text-gray-900">
              Instructorado de Yoga y Raja Yoga
            </h2>
            <p className="mt-2 leading-relaxed">
              Instructorado presencial de duración anual. Consta del curso presencial de 2 sábados al mes de marzo a diciembre incluido. Más dos clases semanales con opción de clases grabadas o presenciales.
            </p>
          </div>

          <div>
            <h2 className="font-serif-heading text-xl font-semibold text-gray-900">
              ¿Qué vas a dominar?
            </h2>
            <ul className="mt-3 space-y-2">
              <li><span className="mr-1">🧘‍♀️</span> <strong>70 Ásanas:</strong> Aprendé a practicarlas y, sobre todo, a dirigirlas con precisión.</li>
              <li><span className="mr-1">🌀</span> <strong>Técnicas avanzadas:</strong> Herramientas profundas de meditación y respiración.</li>
              <li><span className="mr-1">✨</span> <strong>Autorrealización:</strong> Una formación para tu propio ser, que te permitirá inspirar a otros.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif-heading text-xl font-semibold text-gray-900">
              Cursado pensado para tu vida
            </h2>
            <ul className="mt-3 space-y-2">
              <li><span className="mr-1">🗓️</span> 2 sábados presenciales al mes.</li>
              <li><span className="mr-1">💻</span> 2 clases semanales (presenciales o grabadas).</li>
            </ul>
          </div>

          <p className="text-lg font-medium text-gray-900">
            ¡Iniciamos en marzo! Sumate a una tradición real.
          </p>

          <div className="rounded-lg border-2 border-brand-cta-dark/30 bg-white/60 p-4">
            <p className="font-semibold text-gray-900">📱 WhatsApp: 3518153347</p>
            <p className="mt-1 text-sm text-gray-700">Consultas e inscripción</p>
          </div>

          <div className="mt-8">
            <h2 className="font-serif-heading mb-3 text-xl font-semibold text-gray-900">
              Video
            </h2>
            <div className="overflow-hidden rounded-lg border-2 border-gray-300/50 bg-black/5">
              <video
                controls
                className="w-full"
                preload="metadata"
              >
                <source src="/videos/VIDEO_INSTRUCTORADO_YOGA_2021_1080P.mp4" type="video/mp4" />
                Tu navegador no soporta la reproducción de video.
              </video>
            </div>
          </div>
        </section>
        {INSTRUCTORADO_IMAGES.length > 0 && (
          <div className="masonry-clases mt-10 columns-2 gap-x-3 lg:columns-3 lg:gap-x-5">
            {INSTRUCTORADO_IMAGES.map((item) => (
              <div
                key={item.src}
                className="masonry-clases-item break-inside-avoid mb-3 lg:mb-5"
              >
                <div className="overflow-hidden rounded-lg border-2 border-gray-700/20 bg-white/10 shadow-md transition hover:border-gray-700/40 hover:shadow-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.src} alt={item.alt} className="w-full h-auto" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
