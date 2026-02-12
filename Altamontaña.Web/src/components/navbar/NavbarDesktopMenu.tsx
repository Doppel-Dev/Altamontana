/**
 * NavbarDesktopMenu - Menú de navegación para desktop
 */

import { Link, useLocation } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { LanguageSelector } from './LanguageSelector';
import { ThemeToggle } from './ThemeToggle';
import { NavbarExperiencesDropdown } from './NavbarExperiencesDropdown';

interface NavbarDesktopMenuProps {
  isDark: boolean;
  shouldShowBg: boolean;
}

export const NavbarDesktopMenu: React.FC<NavbarDesktopMenuProps> = ({ isDark, shouldShowBg }) => {
  const location = useLocation();
  const { t } = useLanguage();
  const { isAuthenticated, logout } = useAuth();

  const navLinks = [
    { name: t('home'), path: '/' },
    { name: t('faq'), path: '/faq' },
    { name: t('contact'), path: '/contact' },
  ];

  if (isAuthenticated) {
    navLinks.push({ name: t('admin'), path: '/control-panel' });
  }

  return (
    <div className="hidden md:flex gap-2 items-center">
      {/* Home Link */}
      <Link
        to="/"
        className={`px-4 py-2 label-base transition-all focus-visible-ring ${
          shouldShowBg
            ? isDark
              ? 'text-white/70 hover:text-brand-orange'
              : 'text-brand-blue/70 hover:text-brand-blue'
            : 'text-white/80 hover:text-white'
        } ${
          location.pathname === '/' ? (isDark ? 'text-brand-orange' : 'text-brand-blue font-black') : ''
        }`}
      >
        {t('home')}
      </Link>

      {/* Experiences Dropdown */}
      <NavbarExperiencesDropdown 
        isDark={isDark} 
        shouldShowBg={shouldShowBg} 
        isActive={location.pathname === '/experiences' || location.pathname.startsWith('/experience/')}
      />

      {/* Other Navigation Links */}
      {navLinks.filter(link => link.path !== '/').map((link) => {
        const isActive = location.pathname === link.path;

        return (
          <Link
            key={link.path}
            to={link.path}
            className={`px-4 py-2 label-base transition-all focus-visible-ring ${
              shouldShowBg
                ? isDark
                  ? 'text-white/70 hover:text-brand-orange'
                  : 'text-brand-blue/70 hover:text-brand-blue'
                : 'text-white/80 hover:text-white'
            } ${
              isActive ? (isDark ? 'text-brand-orange' : 'text-brand-blue font-black') : ''
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            {link.name}
          </Link>
        );
      })}

      {/* Language Selector */}
      <LanguageSelector isDark={isDark} shouldShowBg={shouldShowBg} />

      {/* Theme Toggle */}
      <ThemeToggle isDark={isDark} shouldShowBg={shouldShowBg} />

      {/* Logout Button (only if authenticated) */}
      {isAuthenticated && (
        <button
          onClick={logout}
          className={`ml-2 p-2 rounded-full transition-all min-w-touch min-h-touch flex items-center justify-center focus-visible-ring ${
            isDark
              ? 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white'
              : shouldShowBg
              ? 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white'
              : 'bg-white/20 text-white hover:bg-red-500'
          }`}
          title={t('logout')}
          aria-label={t('logout')}
        >
          <LogOut size={20} />
        </button>
      )}
    </div>
  );
};

export default NavbarDesktopMenu;
