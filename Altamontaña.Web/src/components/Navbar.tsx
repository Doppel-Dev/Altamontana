import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Mountain, Helicopter, Menu, X, Sun, Moon, Languages, LogOut } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLang, setShowLang] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleResize = () => {
      if (window.innerWidth >= 768) { // 768px es el breakpoint 'md' de Tailwind
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navLinks = [
    { name: t('home'), path: '/' },
    { name: t('experiences'), path: '/experiences' },
    { name: t('faq'), path: '/faq' },
    { name: t('contact'), path: '/contact' },
  ];

  if (isAuthenticated) {
    navLinks.push({ name: t('admin'), path: '/control-panel' });
  }

  const isHomePage = location.pathname === '/';
  const shouldShowBg = scrolled || !isHomePage || isOpen;
  const isDark = theme === 'dark';

  const languages = [
    { code: 'es', label: 'Español', flag: 'https://flagcdn.com/w40/cl.png' },
    { code: 'en', label: 'English', flag: 'https://flagcdn.com/w40/us.png' },
    { code: 'pt', label: 'Português', flag: 'https://flagcdn.com/w40/br.png' },
  ];

  const currentFlag = languages.find(l => l.code === language)?.flag;

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ${
        shouldShowBg 
          ? (isDark ? 'bg-black/90 border-b border-white/10 py-3' : 'bg-white/90 shadow-sm py-3') 
          : 'bg-transparent py-6'
      } backdrop-blur-md`}
    >
      <div className="section-container flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div 
            className="relative flex items-center justify-center"
          >
            <motion.div 
              animate={{ rotate: isDark ? 45 : 0 }}
              className={`p-2 transition-colors ${isDark ? 'bg-[#ff6b00] text-black' : 'bg-[#003366] text-white'}`}
            >
              <Mountain size={24} />
            </motion.div>
            <motion.div 
              animate={{ 
                y: [0, -2, 0],
                x: [0, 2, 0]
              }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className={`absolute -top-1 -right-1 p-1 rounded-full border-2 ${isDark ? 'bg-black text-[#ff6b00] border-[#ff6b00]' : 'bg-white text-[#003366] border-[#003366]'}`}
            >
              <Helicopter size={12} />
            </motion.div>
          </motion.div>
          <span className={`text-2xl font-bold tracking-tighter uppercase whitespace-nowrap ${
            shouldShowBg ? (isDark ? 'text-white' : 'text-[#003366]') : 'text-white'
          } ${isDark ? 'italic font-black' : 'font-serif'}`}>
            {t('companyName')}
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-2 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all ${
                shouldShowBg 
                  ? (isDark ? 'text-white/70 hover:text-[#ff6b00]' : 'text-[#003366]/70 hover:text-[#003366]') 
                  : 'text-white/80 hover:text-white'
              } ${location.pathname === link.path ? (isDark ? 'text-[#ff6b00]' : 'text-[#003366] font-black') : ''}`}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="relative ml-4">
            <button 
              onClick={() => setShowLang(!showLang)}
              className={`p-2 rounded-full transition-all flex items-center gap-2 ${
                isDark 
                  ? 'bg-white/10 text-white hover:bg-white/20' 
                  : (shouldShowBg ? 'bg-[#003366]/10 text-[#003366] hover:bg-[#003366]/20' : 'bg-white/20 text-white hover:bg-white/30')
              }`}
            >
              <img src={currentFlag} alt={language} className="w-5 h-3.5 object-cover shadow-sm" />
              <Languages size={18} />
            </button>
            <AnimatePresence>
              {showLang && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className={`absolute right-0 mt-2 py-2 w-48 shadow-2xl border ${
                    isDark ? 'bg-black border-white/10 text-white' : 'bg-white border-slate-100 text-[#003366]'
                  }`}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as any);
                        setShowLang(false);
                      }}
                      className={`w-full text-left px-4 py-4 text-xs font-bold uppercase transition-colors flex items-center gap-4 ${
                        language === lang.code 
                          ? (isDark ? 'bg-[#ff6b00] text-black' : 'bg-[#003366] text-white') 
                          : (isDark ? 'text-white hover:bg-white/10' : 'text-[#003366] hover:bg-slate-50')
                      }`}
                    >
                      <img src={lang.flag} alt={lang.label} className="w-6 h-4 object-cover shadow-sm flex-shrink-0" />
                      <span className="flex-1">{lang.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button 
            onClick={toggleTheme}
            className={`ml-2 p-2 rounded-full transition-all ${
              isDark 
                ? 'bg-white/10 text-[#f8d12e] hover:bg-white/20' 
                : (shouldShowBg ? 'bg-[#003366]/10 text-[#003366] hover:bg-[#003366]/20' : 'bg-white/20 text-white hover:bg-white/30')
            }`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {isAuthenticated && (
            <button 
              onClick={logout}
              className={`ml-2 p-2 rounded-full transition-all ${
                isDark 
                  ? 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white' 
                  : (shouldShowBg ? 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white' : 'bg-white/20 text-white hover:bg-red-500')
              }`}
              title={t('logout')}
            >
              <LogOut size={20} />
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={`md:hidden p-2 z-50 transition-colors ${
            isOpen 
              ? (isDark ? 'text-[#ff6b00]' : 'text-[#003366]') 
              : (shouldShowBg ? (isDark ? 'text-white' : 'text-[#003366]') : 'text-white')
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-40 flex flex-col items-center justify-start overflow-y-auto pt-32 pb-10 px-6 ${
              isDark ? 'bg-black text-white' : 'bg-white text-[#003366]'
            }`}
          >
            <div className="flex flex-col items-center gap-6 w-full">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-3xl font-black uppercase italic hover:scale-105 transition-transform ${isDark ? 'hover:text-[#ff6b00]' : 'hover:text-[#003366]'}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
                            {isAuthenticated && (
                              <button 
                                onClick={() => {
                                  logout();
                                  setIsOpen(false);
                                }}
                                className={`text-3xl font-black uppercase italic text-red-500 hover:scale-105 transition-transform mt-2 flex items-center gap-3`}
                              >
                                <LogOut size={28} /> {t('exit')}
                              </button>
                            )}
                          </div>
              
                          <div className="mt-12 flex flex-col items-center gap-8 border-t border-current border-opacity-10 pt-10 w-full">
                            <button 
                              onClick={toggleTheme}
                              className={`flex items-center gap-3 px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs ${
                                isDark ? 'bg-white/10 text-[#f8d12e]' : 'bg-[#003366]/10 text-[#003366]'
                              }`}
                            >
                              {isDark ? <Sun size={20} /> : <Moon size={20} />}
                              {isDark ? t('lightMode') : t('darkMode')}
                            </button>
              <div className="flex flex-wrap justify-center gap-4">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code as any);
                      setIsOpen(false);
                    }}
                    className={`flex items-center gap-2 px-4 py-3 border-2 transition-all ${
                      language === lang.code 
                        ? (isDark ? 'border-[#ff6b00] text-[#ff6b00]' : 'border-[#003366] text-[#003366]') 
                        : (isDark ? 'border-white/10 text-white' : 'border-[#003366]/10 text-[#003366]')
                    }`}
                  >
                    <img src={lang.flag} alt={lang.label} className="w-5 h-3.5 object-cover" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{lang.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
