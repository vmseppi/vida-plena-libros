export default function SobreLaAutoraPage() {
  return (
    <main className="min-h-screen bg-brand-peach">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
          Sobre la autora
        </h1>
        <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-start">
          <div className="shrink-0 overflow-hidden rounded-lg border-2 border-gray-300/50 bg-white/50 w-full max-w-[280px] sm:w-80 sm:max-w-none md:w-96">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/autora/vida_plena_india.jpg"
              alt="Claudia Peresson - Autora"
              className="block w-full h-auto"
            />
          </div>
          <div className="min-w-0 flex-1 space-y-4 text-gray-700 sm:max-w-md md:max-w-lg">
            Nacida en Buenos Aires en 1969. Claudia Peresson comenzó desde muy temprano a indagar en la ciencia del yoga. Egresada de distintos claustros académicos, su vocación siempre se inclinó a la ciencia milenaria a la cual se dedicaría a lo largo de su vida. Dueña de una especial dedicación y personalidad afín a la vida de un yogui, comenzó a cultivar su secreta aspiración de poder dedicarse algún día a llevar a cabo un emprendimiento en el cual filosofía y profesión pudieran encontrarse. Con el éxito en esta empresa pudo consolidar la instrucción desde hace diez años, de un yoga tradicional, “El yoga” único y verdadero, con el auténtico linaje de los Maestros orientales. En la formación de su trayectoria cuenta con el aval del cursado en las carreras de medicina, ciencias exactas, biología y sicología, de la Universidad Nacional de Córdoba, siendo esta trayectoria académica la que respalda sus enseñanzas para occidentales de una filosofía milenaria de la cual su mayor galardón es el perpetuo discipulado. En sus cursos y talleres el alumno comienza a indagar en los fundamentos de las posturas y técnicas que encierran un universo indescifrable sin el traductor del tiempo y la experiencia. Su mayor título: yoguini, es su mejor presentación social. 
          </div>
        </div>
      </div>
    </main>
  );
}
