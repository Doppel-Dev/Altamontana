import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Award, Gauge } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useState, useEffect } from 'react';
import { getSiteContent } from '../services/api';

const Home = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';
  const [content, setContent] = useState<any>({});

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
    
  const heroSub = t(content.home_hero_sub || 'heroSub');
  
  const heroImg = isDark
    ? (content.home_hero_img_dark || "/img/richard-felix-Y79GKs-dwz4-unsplash.jpg")
    : (content.home_hero_img_light || "/img/oliver-bornhauser-KnS5l6TZjAs-unsplash.jpg");

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          key={`${theme}-${heroImg}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={heroImg} 
            className={`w-full h-full object-cover ${isDark ? 'opacity-50 grayscale brightness-75' : 'opacity-80'}`}
            alt="Helicopter View"
            loading="eager"
          />
          <div className={`absolute inset-0 ${isDark ? 'bg-black/40' : 'bg-gradient-to-b from-[#003366]/40 to-white'}`} />
        </motion.div>

        <div className="section-container relative z-10 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className={`inline-block px-4 py-1 mb-6 text-sm font-bold uppercase tracking-[0.3em] ${
              isDark ? 'bg-[#ff6b00] text-black italic' : 'text-[#003366] border-b-2 border-[#003366]'
            }`}>
              {isDark ? 'Aviation Division' : 'Private Aviation'}
            </span>
            <h1 className={`text-4xl sm:text-6xl md:text-9xl mb-8 leading-none ${
              isDark ? 'text-white italic font-black uppercase tracking-tighter' : 'text-[#003366] font-serif'
            }`}>
              {heroTitle}
            </h1>
            <p className={`text-xl mb-12 max-w-2xl mx-auto font-medium ${
              isDark ? 'text-white/70 uppercase' : 'text-slate-600'
            }`}>
              {heroSub}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/experiences" className="btn-primary-theme px-12 py-5 text-lg">
                {t(content.home_hero_btn || 'viewCatalog')} <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
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
                <h3 className={`text-2xl mb-4 ${isDark ? 'font-black italic' : 'font-serif'}`}>{f.title}</h3>
                <p className={`text-sm font-medium ${isDark ? 'text-neutral-500 uppercase' : 'text-slate-500'}`}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;