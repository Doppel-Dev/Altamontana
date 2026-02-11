import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useState, useEffect } from 'react';
import { getSiteContent } from '../services/api';

const Contact = () => {
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

  return (
    <div className={`min-h-screen pt-40 pb-24 transition-colors duration-500`} style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-20">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className={`text-4xl sm:text-6xl md:text-8xl mb-8 leading-none ${isDark ? 'font-black italic uppercase tracking-tighter text-white' : 'font-serif text-[#003366]'}`}>
              {t(content.contact_title || 'contactTitle')}
            </h1>
            <p className="text-xl mb-12 font-bold opacity-60 uppercase italic leading-tight max-w-md" style={{ color: 'var(--text-sec)' }}>
              {t(content.contact_sub || 'contactSub')}
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className={`p-4 ${isDark ? 'bg-[#ff6b00] text-black' : 'bg-[#003366] text-white'}`}><Mail size={24} /></div>
                <div>
                  <p className="text-[10px] font-bold uppercase opacity-40">{t('digitalChannel') || 'Canal Digital'}</p>
                  <p className="text-xl font-bold italic" style={{ color: 'var(--text-main)' }}>{t(content.contact_email || 'concierge@septos.com')}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className={`p-4 ${isDark ? 'bg-[#ff6b00] text-black' : 'bg-[#003366] text-white'}`}><Phone size={24} /></div>
                <div>
                  <p className="text-[10px] font-bold uppercase opacity-40">{t('attention') || 'Atención'}</p>
                  <p className="text-xl font-bold italic" style={{ color: 'var(--text-main)' }}>{t(content.contact_phone || '+54 11 1234 5678')}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className={`p-4 ${isDark ? 'bg-[#ff6b00] text-black' : 'bg-[#003366] text-white'}`}><MapPin size={24} /></div>
                <div>
                  <p className="text-[10px] font-bold uppercase opacity-40">{t('base') || 'Base'}</p>
                  <p className="text-xl font-bold italic" style={{ color: 'var(--text-main)' }}>{t(content.contact_address || 'Sector Alpha, Vitacura')}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className={`p-12 card-theme`} style={{ backgroundColor: 'var(--bg-sec)' }}>
              <h3 className={`text-3xl mb-10 ${isDark ? 'font-black italic uppercase text-white' : 'font-serif text-[#003366]'}`}>{t('sendMsg')}</h3>
              <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                <input type="text" placeholder={t('formName')} className={`w-full bg-transparent border-b-2 outline-none py-4 font-bold transition-all ${isDark ? 'border-neutral-700 focus:border-[#ff6b00] text-white' : 'border-slate-200 focus:border-[#003366] text-[#003366]'}`} />
                <input type="email" placeholder={t('formEmail')} className={`w-full bg-transparent border-b-2 outline-none py-4 font-bold transition-all ${isDark ? 'border-neutral-700 focus:border-[#ff6b00] text-white' : 'border-slate-200 focus:border-[#003366] text-[#003366]'}`} />
                <textarea rows={4} placeholder={t('formMsg')} className={`w-full bg-transparent border-b-2 outline-none py-4 font-bold transition-all ${isDark ? 'border-neutral-700 focus:border-[#ff6b00] text-white' : 'border-slate-200 focus:border-[#003366] text-[#003366]'}`}></textarea>
                <button className="btn-primary-theme w-full py-5 text-lg">{t('transmit')}</button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;