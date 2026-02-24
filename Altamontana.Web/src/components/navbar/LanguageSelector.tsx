/**
 * LanguageSelector - Selector de idioma con dropdown
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Languages } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface LanguageSelectorProps {
  isDark: boolean;
  shouldShowBg: boolean;
  mobile?: boolean;
  onLanguageChange?: () => void;
}

const languages = [
  { code: 'es', label: 'Español', flag: 'https://flagcdn.com/w40/cl.png' },
  { code: 'en', label: 'English', flag: 'https://flagcdn.com/w40/us.png' },
  { code: 'pt', label: 'Português', flag: 'https://flagcdn.com/w40/br.png' },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  isDark,
  shouldShowBg,
  mobile = false,
  onLanguageChange,
}) => {
  const { language, setLanguage } = useLanguage();
  const [showLang, setShowLang] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentFlag = languages.find((l) => l.code === language)?.flag;

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowLang(false);
      }
    };

    if (showLang) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLang]);

  // Cerrar dropdown con ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showLang) {
        setShowLang(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [showLang]);

  const handleLanguageSelect = (code: string) => {
    setLanguage(code as any);
    setShowLang(false);
    onLanguageChange?.();
  };

  // Versión móvil
  if (mobile) {
    return (
      <div className="flex flex-wrap justify-center gap-4">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageSelect(lang.code)}
            className={`flex items-center gap-2 px-4 py-3 border-2 transition-all focus-visible-ring ${
              language === lang.code
                ? isDark
                  ? 'border-brand-orange text-brand-orange'
                  : 'border-brand-blue text-brand-blue'
                : isDark
                ? 'border-white/10 text-white hover:border-white/30'
                : 'border-brand-blue/10 text-brand-blue hover:border-brand-blue/30'
            }`}
            aria-label={`Cambiar idioma a ${lang.label}`}
            aria-pressed={language === lang.code}
          >
            <img src={lang.flag} alt="" className="w-5 h-3.5 object-cover" aria-hidden="true" />
            <span className="label-tiny">{lang.label}</span>
          </button>
        ))}
      </div>
    );
  }

  // Versión desktop
  return (
    <div className="relative ml-4" ref={dropdownRef}>
      <button
        onClick={() => setShowLang(!showLang)}
        className={`p-2 rounded-full transition-all flex items-center gap-2 min-w-touch min-h-touch focus-visible-ring ${
          isDark
            ? 'bg-white/10 text-white hover:bg-white/20'
            : shouldShowBg
            ? 'bg-brand-blue/10 text-brand-blue hover:bg-brand-blue/20'
            : 'bg-white/20 text-white hover:bg-white/30'
        }`}
        aria-label="Seleccionar idioma"
        aria-haspopup="true"
        aria-expanded={showLang}
      >
        <img src={currentFlag} alt="" className="w-5 h-3.5 object-cover shadow-sm" aria-hidden="true" />
        <Languages size={18} />
      </button>

      <AnimatePresence>
        {showLang && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`absolute right-0 mt-2 py-2 w-48 shadow-2xl border rounded-lg overflow-hidden z-50 ${
              isDark ? 'bg-black border-white/10 text-white' : 'bg-white border-slate-100 text-brand-blue'
            }`}
            role="menu"
            aria-orientation="vertical"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                className={`w-full text-left px-4 py-4 label-base transition-colors flex items-center gap-4 focus-visible-ring ${
                  language === lang.code
                    ? isDark
                      ? 'bg-brand-orange text-black'
                      : 'bg-brand-blue text-white'
                    : isDark
                    ? 'text-white hover:bg-white/10'
                    : 'text-brand-blue hover:bg-slate-50'
                }`}
                role="menuitem"
                aria-current={language === lang.code ? 'true' : undefined}
              >
                <img src={lang.flag} alt="" className="w-6 h-4 object-cover shadow-sm flex-shrink-0" aria-hidden="true" />
                <span className="flex-1">{lang.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
