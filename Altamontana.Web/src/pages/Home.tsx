import { Link } from 'react-router-dom';
import { motion, useSpring } from 'framer-motion';
import { ArrowRight, Star, Gauge, Users } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useState, useEffect, useRef } from 'react';
import { getSiteContent, getExperiences } from '../services/api';
import { Experience } from '../types';
import { BlurVignette, BlurVignetteArticle } from '../components/ui/blur-vignette';
import { ExperienceCard } from '../components/ExperienceCard';

const Home = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';
  const [content, setContent] = useState<any>({});
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const containerRef = useRef<HTMLElement>(null);

  // Mouse Parallax Logic
  const springX = useSpring(0, { stiffness: 50, damping: 20 });
  const springY = useSpring(0, { stiffness: 50, damping: 20 });
  const contentX = useSpring(0, { stiffness: 100, damping: 30 });
  const contentY = useSpring(0, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 30;
    const y = (clientY / innerHeight - 0.5) * 30;
    
    springX.set(x);
    springY.set(y);
    contentX.set(-x * 0.5);
    contentY.set(-y * 0.5);
  };

  useEffect(() => {
    Promise.all([
      getSiteContent(),
      getExperiences()
    ]).then(([contentRes, expRes]) => {
      const contentMap = contentRes.data.reduce((acc: any, curr: any) => {
        acc[curr.key] = curr.value;
        return acc;
      }, {});
      setContent(contentMap);
      setExperiences(expRes.data.slice(0, 3)); // Solo las primeras 3 para el Home
    });
  }, []);

  const heroImg = isDark
    ? (content.home_hero_img_dark || "/img/richard-felix-Y79GKs-dwz4-unsplash.jpg")
    : (content.home_hero_img_light || "/img/oliver-bornhauser-KnS5l6TZjAs-unsplash.jpg");

  return (
    <div className="overflow-hidden" onMouseMove={handleMouseMove}>
      {/* Hero Section */}
      <section 
        ref={containerRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image with Blur Vignette & Parallax */}
        <BlurVignette 
          className="absolute inset-0 z-0 w-full h-full" 
          radius="24px"
          inset="10px"
          transitionLength="90%" 
          blur="24px"
        >
          <motion.div
            key={`${theme}-${heroImg}`}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ 
              opacity: 1, 
              scale: 1
            }}
            style={{
              x: springX,
              y: springY 
            }}
            transition={{ 
              opacity: { duration: 1.5 },
              scale: { duration: 2, ease: "easeOut" }
            }}
            className="w-full h-full"
          >
            <img
              src={heroImg}
              className="w-full h-full object-cover scale-110"
              alt="Mountain Adventure"
              loading="eager"
            />
            {/* Overlay for better text contrast */}
            <div className={`absolute inset-0 ${isDark ? 'bg-black/60' : 'bg-black/40'}`} />
          </motion.div>
          <BlurVignetteArticle className="z-20" />
        </BlurVignette>

        {/* Hero Content */}
        <div className="section-container relative z-30 text-center px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ 
              y: 0, 
              opacity: 1
            }}
            style={{
              x: contentX,
              y: contentY
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto"
          >
            {/* Eyebrow Text */}
            <motion.p
              initial={{ opacity: 0, letterSpacing: '0.1em' }}
              animate={{ opacity: 1, letterSpacing: '0.4em' }}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-white text-[10px] sm:text-xs font-bold uppercase mb-6 tracking-[0.4em]"
            >
              {t(isDark ? content.home_hero_eyebrow_dark : content.home_hero_eyebrow_light) || (isDark ? t('aviationDivision') : t('mountainExperiences'))}
            </motion.p>

            {/* Main Title */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white font-black uppercase leading-[0.9] tracking-tighter mb-8
                         text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {t(isDark ? content.home_hero_main_dark : content.home_hero_main_light) || t('companyName')} <br />
              <span className="text-white/90 font-serif italic normal-case text-4xl sm:text-5xl md:text-6xl block mt-4">
                {t(isDark ? content.home_hero_title_dark : content.home_hero_title_light) || t('santiagoFromAir')}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-white text-lg sm:text-xl md:text-2xl font-serif italic mb-10 max-w-2xl mx-auto leading-relaxed opacity-80"
            >
              {t(isDark ? content.home_hero_desc_dark : content.home_hero_desc_light) || t('homeHeroSub')}
            </motion.h2>

            {/* CTA Buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link
                to="/experiences"
                className="group px-10 py-4 bg-white text-black font-bold text-xs uppercase tracking-[0.2em] transition-all duration-500 flex items-center gap-3 min-w-[200px] justify-center hover:bg-black hover:text-white border border-white"
              >
                {t(content.home_hero_btn || 'exploreTours')}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/contact"
                className="px-10 py-4 bg-transparent hover:bg-white text-white hover:text-black font-bold text-xs uppercase tracking-[0.2em] border border-white rounded-none transition-all duration-500 min-w-[200px] text-center"
              >
                {t('directContact')}
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/60 to-transparent relative overflow-hidden">
            <motion.div 
              animate={{ y: [0, 48, 48] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full h-4 bg-white"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className={`py-32 relative overflow-hidden transition-colors duration-700 ${isDark ? 'bg-[#050505]' : 'bg-slate-50'}`}>
        {/* Topographic Background Pattern (CSS-based) */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke={isDark ? "white" : "black"} strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-4 gap-12 items-start">
            {/* Section Header */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className={`w-12 h-1 ${isDark ? 'bg-[#ff6b00]' : 'bg-[#003366]'}`} />
                <h2 className={`leading-[0.9] ${
                  isDark 
                    ? 'text-5xl md:text-6xl font-black italic uppercase tracking-tighter text-white' 
                    : 'text-4xl md:text-5xl font-serif font-bold tracking-tight text-[#003366]'
                }`}>
                  Estándares <br /> de Elite
                </h2>
                <p className="text-[11px] text-muted font-bold uppercase tracking-[0.2em] leading-relaxed">
                  Protocolos de seguridad y servicio de aviación internacional.
                </p>
              </motion.div>
            </div>

            {/* Features Cards */}
            <div className="lg:col-span-3 grid md:grid-cols-3 gap-6 lg:gap-8">
              {[
                { 
                  icon: <Gauge size={24} strokeWidth={1.5} />, 
                  title: t(content.home_feat1_title || 'Flota Moderna'),
                  desc: t(content.home_feat1_desc || 'Aeronaves Airbus y Bell mantenidas bajo estándares de excelencia.')
                },
                { 
                  icon: <Users size={24} strokeWidth={1.5} />, 
                  title: t(content.home_feat2_title || 'Pilotos Expertos'),
                  desc: t(content.home_feat2_desc || 'Comandantes con miles de horas de vuelo en montaña y ciudad.')
                },
                { 
                  icon: <Star size={24} strokeWidth={1.5} />, 
                  title: t(content.home_feat3_title || 'Lujo Exclusivo'),
                  desc: t(content.home_feat3_desc || 'Experiencias personalizadas con catering y servicio premium.')
                }
              ].map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                  className={`relative p-8 lg:p-10 group overflow-hidden border transition-all duration-500 ${
                    isDark 
                      ? 'bg-white/[0.02] border-white/5 backdrop-blur-sm hover:border-[#ff6b00]/30' 
                      : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50 hover:border-[#003366]/30'
                  }`}
                >
                  {/* Technical Index */}
                  <div className={`absolute top-6 right-8 font-mono text-[10px] font-bold tracking-widest opacity-20 group-hover:opacity-100 group-hover:text-[#ff6b00] transition-all`}>
                    0{i + 1}
                  </div>

                  <div className={`mb-8 w-12 h-12 flex items-center justify-center transition-all duration-500 group-hover:scale-110 ${
                    isDark ? 'text-[#ff6b00] border border-white/10 bg-white/5' : 'text-[#003366] border border-black/5 bg-slate-50'
                  }`}>
                    {f.icon}
                  </div>

                  <h3 className={`mb-4 leading-tight ${
                    isDark 
                      ? 'text-white font-bold italic uppercase text-lg tracking-tighter' 
                      : 'text-[#003366] font-serif text-xl font-bold tracking-tight'
                  }`}>
                    {f.title}
                  </h3>
                  
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-white/50' : 'text-slate-500'}`}>
                    {f.desc}
                  </p>

                  {/* Corner Accent */}
                  <div className={`absolute bottom-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity ${
                    isDark 
                      ? 'border-r-2 border-b-2 border-[#ff6b00]' 
                      : 'border-r-2 border-b-2 border-[#003366]'
                  }`} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Experiences Section */}
      <section className={`py-16 md:py-24 relative overflow-hidden ${isDark ? 'bg-black text-white' : 'bg-white text-slate-900'}`}>
        {/* Background Decorative Element */}
        <div className={`absolute top-0 right-0 w-1/4 h-full opacity-[0.015] pointer-events-none flex items-center justify-center`}>
          <span className="text-[30vw] font-black italic select-none">AM</span>
        </div>

        <div className="section-container relative z-10">
          <header className="mb-12 md:mb-16">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`flex items-center gap-3 mb-4`}
                >
                  <span className={`w-8 h-[1px] ${isDark ? 'bg-[#ff6b00]' : 'bg-[#003366]'}`} />
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-60">
                    {t('curatedExpeditions')}
                  </span>
                </motion.div>
                
                <motion.h2 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className={`mb-4 leading-[0.9] ${
                    isDark 
                      ? 'text-5xl md:text-6xl lg:text-7xl font-black italic uppercase tracking-tighter' 
                      : 'text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-[#003366]'
                  }`}
                >
                  {t(content.catalog_title || 'Nuestras Experiencias')}
                </motion.h2>

                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="body-base text-muted max-w-lg"
                >
                  {t(content.catalog_sub || 'Una selección exclusiva de misiones diseñadas para explorar la Cordillera de los Andes.')}
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <Link 
                  to="/experiences" 
                  className={`group relative py-4 px-8 flex items-center gap-3 overflow-hidden transition-all border ${
                    isDark 
                      ? 'bg-transparent border-white/20 text-white' 
                      : 'bg-transparent border-[#003366]/20 text-[#003366] hover:text-white'
                  }`}
                >
                  <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.2em]">
                    {t('viewCatalog')}
                  </span>
                  <ArrowRight size={14} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                  
                  {/* Hover Background Effect */}
                  <div className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ${
                    isDark ? 'bg-[#ff6b00]' : 'bg-[#003366]'
                  }`} />
                </Link>
              </motion.div>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {experiences.map((exp) => (
              <ExperienceCard 
                key={exp.id} 
                exp={exp} 
                isDark={isDark} 
                className="w-full"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
