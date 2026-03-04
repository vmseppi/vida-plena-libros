# Imágenes del sitio

Coloca aquí las imágenes y referéncialas desde las páginas.

## Rutas (desde la raíz del sitio)

| Carpeta        | Uso                         | Ejemplo de ruta en código      |
|----------------|-----------------------------|---------------------------------|
| `images/libros` | Tapas de libros / ebooks    | `/images/libros/tapa-1.jpg`    |
| `images/autora` | Foto de la autora          | `/images/autora/foto.jpg`       |
| `images/hero`   | Imagen principal del hero  | `/images/hero/portada-libro.jpg`|
| `images/clases-yoga` | Imágenes de clases   | `/images/clases-yoga/clase-1.jpg` |

En Next.js, los archivos en `public/` se sirven en la raíz: `public/images/libros/tapa.jpg` → **`/images/libros/tapa.jpg`**.

Para usar con el componente `Image` de Next.js:

```tsx
import Image from "next/image";

<Image src="/images/libros/tapa-1.jpg" alt="Portada" width={200} height={300} />
```
