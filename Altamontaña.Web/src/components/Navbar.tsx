/**
 * Navbar - Barra de navegación principal refactorizada
 * Dividida en subcomponentes modulares con mejoras de accesibilidad y responsive
 */

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { NavbarLogo } from './navbar/NavbarLogo';
import { NavbarDesktopMenu } from './navbar/NavbarDesktopMenu';
import { NavbarMobileButton } from './navbar/NavbarMobileButton';
import { NavbarMobileMenu } from './navbar/NavbarMobileMenu';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();
  const { theme } = useTheme();
  const scrollDirection = useScrollDirection({ threshold: 10 });

  const isDark = theme === 'dark';
  const isHomePage = location.pathname === '/';

  // Scroll handler con gradiente suave
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setScrollY(currentScrollY);
          setScrolled(currentScrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar menú móvil en resize a desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determinar si mostrar background
  const shouldShowBg = scrolled || !isHomePage || isOpen;

  // Calcular opacidad basada en scroll (transición suave)
  const scrollOpacity = Math.min(scrollY / 100, 1);

  // Clases de padding con transición suave
  const paddingClass = shouldShowBg ? 'py-3' : 'py-6';

  // Estilo de background con gradiente
  const navStyle = shouldShowBg
    ? {
        backgroundColor: isDark
          ? `rgba(0, 0, 0, ${0.9 * scrollOpacity})`
          : `rgba(255, 255, 255, ${0.9 * scrollOpacity})`,
      }
    : {
        backgroundColor: 'transparent',
      };

  // Ocultar navbar en scroll down en mobile (UX mejorada)
  const hideOnScroll = scrollDirection === 'down' && scrollY > 100 && !isOpen;
  const transformClass = hideOnScroll ? '-translate-y-full' : 'translate-y-0';

  return (
    <>
      <nav
        className={`
          fixed w-full z-[1100] transition-all duration-300
          ${paddingClass}
          ${transformClass}
          backdrop-blur-md
          ${shouldShowBg ? (isDark ? 'border-b border-white/10 shadow-navbar' : 'shadow-sm') : ''}
        `}
        style={{
          ...navStyle,
          paddingTop: 'max(0.75rem, env(safe-area-inset-top))',
        }}
        role="navigation"
        aria-label="Navegación principal"
      >
        <div className="section-container flex justify-between items-center">
          {/* Logo */}
          <NavbarLogo isDark={isDark} shouldShowBg={shouldShowBg} />

          {/* Desktop Menu */}
          <NavbarDesktopMenu isDark={isDark} shouldShowBg={shouldShowBg} />

          {/* Mobile Menu Button */}
          <NavbarMobileButton
            isOpen={isOpen}
            onClick={() => setIsOpen(!isOpen)}
            isDark={isDark}
            shouldShowBg={shouldShowBg}
          />
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <NavbarMobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} isDark={isDark} />
    </>
  );
};

export default Navbar;
