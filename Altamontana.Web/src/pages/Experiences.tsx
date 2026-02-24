import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useState, useEffect } from 'react';
import { getExperiences, getSiteContent } from '../services/api';
import { Experience } from '../types';
import { ChevronLeft, ChevronRight, LayoutGrid } from 'lucide-react';
import { ExperienceCard } from '../components/ExperienceCard';
import {
  Carousel,
  Slider,
  SliderContainer,
  SliderDotButton,
  SliderNextButton,
  SliderPrevButton,
} from '../components/ui/carousel';

const Experiences = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [siteContent, setSiteContent] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  if (loading) return (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-[#050505] text-white' : 'bg-white text-black'}`}>
      <div className="flex flex-col items-center gap-8">
        <div className={`w-20 h-[1px] ${isDark ? 'bg-[#ff6b00]' : 'bg-[#003366]'} animate-pulse`} />
        <div className="text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">{t('syncCatalog')}</div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen pt-40 md:pt-48 pb-32 relative overflow-hidden transition-colors duration-700 ${isDark ? 'bg-[#050505] text-white' : 'bg-[#fafafa] text-slate-900'}`}>
      {/* Background Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="section-container relative z-10">
        <header className="mb-24 md:mb-32 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className={`w-12 h-[1px] ${isDark ? 'bg-[#ff6b00]' : 'bg-[#003366]'}`} />
              <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${isDark ? 'text-[#ff6b00]' : 'text-[#003366]'}`}>
                {t('curatedExpeditions')}
              </span>
            </div>
            
            <h1 className={`mb-10 leading-[0.85] tracking-tighter ${
              isDark 
                ? 'text-[clamp(3.5rem,12vw,9rem)] font-black italic uppercase italic' 
                : 'text-[clamp(3rem,8vw,7rem)] font-serif font-bold text-[#003366]'
            }`}>
              {t(siteContent.catalog_title || 'catalogTitleDark')}
            </h1>

            <p className={`body-large max-w-2xl opacity-60 font-light leading-relaxed ${isDark ? 'text-white' : 'text-slate-600'}`}>
              {t(siteContent.catalog_sub || 'catalogSub')}
            </p>
          </motion.div>
        </header>

        <div className="relative group/carousel">
          <Carousel options={{ align: 'start', loop: false }}>
            <div className="flex items-center justify-between mb-12 border-b border-current border-opacity-5 pb-8">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 opacity-40">
                  <LayoutGrid size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">EXPERIENCE SELECTION</span>
                </div>
                <div className="h-4 w-[1px] bg-current opacity-10" />
                <span className="text-[10px] font-mono opacity-40">{experiences.length} AVAILABLE</span>
              </div>

              <div className="flex gap-4">
                <SliderPrevButton className={`p-4 transition-all hover:scale-110 disabled:opacity-10 disabled:cursor-not-allowed`}>
                  <ChevronLeft size={24} className={isDark ? 'text-white' : 'text-[#003366]'} />
                </SliderPrevButton>
                <SliderNextButton className={`p-4 transition-all hover:scale-110 disabled:opacity-10 disabled:cursor-not-allowed`}>
                  <ChevronRight size={24} className={isDark ? 'text-white' : 'text-[#003366]'} />
                </SliderNextButton>
              </div>
            </div>

            <SliderContainer className="cursor-grab active:cursor-grabbing">
              {experiences.map((exp) => (
                <Slider key={exp.id} className="sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-4">
                  <ExperienceCard 
                    exp={exp} 
                    isDark={isDark} 
                  />
                </Slider>
              ))}
            </SliderContainer>

            <div className="mt-16 flex justify-center">
              <div className={isDark ? 'text-[#ff6b00]' : 'text-[#003366]'}>
                <SliderDotButton />
              </div>
            </div>
          </Carousel>
        </div>
      </div>

      {/* Decorative Sidebar Label */}
      <div className="hidden lg:block absolute right-12 top-1/2 -rotate-90 origin-right translate-y-1/2">
        <span className="text-[10px] font-black uppercase tracking-[1em] opacity-5">ALTAMONTAÑA HELI-EXPERIENCES</span>
      </div>
    </div>
  );
};

export default Experiences;