const CLASES_IMAGES = [
  { src: "/images/clases-yoga/srf_claudia_loto.jpg", alt: "Clases de yoga - Claudia" },
  { src: "/images/clases-yoga/promo_2019.jpg", alt: "Promo 2019" },
  { src: "/images/clases-yoga/jornada_2018.jpg", alt: "Jornada 2018" },
  { src: "/images/clases-yoga/capilla_2019.jpg", alt: "Capilla 2019" },
  { src: "/images/clases-yoga/yoga_embarazadas.jpg", alt: "Yoga para embarazadas" },
  { src: "/images/clases-yoga/promo_2018.jpg", alt: "Promo 2018" },
  { src: "/images/clases-yoga/caminata_2019.jpg", alt: "Caminata 2019" },
  { src: "/images/clases-yoga/capilla_2015.jpg", alt: "Capilla 2015" },
  { src: "/images/clases-yoga/promo_2019_b.jpg", alt: "Promo 2019" },
  { src: "/images/clases-yoga/consul_inida_2015.jpg", alt: "Consul India 2015" },
  { src: "/images/clases-yoga/gemelas.jpg", alt: "Clase - Gemelas" },
  { src: "/images/clases-yoga/falda_carmen.jpg", alt: "Clase - Falda Carmen" },
  { src: "/images/clases-yoga/promo_2015.jpg", alt: "Promo 2015" },
  { src: "/images/clases-yoga/promo_2018_b.jpg", alt: "Promo 2018" },
  { src: "/images/clases-yoga/catalina.png", alt: "Clase - Catalina" },
];

export default function ClasesYogaPage() {
  return (
    <main className="min-h-screen bg-brand-peach">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <h1 className="font-serif-heading text-3xl font-bold text-gray-900 md:text-4xl">
          Clases de yoga
        </h1>
        <p className="mt-4 font-serif-body text-gray-700">
          Información sobre clases y horarios.
        </p>
        <p className="mt-2 font-serif-body font-medium text-gray-800">
          LUNES A JUEVES 18 Y 19 HORAS
        </p>
        <p className="mt-1 font-serif-body text-gray-700">
          27 DE ABRIL 1968 - CÓRDOBA
        </p>

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
              <source src="/videos/clasesdeyoga.mp4" type="video/mp4" />
              Tu navegador no soporta la reproducción de video.
            </video>
          </div>
        </div>

        <div className="masonry-clases mt-10 columns-2 gap-x-3 lg:columns-3 lg:gap-x-5">
          {CLASES_IMAGES.map((item) => (
            <div key={item.src} className="masonry-clases-item break-inside-avoid mb-3 lg:mb-5">
              <div className="overflow-hidden rounded-lg border-2 border-gray-700/20 bg-white/10 shadow-md transition hover:border-gray-700/40 hover:shadow-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.alt}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
