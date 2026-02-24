/**
 * Hook useSiteContent - Centraliza la lógica de carga de contenido del sitio
 * Elimina duplicación del pattern getSiteContent() en 7 archivos
 */

import { useState, useEffect } from 'react';
import { getSiteContent } from '../services/api';

interface SiteContentMap {
  [key: string]: string;
}

interface UseSiteContentReturn {
  content: SiteContentMap;
  loading: boolean;
  error: Error | null;
  getValue: (key: string, fallback?: string) => string;
  refresh: () => void;
}

export const useSiteContent = (): UseSiteContentReturn => {
  const [content, setContent] = useState<SiteContentMap>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchContent = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getSiteContent();

      // Convertir array en map para acceso rápido
      const contentMap = res.data.reduce((acc: SiteContentMap, curr: any) => {
        acc[curr.key] = curr.value;
        return acc;
      }, {});

      setContent(contentMap);
    } catch (err) {
      console.error('Error loading site content:', err);
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  // Helper function para obtener valores con fallback
  const getValue = (key: string, fallback: string = ''): string => {
    return content[key] || fallback;
  };

  // Función para refrescar manualmente el contenido
  const refresh = () => {
    fetchContent();
  };

  return {
    content,
    loading,
    error,
    getValue,
    refresh,
  };
};

export default useSiteContent;
