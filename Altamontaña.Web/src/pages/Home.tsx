import { Link } from 'react-router-dom';
import { motion, useSpring } from 'framer-motion';
import { ArrowRight, Shield, Award, Gauge } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useState, useEffect, useRef } from 'react';
import { getSiteContent } from '../services/api';
import { BlurVignette, BlurVignetteArticle } from '../components/ui/blur-vignette';

const Home = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';
  const [content, setContent] = useState<any>({});
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
    getSiteContent().then(res => {
      const contentMap = res.data.reduce((acc: any, curr: any) => {
        acc[curr.key] = curr.value;
        return acc;
      }, {});
      setContent(contentMap);
    });
  }, []);

  const heroTitle = isDark 
    ? t(content.home_hero_title_dark || 'heroTitleDark')
    : t(content.home_hero_title_light || 'heroTitleLight');
    
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
              scale: 1,
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
              opacity: 1,
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
              {isDark ? 'DIVISIÓN DE AVIACIÓN PRIVADA' : 'EXPERIENCIAS DE ALTA MONTAÑA'}
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
              Santiago <br />
              <span className="text-white/90 font-serif italic normal-case text-4xl sm:text-5xl md:text-6xl block mt-4">Desde el Aire</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-white text-lg sm:text-xl md:text-2xl font-serif italic mb-10 max-w-2xl mx-auto leading-relaxed opacity-80"
            >
              Vuelos en helicóptero, expediciones a los Andes y aviación de lujo en Chile.
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
                className="group px-10 py-4 bg-white text-black font-bold text-xs uppercase tracking-[0.2em] transition-all duration-500 flex items-center gap-3 min-w-[220px] justify-center hover:bg-black hover:text-white border border-white"
              >
                {t(content.home_hero_btn || 'Explorar Tours')}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/contact"
                className="px-10 py-4 bg-transparent hover:bg-white text-white hover:text-black font-bold text-xs uppercase tracking-[0.2em] border border-white rounded-none transition-all duration-500 min-w-[220px] text-center"
              >
                Contacto Directo
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
      <section className={`py-32 ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className="section-container">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                icon: isDark ? <Gauge size={40} className="text-[#ff6b00]" /> : <Gauge size={40} className="text-[#003366]" />, 
                title: t(content.home_feat1_title || 'featTitle1Light'),
                desc: t(content.home_feat1_desc || 'featDesc1Light')
              },
              { 
                icon: isDark ? <Shield size={40} className="text-[#ff6b00]" /> : <Shield size={40} className="text-[#003366]" />, 
                title: t(content.home_feat2_title || 'featTitle2Light'),
                desc: t(content.home_feat2_desc || 'featDesc2Light')
              },
              { 
                icon: isDark ? <Award size={40} className="text-[#ff6b00]" /> : <Award size={40} className="text-[#003366]" />, 
                title: t(content.home_feat3_title || 'featTitle3Light'),
                desc: t(content.home_feat3_desc || 'featDesc3Light')
              }
            ].map((f, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className={`p-10 card-theme ${isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-slate-50 border-slate-100'}`}
              >
                <div className="mb-6">{f.icon}</div>
                <h3 className={isDark ? 'heading-h3-dark mb-4' : 'heading-h3-light mb-4'}>{f.title}</h3>
                <p className={`body-small text-muted ${isDark ? 'uppercase' : ''}`}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
