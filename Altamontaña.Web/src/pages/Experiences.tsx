import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useState, useEffect } from 'react';
import { getExperiences, getSiteContent } from '../services/api';
import { Experience } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ExperienceCard } from '../components/ExperienceCard';

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
      <div className="eyebrow-dark animate-pulse">{t('syncCatalog')}</div>
    </div>
  );

  const showCarousel = experiences.length > itemsToShow;

  return (
    <div className={`min-h-screen pt-32 md:pt-40 pb-24 transition-colors duration-500 ${isDark ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'}`}>
      <div className="section-container">
        <header className="mb-12 md:mb-20">
          <h1 className={`mb-4 md:mb-6 ${isDark ? 'heading-h1-dark' : 'heading-h1-light text-[#003366]'}`}>
            {t(siteContent.catalog_title || 'catalogTitleDark')}
          </h1>
          <p className="body-large text-muted uppercase italic">
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
                <ExperienceCard 
                  key={exp.id} 
                  exp={exp} 
                  isDark={isDark} 
                  className={showCarousel ? (itemsToShow === 1 ? 'w-full' : itemsToShow === 2 ? 'w-1/2' : 'w-1/3') : 'w-full'}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experiences;