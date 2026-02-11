import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useState, useEffect } from 'react';
import { getExperiences, getSiteContent } from '../services/api';
import { Experience } from '../types';
import { Link } from 'react-router-dom';
import { MapPin, Clock, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const Experiences = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [siteContent, setSiteContent] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(1);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2);
      } else {
        setItemsToShow(3);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    Promise.all([
      getExperiences(),
      getSiteContent()
    ]).then(([expRes, contentRes]) => {
      setExperiences(expRes.data);
      const contentMap = contentRes.data.reduce((acc: any, curr: any) => {
        acc[curr.key] = curr.value;
        return acc;
      }, {});
      setSiteContent(contentMap);
      setLoading(false);
    });

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    if (currentIndex < experiences.length - itemsToShow) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  if (loading) return (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className="font-black italic animate-pulse uppercase tracking-[0.3em]">{t('syncCatalog')}</div>
    </div>
  );

  const showCarousel = experiences.length > itemsToShow;

  return (
    <div className={`min-h-screen pt-32 md:pt-40 pb-24 transition-colors duration-500 ${isDark ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'}`}>
      <div className="section-container">
        <header className="mb-12 md:mb-20">
          <h1 className={`text-4xl md:text-8xl mb-4 md:mb-6 ${isDark ? 'font-black italic uppercase tracking-tighter' : 'font-serif text-[#003366]'}`}>
            {t(siteContent.catalog_title || 'catalogTitleDark')}
          </h1>
          <p className="text-sm md:text-xl font-bold opacity-60 uppercase italic tracking-widest">
            {t(siteContent.catalog_sub || 'catalogSub')}
          </p>
        </header>

        <div className="relative">
          {showCarousel && (
            <div className="flex justify-end gap-4 mb-8 md:absolute md:-top-16 md:right-0 z-20">
              <button 
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className={`p-3 rounded-full border-2 transition-all ${
                  currentIndex === 0 
                    ? 'opacity-10 cursor-not-allowed' 
                    : (isDark ? 'border-white text-white hover:bg-[#ff6b00]' : 'border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white')
                }`}
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={nextSlide}
                disabled={currentIndex >= experiences.length - itemsToShow}
                className={`p-3 rounded-full border-2 transition-all ${
                  currentIndex >= experiences.length - itemsToShow
                    ? 'opacity-10 cursor-not-allowed' 
                    : (isDark ? 'border-white text-white hover:bg-[#ff6b00]' : 'border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white')
                }`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}

          <div className="overflow-hidden px-1">
            <motion.div 
              animate={{ x: showCarousel ? `-${currentIndex * (100 / itemsToShow)}%` : 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className={`flex ${showCarousel ? '' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'}`}
            >
              {experiences.map((exp) => (
                <div 
                  key={exp.id} 
                  className={`flex-shrink-0 ${
                    showCarousel 
                      ? (itemsToShow === 1 ? 'w-full' : itemsToShow === 2 ? 'w-1/2' : 'w-1/3') 
                      : 'w-full'
                  } p-2 md:p-4`}
                >
                  <motion.div 
                    className={`group h-full flex flex-col transition-all duration-500 overflow-hidden ${
                      isDark ? 'bg-neutral-900 border border-neutral-800' : 'bg-white shadow-xl'
                    }`}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img 
                        src={exp.imageUrl} 
                        alt={exp.title} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
                      />
                      <div className={`absolute top-0 right-0 p-3 md:p-4 font-black italic text-base md:text-xl ${isDark ? 'bg-[#ff6b00] text-black' : 'bg-[#003366] text-white'}`}>
                        ${exp.price} USD
                      </div>
                    </div>

                    <div className="p-6 md:p-10 flex-grow flex flex-col">
                      <div className="flex gap-4 md:gap-6 mb-4 md:mb-6 opacity-40 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]">
                        <span className="flex items-center gap-1.5"><MapPin size={10} /> {t(exp.location)}</span>
                        <span className="flex items-center gap-1.5"><Clock size={10} /> {t(exp.duration)}</span>
                      </div>
                      
                      <h3 className={`text-xl md:text-3xl mb-6 leading-tight flex-grow break-words ${isDark ? 'font-black italic uppercase tracking-tighter' : 'font-serif text-[#003366]'}`}>
                        {t(exp.title)}
                      </h3>

                      <div className="pt-6 border-t border-current border-opacity-10 flex justify-between items-center">
                        <Link 
                          to={`/experience/${exp.id}`}
                          className={`text-[10px] md:text-xs font-black uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all ${
                            isDark ? 'text-white' : 'text-[#003366]'
                          }`}
                        >
                          {t('viewDetails')} <ArrowRight size={14} className={isDark ? 'text-[#ff6b00]' : 'text-[#003366]'} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experiences;