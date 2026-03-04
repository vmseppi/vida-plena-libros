import { PRODUCTS } from "@/lib/ebooks-config";

/** Páginas estáticas para la búsqueda (título y ruta). */
export const SEARCH_PAGES = [
  { title: "Ebooks", href: "/ebooks" },
  { title: "Sobre la autora", href: "/sobre-la-autora" },
  { title: "Clases de yoga", href: "/clases-yoga" },
  { title: "Carrito", href: "/carrito" },
  { title: "Contacto", href: "/contacto" },
  { title: "Inicio", href: "/" },
];

export type SearchResultEbook = {
  type: "ebook";
  id: string;
  title: string;
  description: string;
  href: string;
};

export type SearchResultPage = {
  type: "page";
  title: string;
  href: string;
};

export type SearchResult = SearchResultEbook | SearchResultPage;

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

export function search(query: string): SearchResult[] {
  const q = normalize(query).trim();
  if (!q) return [];

  const results: SearchResult[] = [];

  for (const p of PRODUCTS) {
    const matchTitle = normalize(p.title).includes(q);
    const matchDesc = normalize(p.description).includes(q);
    if (matchTitle || matchDesc) {
      results.push({
        type: "ebook",
        id: p.id,
        title: p.title,
        description: p.description,
        href: `/ebooks/${p.id}`,
      });
    }
  }

  for (const page of SEARCH_PAGES) {
    if (normalize(page.title).includes(q)) {
      results.push({
        type: "page",
        title: page.title,
        href: page.href,
      });
    }
  }

  return results;
}
