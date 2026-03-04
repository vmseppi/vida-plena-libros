/**
 * Configuración de ebooks y libro físico.
 * Precios en ARS. Única fuente de verdad para carrito y Mercado Pago.
 */

export const EBOOK_IDS = {
  GUIA_RAJA_YOGA: "guia-raja-yoga",
  MANUAL_TOMO_1: "manual-tomo-1",
  MANUAL_TOMO_2: "manual-tomo-2",
  MANUAL_TOMO_3: "manual-tomo-3",
  MANUAL_TOMO_4: "manual-tomo-4",
  TU_MANCIA: "tu-mancia",
} as const;

export type EbookId = (typeof EBOOK_IDS)[keyof typeof EBOOK_IDS];

export interface ProductItem {
  id: EbookId;
  title: string;
  /** Descripción para la página de detalle */
  description: string;
  /** Precio en pesos (ARS). Tu mancia: solo libro, sin envío. */
  price: number;
  /** Si es false, es libro físico (Tu mancia): no va al carrito digital, precio + envío. */
  digital: boolean;
  /** Ruta de la portada en /public */
  coverSrc: string;
  /** Nombre del archivo PDF en content/ebooks (solo digitales) */
  pdfFile?: string;
  /** Ruta del video en /public (ej. /videos/ebooks/guia-raja-yoga.mp4). Opcional. */
  videoSrc?: string;
}

export const PRODUCTS: ProductItem[] = [
  {
    id: EBOOK_IDS.GUIA_RAJA_YOGA,
    title: "Guía de Meditación Raja Yoga",
    description:
      "Una guía completa para adentrarte en la meditación Raja Yoga. Incluye fundamentos, técnicas y prácticas para integrar la meditación en tu vida diaria. Por Claudia Peresson.",
    price: 30_000,
    digital: true,
    coverSrc: "/images/libros/guia_de_meditacion_raja_yoga.png",
    pdfFile: "guia-raja-yoga.pdf",
    videoSrc: "/videos/GUIA%20DE%20MEDITACION_v2.mp4",
  },
  {
    id: EBOOK_IDS.MANUAL_TOMO_1,
    title: "Manual de Yoga en una Vida Plena · Tomo I",
    description:
      "Primer tomo del Manual de Yoga en una Vida Plena. Contenido fundamental para comenzar o profundizar tu práctica. Incluye posturas, respiración y bases filosóficas. Por Claudia Peresson.",
    price: 38_000,
    digital: true,
    coverSrc: "/images/libros/manual_de_yoga_tomo_1.png",
    pdfFile: "manual-tomo-1.pdf",
    videoSrc: "/videos/ebooks/manual-tomo-1.mp4",
  },
  {
    id: EBOOK_IDS.MANUAL_TOMO_2,
    title: "Manual de Yoga en una Vida Plena · Tomo II",
    description:
      "Segundo tomo del Manual de Yoga en una Vida Plena. Profundización en asanas y prácticas. Por Claudia Peresson.",
    price: 20_000,
    digital: true,
    coverSrc: "/images/libros/manual_de_yoga_tomo_2.png",
    pdfFile: "manual-tomo-2.pdf",
  },
  {
    id: EBOOK_IDS.MANUAL_TOMO_3,
    title: "Manual de Yoga en una Vida Plena · Tomo III",
    description:
      "Tercer tomo del Manual de Yoga en una Vida Plena. Avanzado en posturas y secuencias. Por Claudia Peresson.",
    price: 20_000,
    digital: true,
    coverSrc: "/images/libros/manual_de_yoga_tomo_3.png",
    pdfFile: "manual-tomo-3.pdf",
  },
  {
    id: EBOOK_IDS.MANUAL_TOMO_4,
    title: "Manual de Yoga en una Vida Plena · Tomo IV",
    description:
      "Cuarto tomo del Manual de Yoga en una Vida Plena. Cierre de la serie con prácticas integradoras. Por Claudia Peresson.",
    price: 20_000,
    digital: true,
    coverSrc: "/images/libros/manual_de_yoga_tomo_4.png",
    pdfFile: "manual-tomo-4.pdf",
  },
  {
    id: EBOOK_IDS.TU_MANCIA,
    title: "Tu mancia tu sadhana",
    description:
      "Posturas de yoga para mancia y práctica personal. Libro físico disponible solo con envío a domicilio. Por Claudia Peresson.",
    price: 38_000,
    digital: false,
    coverSrc: "/images/libros/mancia_tapa.png",
    videoSrc: "/videos/Tu mancia tu sadhana_tel.mp4",
  },
];

/** Obtener producto por id. */
export function getProductById(id: string): ProductItem | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

/** Solo productos que se pueden agregar al carrito (ebooks digitales). */
export const DIGITAL_PRODUCTS = PRODUCTS.filter((p) => p.digital);

/** Formatear precio para mostrar (ej. "30.000"). */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-AR").format(price);
}
