import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Sección Hero - fondo #DF4233 */}
      <section className="bg-brand-header text-white">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-16 lg:py-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div className="flex flex-col gap-4 lg:max-w-xl">
              <h1 className="font-serif text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Aviok Novelist
              </h1>
              <p className="text-lg text-white/95 md:text-xl">
                Chour the potadute fiort cute whmmendat
              </p>
              <Link
                href="/sobre-la-autora"
                className="inline-flex w-fit rounded-lg bg-brand-cta px-6 py-3 text-base font-semibold text-gray-900 transition hover:opacity-95"
              >
                LEARN MORE
              </Link>
            </div>
            <div className="flex shrink-0 justify-center lg:justify-end">
              <div className="h-64 w-48 rounded-lg border-2 border-white/30 bg-white/10 md:h-80 md:w-56 lg:h-96 lg:w-64" />
            </div>
          </div>
        </div>
      </section>

      {/* Sección media - fondo #EFA079 */}
      <section className="bg-brand-section-alt text-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16 lg:py-20">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
            <div className="flex flex-1 flex-col gap-4 lg:max-w-md">
              <h2 className="text-3xl font-bold leading-tight md:text-4xl">
                Hbase the foous finds foctmen.
              </h2>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
              <Link
                href="/ebooks"
                className="inline-flex w-fit rounded-lg bg-brand-red px-6 py-3 text-base font-semibold text-white transition hover:opacity-95"
              >
                READ MORE
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-2 lg:flex-1">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg border-2 border-gray-300/50 bg-white/50"
                />
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
              <div className="aspect-[4/5] max-w-sm rounded-lg border-2 border-gray-700/30 bg-white/10" />
            </div>
            <div className="order-1 flex flex-1 flex-col gap-4 lg:order-2">
              <h2 className="text-3xl font-bold leading-tight md:text-4xl">
                About the Author Foce:
              </h2>
              <p className="text-sm font-medium text-gray-800">
                Subtítulo descriptivo
              </p>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <Link
                href="/sobre-la-autora"
                className="inline-flex w-fit rounded-lg bg-brand-cta-dark px-6 py-3 text-base font-semibold text-white transition hover:opacity-95"
              >
                LEARN MORE
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
