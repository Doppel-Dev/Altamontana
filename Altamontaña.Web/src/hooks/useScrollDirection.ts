/**
 * Hook useScrollDirection - Detecta la dirección del scroll
 * Útil para ocultar/mostrar navbar en mobile
 */

import { useState, useEffect } from 'react';

type ScrollDirection = 'up' | 'down' | null;

interface UseScrollDirectionOptions {
  threshold?: number;
  initialDirection?: ScrollDirection;
}

export const useScrollDirection = (options: UseScrollDirectionOptions = {}): ScrollDirection => {
  const { threshold = 10, initialDirection = null } = options;

  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(initialDirection);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }

      setScrollDirection(scrollY > lastScrollY ? 'down' : 'up');
      setLastScrollY(scrollY);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [lastScrollY, threshold]);

  return scrollDirection;
};

export default useScrollDirection;
