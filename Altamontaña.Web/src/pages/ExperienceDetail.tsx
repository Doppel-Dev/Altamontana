import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getExperience } from '../services/api';
import { Experience } from '../types';
import { motion } from 'framer-motion';
import { Clock, Shield, Users, Zap, Check, ArrowLeft, Calendar } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import LoadingScreen from '../components/LoadingScreen';

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

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-slate-900'}`}>
      {/* Immersive Header */}
      <section className="relative h-[75vh] overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src={experience.imageUrl} 
          className={`w-full h-full object-cover ${isDark ? 'opacity-40 grayscale' : 'opacity-90'}`} 
          alt={experience.title} 
        />
        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-t from-black via-transparent' : 'bg-gradient-to-t from-white via-transparent'}`} />
        <div className="absolute inset-0 flex items-end">
          <div className="section-container pb-16">
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
              <Link to="/experiences" className={`inline-flex items-center gap-2 mb-8 text-xs font-bold uppercase tracking-widest transition-colors ${isDark ? 'text-[#ff6b00]' : 'text-[#003366]'}`}>
                <ArrowLeft size={16} /> {t('backToCatalog')}
              </Link>
              <h1 className={`text-3xl sm:text-5xl md:text-8xl mb-6 leading-[0.9] ${isDark ? 'font-black italic uppercase tracking-tighter' : 'font-serif text-[#003366]'}`}>
                {t(experience.title)}
              </h1>
              <div className="flex gap-4">
                <span className={`px-6 py-2 text-xs font-bold uppercase italic shadow-xl ${isDark ? 'bg-[#ff6b00] text-black' : 'bg-[#003366] text-white'}`}>
                  {t(experience.location)}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Info */}
      <section className="py-24">
        <div className="section-container">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-16">
              {/* Features Bar */}
              <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">{t('duration')}</p>
                  <p className="font-bold flex items-center gap-2 italic text-lg"><Clock size={18} className={isDark ? 'text-[#ff6b00]' : 'text-[#003366]'} /> {experience.duration}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">{t('groupSize')}</p>
                  <p className="font-bold flex items-center gap-2 italic text-lg"><Users size={18} className={isDark ? 'text-[#ff6b00]' : 'text-[#003366]'} /> Máx 6</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">{t('safety')}</p>
                  <p className="font-bold flex items-center gap-2 italic text-lg"><Shield size={18} className={isDark ? 'text-[#ff6b00]' : 'text-[#003366]'} /> {t('certified')}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">{t('difficulty')}</p>
                  <p className="font-bold italic text-lg">{t('moderate')}</p>
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                <h2 className={`text-4xl mb-8 ${isDark ? 'font-black italic uppercase' : 'font-serif text-[#003366]'}`}>
                  {isDark ? t('missionDesc') : t('aboutExp')}
                </h2>
                <p className={`leading-relaxed text-xl font-medium ${isDark ? 'text-white/60 uppercase' : 'text-slate-600'}`}>
                  {t(experience.description)}
                </p>
                <p className={`mt-6 leading-relaxed ${isDark ? 'text-white/40 italic' : 'text-slate-500'}`}>
                  {isDark 
                    ? t('tacticalPrep')
                    : t('conciergeTeam')}
                </p>
              </div>

              <div className={`p-12 card-theme ${isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-slate-50 border-slate-100'}`}>
                <h3 className={`text-2xl mb-10 ${isDark ? 'font-black italic text-[#ff6b00]' : 'font-serif text-[#003366]'}`}>
                  {isDark ? t('missionIncluded') : t('included')}
                </h3>
                <ul className="grid md:grid-cols-2 gap-8">
                  {[
                    t('bilingualPilot'),
                    t('aeroInsurance'),
                    t('vipAccess'),
                    t('onboardCatering')
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 font-bold text-sm uppercase italic">
                      <div className={`p-1 ${isDark ? 'bg-[#ff6b00] text-black' : 'bg-[#003366] text-white'}`}>
                        <Check size={14} strokeWidth={4} />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sticky Sidebar */}
            <aside className="lg:col-span-1">
              <motion.div 
                whileHover={{ y: -5 }}
                className={`sticky top-32 p-10 card-theme ${isDark ? 'bg-white text-black' : 'bg-[#003366] text-white shadow-2xl shadow-[#003366]/20'}`}
              >
                <div className={`mb-10 border-b pb-8 ${isDark ? 'border-black/10' : 'border-white/10'}`}>
                  <span className={`text-[10px] font-bold uppercase tracking-[0.3em] mb-3 block ${isDark ? 'text-black/50' : 'text-white/70'}`}>{t('finalPrice')}</span>
                  <div className={`text-7xl font-black italic tracking-tighter leading-none ${isDark ? 'text-black' : 'text-white'}`}>
                    ${experience.price} <span className={`text-xl uppercase not-italic font-bold ${isDark ? 'text-black/40' : 'text-white/60'}`}>USD</span>
                  </div>
                </div>

                <div className="space-y-6 mb-12">
                  <div className="flex items-center gap-4 font-bold uppercase italic text-sm">
                    <Calendar size={20} className={isDark ? 'text-black' : 'text-white'} />
                    {t('dailyDepartures')}
                  </div>
                  <div className="flex items-center gap-4 font-bold uppercase italic text-sm">
                    <Zap size={20} className={isDark ? 'text-[#ff6b00]' : 'text-white'} fill="currentColor" />
                    {t('immediateAction')}
                  </div>
                </div>

                <Link to={`/checkout?experienceId=${experience.id}`} className={`btn-primary-theme w-full py-6 text-xl font-black shadow-xl transition-all active:scale-95 ${
                  isDark ? 'bg-black text-white hover:bg-[#ff6b00]' : 'bg-white text-[#003366] hover:bg-slate-100'
                }`}>
                  {t('bookNow')}
                </Link>
                
                <p className="mt-8 text-center text-[10px] font-bold uppercase tracking-widest opacity-40 leading-relaxed">
                   {t('securePayment')}
                </p>
              </motion.div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExperienceDetail;
