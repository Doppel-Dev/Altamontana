import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getExperience } from '../services/api';
import { Experience } from '../types';
import { motion } from 'framer-motion';
import { Clock, Shield, Users, Zap, Check, ArrowLeft, Calendar, MapPin, Share2, Heart, Info, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import LoadingScreen from '../components/LoadingScreen';
import {
  Carousel,
  Slider,
  SliderContainer,
  SliderDotButton,
  SliderNextButton,
  SliderPrevButton,
} from '../components/ui/carousel';

const ExperienceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';

  useEffect(() => {
    if (id) {
      getExperience(parseInt(id))
        .then(res => setExperience(res.data))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <LoadingScreen />;
  if (!experience) return <div className="p-20 text-center font-bold">{t('notFound')}</div>;

  // Mock array for carousel demonstration until the backend supports multiple images
  const experienceImages = [experience.imageUrl, experience.imageUrl, experience.imageUrl];

  return (
    <div className={`min-h-screen selection:bg-[#ff6b00] selection:text-white transition-colors duration-500 ${isDark ? 'bg-[#050505] text-white' : 'bg-white text-slate-900'}`}>
      {/* Subtle Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.02] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <section className="relative z-10 pt-32 md:pt-40 pb-20">
        <div className="section-container">
          {/* Breadcrumbs */}
          <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
            <Link to="/experiences" className={`group inline-flex items-center gap-3 transition-all ${isDark ? 'text-white/70 hover:text-[#ff6b00]' : 'text-slate-500 hover:text-[#003366]'}`}>
              <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
              <span className="text-xs font-black uppercase tracking-widest">{t('backToCatalog')}</span>
            </Link>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Main Content Area */}
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className={`mb-12 leading-[0.9] tracking-tighter ${
                  isDark 
                    ? 'text-[clamp(3rem,8vw,6rem)] font-black uppercase italic' 
                    : 'text-[clamp(2.5rem,6vw,5rem)] font-serif font-bold text-[#003366]'
                }`}>
                  {t(experience.title)}
                </h1>

                {/* Quick Info Bar */}
                <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 p-8 mb-12 border-y ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
                  <div className="space-y-1.5">
                    <p className="text-[11px] font-black uppercase tracking-wider opacity-50">{t('location')}</p>
                    <p className="text-sm md:text-base font-bold flex items-center gap-2">
                      <MapPin size={16} className={isDark ? 'text-[#ff6b00]' : 'text-[#003366]'} />
                      {t(experience.location).split(',')[0]}
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[11px] font-black uppercase tracking-wider opacity-50">{t('duration')}</p>
                    <p className="text-sm md:text-base font-bold flex items-center gap-2">
                      <Clock size={16} className={isDark ? 'text-[#ff6b00]' : 'text-[#003366]'} />
                      {experience.duration}
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[11px] font-black uppercase tracking-wider opacity-50">{t('groupSize')}</p>
                    <p className="text-sm md:text-base font-bold flex items-center gap-2">
                      <Users size={16} className={isDark ? 'text-[#ff6b00]' : 'text-[#003366]'} />
                      6 MAX
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[11px] font-black uppercase tracking-wider opacity-50">{t('safety')}</p>
                    <p className="text-sm md:text-base font-bold flex items-center gap-2">
                      <Shield size={16} className={isDark ? 'text-[#ff6b00]' : 'text-[#003366]'} />
                      {t('certified')}
                    </p>
                  </div>
                </div>

                {/* Main Feature Carousel Container */}
                <div className="mb-16 relative group">
                  <Carousel options={{ loop: true }}>
                    <SliderContainer className={`aspect-video overflow-hidden ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
                      {experienceImages.map((src, index) => (
                        <Slider key={index} className="w-full h-full">
                          <img 
                            src={src} 
                            className="w-full h-full object-cover transition-transform duration-1000" 
                            alt={`${experience.title} ${index + 1}`} 
                          />
                        </Slider>
                      ))}
                    </SliderContainer>
                    
                    {/* Controls */}
                    <SliderPrevButton className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/40 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all hover:bg-[#ff6b00] hover:text-black">
                      <ChevronLeft size={24} />
                    </SliderPrevButton>
                    <SliderNextButton className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/40 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all hover:bg-[#ff6b00] hover:text-black">
                      <ChevronRight size={24} />
                    </SliderNextButton>
                    
                    <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 ${isDark ? 'text-[#ff6b00]' : 'text-white'}`}>
                      <SliderDotButton />
                    </div>
                  </Carousel>

                  {/* Decorative Elements */}
                  <div className="absolute top-6 right-6 flex flex-col gap-2 z-20 pointer-events-none">
                    <div className="w-12 h-[2px] bg-white mix-blend-difference" />
                    <div className="w-8 h-[2px] bg-white mix-blend-difference self-end" />
                  </div>
                </div>

                {/* Narrative Description */}
                <div className="prose prose-lg max-w-3xl mb-24">
                  <h2 className={`mb-10 text-3xl md:text-4xl font-serif italic ${isDark ? 'text-white' : 'text-[#003366]'}`}>
                    {t('aboutExp')}
                  </h2>
                  <p className={`text-xl md:text-2xl leading-relaxed font-light ${isDark ? 'text-white/80' : 'text-slate-600'}`}>
                    {t(experience.description)}
                  </p>
                </div>

                {/* Mission Briefing Section */}
                <div className="mb-24">
                  <div className="flex items-center gap-4 mb-10">
                    <div className={`w-10 h-[1px] ${isDark ? 'bg-[#ff6b00]' : 'bg-[#003366]'}`} />
                    <span className="text-xs font-black uppercase tracking-[0.3em] opacity-60">MISSION BRIEFING</span>
                  </div>

                  <div className={`relative overflow-hidden ${isDark ? 'bg-white/5 border border-white/5' : 'bg-[#fafafa] border border-slate-100'}`}>
                    {/* Decorative Technical Background */}
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none select-none">
                      <div className="text-[80px] font-black italic leading-none">V-12B</div>
                    </div>

                    <div className="grid md:grid-cols-12">
                      {/* Included Items */}
                      <div className="md:col-span-7 p-10 lg:p-14 border-b md:border-b-0 md:border-r border-current border-opacity-10">
                        <h3 className={`text-2xl font-serif italic mb-10 ${isDark ? 'text-white' : 'text-[#003366]'}`}>
                          {t('included')}
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-8">
                          {[t('bilingualPilot'), t('aeroInsurance'), t('vipAccess'), t('onboardCatering')].map((item, i) => (
                            <div key={i} className="flex items-start gap-4 group">
                              <div className={`mt-2 w-2 h-2 rounded-full transition-transform group-hover:scale-150 ${isDark ? 'bg-[#ff6b00]' : 'bg-[#003366]'}`} />
                              <span className="text-xs font-bold uppercase tracking-wider opacity-90 leading-tight">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Meeting Point Technical Block */}
                      <div className={`md:col-span-5 p-10 lg:p-14 flex flex-col justify-between ${
                        isDark ? 'bg-white/5' : 'bg-[#003366] text-white'
                      }`}>
                        <div>
                          <h4 className={`text-xs font-black uppercase tracking-widest mb-8 ${isDark ? 'opacity-50' : 'text-white/60'}`}>
                            {t('meetingPoint')}
                          </h4>
                          <div className="space-y-4">
                            <p className="text-base font-black leading-tight uppercase tracking-tight">AERÓDROMO VITACURA</p>
                            <p className={`text-xs font-mono leading-relaxed uppercase ${isDark ? 'opacity-70' : 'text-white/80'}`}>
                              HANGAR 12-B, SANTIAGO, CHILE.<br/>
                              LAT: -33.3742 / LON: -70.5786
                            </p>
                          </div>
                        </div>
                        
                        <div className="mt-12 flex items-center justify-between">
                          <div className={`p-3.5 rounded-full ${isDark ? 'bg-[#ff6b00] text-black' : 'bg-white text-[#003366]'}`}>
                            <MapPin size={20} />
                          </div>
                          <div className="text-right">
                            <span className={`text-[10px] font-mono block mb-1 ${isDark ? 'opacity-50' : 'text-white/50'}`}>OPERATIONAL STATUS</span>
                            <span className="text-xs font-black text-green-400 tracking-widest uppercase">READY FOR DEPLOY</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sticky Sidebar Widget */}
            <div className="lg:col-span-4">
              <aside className="sticky top-32">
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-10 transition-all ${
                    isDark 
                      ? 'bg-white text-black' 
                      : 'bg-[#003366] text-white shadow-[0_30px_60px_-15px_rgba(0,51,102,0.3)]'
                  }`}
                >
                  <div className="mb-10 flex flex-col items-center text-center border-b border-current border-opacity-10 pb-10">
                    <span className="text-xs font-black uppercase tracking-[0.2em] opacity-50 mb-4">{t('finalPrice')}</span>
                    <div className="text-7xl font-black italic tracking-tighter mb-1">
                      ${experience.price}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest opacity-60 uppercase">USD TOTAL</span>
                  </div>

                  <Link 
                    to={`/checkout?experienceId=${experience.id}`} 
                    className={`group relative w-full py-8 flex items-center justify-center gap-4 transition-all active:scale-95 ${
                      isDark ? 'bg-black text-white hover:bg-[#ff6b00]' : 'bg-white text-[#003366] hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-sm font-black uppercase tracking-[0.3em] relative z-10">{t('bookNow')}</span>
                    <div className="absolute inset-0 bg-current opacity-0 group-hover:opacity-5 transition-opacity" />
                  </Link>

                  <div className="mt-8 flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2 opacity-40">
                      <Shield size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">{t('securePayment')}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Secondary Info Card */}
                <div className={`mt-8 p-8 border ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
                   <div className="flex items-start gap-4">
                     <Info size={20} className="mt-1 opacity-50" />
                     <p className="text-xs leading-relaxed font-bold uppercase opacity-70 italic">
                        {isDark ? t('tacticalPrep') : t('conciergeTeam')}
                     </p>
                   </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ExperienceDetail;



