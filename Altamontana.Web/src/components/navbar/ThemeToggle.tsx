/**
 * ThemeToggle - Botón para cambiar entre modo claro y oscuro
 */

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

interface ThemeToggleProps {
  isDark: boolean;
  shouldShowBg: boolean;
  mobile?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, shouldShowBg, mobile = false }) => {
  const { toggleTheme } = useTheme();
  const { t } = useLanguage();

  const ariaLabel = isDark ? t('lightMode') : t('darkMode');

  if (mobile) {
    return (
      <button
        onClick={toggleTheme}
        className={`flex items-center gap-3 px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs transition-colors ${
          isDark ? 'bg-white/10 text-[#f8d12e] hover:bg-white/20' : 'bg-brand-blue/10 text-brand-blue hover:bg-brand-blue/20'
        }`}
        aria-label={ariaLabel}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
        {ariaLabel}
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`ml-2 p-2 rounded-full transition-all min-w-touch min-h-touch flex items-center justify-center focus-visible-ring ${
        isDark
          ? 'bg-white/10 text-[#f8d12e] hover:bg-white/20'
          : shouldShowBg
          ? 'bg-brand-blue/10 text-brand-blue hover:bg-brand-blue/20'
          : 'bg-white/20 text-white hover:bg-white/30'
      }`}
      aria-label={ariaLabel}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;
