export interface Book {
  id: string;
  book_title: string;
  image_url: string;
  author: string;
  price?: number;
}

export function validateUrl(url: string) {
  // 1. Verificar si la URL tiene HTTPS
  if (!url.startsWith('https://')) {
    return false;
  }

  // 2. Verificar el dominio
  const domain = new URL(url).hostname;
  const availableDomains = [
    'www.buscalibre.com',
    'www.buscalibre.cl',
    'www.buscalibre.co',
    'www.buscalibre.pe',
    // Agrega aquí otros dominios de Busqueda Libre que necesites
  ];
  if (!availableDomains.includes(domain)) {
    return false;
  }

  // 3. Verificar la estructura de la URL usando una expresión regular
  const regex = /^\/libro-[a-z-]+(?:\/[0-9]+)+\/p\/[0-9]+$/; // Expresión regular corregida
  const pathname = new URL(url).pathname;

  if (!regex.test(pathname)) {
    return false;
  }

  return true;
}