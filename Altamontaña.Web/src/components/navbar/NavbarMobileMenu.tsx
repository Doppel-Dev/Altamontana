/**
 * NavbarMobileMenu - Menú móvil con overlay completo
 * Incluye safe areas iOS, scroll interno y transiciones suaves
 */

import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { LanguageSelector } from './LanguageSelector';
import { ThemeToggle } from './ThemeToggle';

interface NavbarMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

export const NavbarMobileMenu: React.FC<NavbarMobileMenuProps> = ({ isOpen, onClose, isDark }) => {
  const { t } = useLanguage();
  const { isAuthenticated, logout } = useAuth();

  const navLinks = [
    { name: t('home'), path: '/' },
    { name: t('experiences'), path: '/experiences' },
    { name: t('faq'), path: '/faq' },
    { name: t('contact'), path: '/contact' },
  ];

  if (isAuthenticated) {
    navLinks.push({ name: t('admin'), path: '/control-panel' });
  }

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`
            fixed inset-0 z-40
            flex flex-col items-center justify-start
            overflow-y-auto scrollbar-hide
            safe-bottom
            ${isDark ? 'bg-black text-white' : 'bg-white text-brand-blue'}
          `}
          style={{
            paddingTop: 'max(calc(env(safe-area-inset-top) + 5rem), 8rem)',
            paddingBottom: 'max(env(safe-area-inset-bottom) + 2.5rem, 2.5rem)',
          }}
          role="navigation"
          aria-label="Menú de navegación móvil"
        >
          {/* Navigation Links */}
          <div className="flex flex-col items-center gap-6 w-full px-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  heading-h3-dark
                  hover:scale-105 transition-transform
                  focus-visible-ring
                  ${isDark ? 'hover:text-brand-orange' : 'hover:text-brand-blue'}
                `}
                onClick={onClose}
              >
                {link.name}
              </Link>
            ))}

            {/* Logout Button */}
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className={`
                  heading-h3-dark text-red-500
                  hover:scale-105 transition-transform
                  mt-2 flex items-center gap-3
                  focus-visible-ring
                `}
                aria-label={t('logout')}
              >
                <LogOut size={28} /> {t('exit')}
              </button>
            )}
          </div>

          {/* Controls Section */}
          <div className="mt-12 flex flex-col items-center gap-8 border-t border-current border-opacity-10 pt-10 w-full px-6">
            {/* Theme Toggle */}
            <ThemeToggle isDark={isDark} shouldShowBg={true} mobile />

            {/* Language Selector */}
            <LanguageSelector isDark={isDark} shouldShowBg={true} mobile onLanguageChange={onClose} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavbarMobileMenu;
