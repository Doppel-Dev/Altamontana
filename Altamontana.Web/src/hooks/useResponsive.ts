/**
 * Hook useResponsive - Detecta breakpoints de manera consistente
 * Retorna { isMobile, isTablet, isDesktop } basado en window.matchMedia
 */

import { useState, useEffect } from 'react';
import { BREAKPOINTS, MEDIA_QUERIES } from '../constants/designTokens';

interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isDesktopLarge: boolean;
  width: number;
  height: number;
}

export const useResponsive = (): ResponsiveState => {
  const [state, setState] = useState<ResponsiveState>(() => {
    // Valores iniciales para SSR o hydration
    if (typeof window === 'undefined') {
      return {
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        isDesktopLarge: false,
        width: 1024,
        height: 768,
      };
    }

    const width = window.innerWidth;
    return {
      isMobile: width < BREAKPOINTS.tablet,
      isTablet: width >= BREAKPOINTS.tablet && width < BREAKPOINTS.desktop,
      isDesktop: width >= BREAKPOINTS.desktop,
      isDesktopLarge: width >= BREAKPOINTS.desktopLarge,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  });

  useEffect(() => {
    // Crear media queries
    const mobileQuery = window.matchMedia(MEDIA_QUERIES.isMobile);
    const tabletQuery = window.matchMedia(MEDIA_QUERIES.isTablet);
    const desktopQuery = window.matchMedia(MEDIA_QUERIES.isDesktop);
    const desktopLargeQuery = window.matchMedia(MEDIA_QUERIES.desktopLarge);

    const updateState = () => {
      setState({
        isMobile: mobileQuery.matches,
        isTablet: tabletQuery.matches,
        isDesktop: desktopQuery.matches,
        isDesktopLarge: desktopLargeQuery.matches,
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Listener para cambios de tamaño
    const handleResize = () => {
      updateState();
    };

    // Listeners para media queries
    mobileQuery.addEventListener('change', updateState);
    tabletQuery.addEventListener('change', updateState);
    desktopQuery.addEventListener('change', updateState);
    desktopLargeQuery.addEventListener('change', updateState);

    // Listener para resize (para actualizar width/height)
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      mobileQuery.removeEventListener('change', updateState);
      tabletQuery.removeEventListener('change', updateState);
      desktopQuery.removeEventListener('change', updateState);
      desktopLargeQuery.removeEventListener('change', updateState);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return state;
};

export default useResponsive;
