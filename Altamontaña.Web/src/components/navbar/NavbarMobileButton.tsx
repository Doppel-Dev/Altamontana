/**
 * NavbarMobileButton - Botón hamburguesa para menú móvil
 */

import { Menu, X } from 'lucide-react';

interface NavbarMobileButtonProps {
  isOpen: boolean;
  onClick: () => void;
  isDark: boolean;
  shouldShowBg: boolean;
}

export const NavbarMobileButton: React.FC<NavbarMobileButtonProps> = ({
  isOpen,
  onClick,
  isDark,
  shouldShowBg,
}) => {
  return (
    <button
      className={`md:hidden p-2 z-50 transition-colors min-w-touch min-h-touch flex items-center justify-center focus-visible-ring ${
        isOpen
          ? isDark
            ? 'text-brand-orange'
            : 'text-brand-blue'
          : shouldShowBg
          ? isDark
            ? 'text-white'
            : 'text-brand-blue'
          : 'text-white'
      }`}
      onClick={onClick}
      aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
    >
      {isOpen ? <X size={32} /> : <Menu size={32} />}
    </button>
  );
};

export default NavbarMobileButton;
