import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(path: string | undefined) {
  if (!path) return '';
  
  // Si es una URL completa (http/https), devolverla tal cual
  if (path.startsWith('http')) return path;
  
  // Si la ruta empieza con /uploads/, es una imagen subida a la API
  if (path.startsWith('/uploads/')) {
    const API_BASE = 'https://altamontana-production.up.railway.app';
    return `${API_BASE}${path}`;
  }
  
  // De lo contrario, asumir que es una imagen estática en el frontend (public/img/)
  return path;
}
