import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MapPin, Clock, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { getExperiences } from '../../services/api';
import { Experience } from '../../types';

interface NavbarExperiencesDropdownProps {
  isDark: boolean;
  shouldShowBg: boolean;
  isActive: boolean;
}

export const NavbarExperiencesDropdown: React.FC<NavbarExperiencesDropdownProps> = ({ 
  isDark, 
  shouldShowBg,
  isActive 
}) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    getExperiences().then(res => {
      setExperiences(res.data.slice(0, 3));
    });
  }, []);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        to="/experiences"
        className={`px-4 py-2 label-base transition-all flex items-center gap-1 focus-visible-ring ${
          shouldShowBg
            ? isDark
              ? 'text-white/70 hover:text-brand-orange'
              : 'text-brand-blue/70 hover:text-brand-blue'
            : 'text-white/80 hover:text-white'
        } ${
          isActive ? (isDark ? 'text-brand-orange' : 'text-brand-blue font-black') : ''
        }`}
      >
        {t('experiences')}
        <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[600px] z-[1200]`}
          >
            <div className={`p-6 shadow-2xl border backdrop-blur-xl ${
              isDark 
                ? 'bg-black/95 border-white/10 text-white' 
                : 'bg-white/95 border-slate-100 text-slate-900'
            }`}>
              <div className="grid grid-cols-3 gap-6">
                {experiences.map((exp) => (
                  <Link 
                    key={exp.id} 
                    to={`/experience/${exp.id}`}
                    className="group block space-y-3"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src={exp.imageUrl} 
                        alt={exp.title} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider line-clamp-1 mb-1 group-hover:text-brand-orange transition-colors">
                        {t(exp.title)}
                      </h4>
                      <div className="flex gap-3 text-[10px] opacity-60">
                        <span className="flex items-center gap-1"><MapPin size={10} /> {t(exp.location).split(' ')[0]}</span>
                        <span className="flex items-center gap-1"><Clock size={10} /> {exp.duration.split(' ')[0]}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              <div className={`mt-6 pt-4 border-t ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
                <Link 
                  to="/experiences"
                  onClick={() => setIsOpen(false)}
                  className={`text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all hover:gap-4 ${
                    isDark ? 'text-brand-orange' : 'text-brand-blue'
                  }`}
                >
                  {t('viewCatalog')} <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
