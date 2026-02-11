import { Link } from 'react-router-dom';
import { Mountain, Instagram, Facebook, Twitter, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getSiteContent } from '../services/api';

const Footer = () => {
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

  const sections = [
    {
      title: t('explore') || 'Explorar',
      links: [
        { name: t('home'), path: '/' },
        { name: t('experiences'), path: '/experiences' },
        { name: t('faq'), path: '/faq' },
        { name: t('contact'), path: '/contact' },
      ]
    },
    {
      title: t('services') || 'Servicios',
      links: [
        { name: t(content.footer_srv1 || 'srv1'), path: '/experiences' },
        { name: t(content.footer_srv2 || 'srv2'), path: '/experiences' },
        { name: t(content.footer_srv3 || 'srv3'), path: '/experiences' },
        { name: t(content.footer_srv4 || 'srv4'), path: '/experiences' },
      ]
    }
  ];

  return (
    <footer className={`pt-24 pb-12 border-t transition-colors duration-500 ${isDark ? 'bg-black border-white/10' : 'bg-slate-50 border-slate-100'}`}>
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Column */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className={`p-2 transition-colors ${isDark ? 'bg-[#ff6b00] text-black' : 'bg-[#003366] text-white'}`}>
                <Mountain size={24} />
              </div>
              <span className={`text-2xl font-bold tracking-tighter uppercase ${isDark ? 'text-white italic font-black' : 'text-[#003366] font-serif'}`}>
                Alta Montaña
              </span>
            </Link>
            <p className={`text-sm leading-relaxed font-medium uppercase italic ${isDark ? 'text-white/40' : 'text-slate-500'}`}>
              {t(content.footer_desc || 'footerDesc')}
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <motion.a 
                  key={i}
                  href="#" 
                  whileHover={{ y: -5, scale: 1.1 }}
                  className={`p-3 rounded-full transition-colors ${isDark ? 'bg-white/5 text-white hover:bg-[#ff6b00] hover:text-black' : 'bg-[#003366]/5 text-[#003366] hover:bg-[#003366] hover:text-white'}`}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {sections.map((section, i) => (
            <div key={i}>
              <h4 className={`text-xs font-bold uppercase tracking-[0.3em] mb-8 ${isDark ? 'text-[#ff6b00]' : 'text-[#003366]'}`}>
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <Link 
                      to={link.path} 
                      className={`text-sm font-bold uppercase italic tracking-wider transition-all flex items-center gap-2 group ${isDark ? 'text-white/50 hover:text-white' : 'text-slate-500 hover:text-[#003366]'}`}
                    >
                      <ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column */}
          <div>
            <h4 className={`text-xs font-bold uppercase tracking-[0.3em] mb-8 ${isDark ? 'text-[#ff6b00]' : 'text-[#003366]'}`}>
              {t('contact')}
            </h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin size={20} className={isDark ? 'text-white/20' : 'text-[#003366]/20'} />
                <span className={`text-sm font-bold uppercase italic ${isDark ? 'text-white/50' : 'text-slate-500'}`}>{t(content.contact_address || 'footerAddress')}</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone size={20} className={isDark ? 'text-white/20' : 'text-[#003366]/20'} />
                <span className={`text-sm font-bold uppercase italic ${isDark ? 'text-white/50' : 'text-slate-500'}`}>{t(content.contact_phone || '+54 11 1234 5678')}</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail size={20} className={isDark ? 'text-white/20' : 'text-[#003366]/20'} />
                <span className={`text-sm font-bold uppercase italic ${isDark ? 'text-white/50' : 'text-slate-500'}`}>{t(content.contact_email || 'concierge@septos.com')}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-12 border-t flex flex-col md:flex-row justify-between items-center gap-6 ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
          <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isDark ? 'text-white/20' : 'text-slate-400'}`}>
            {t(content.footer_rights || 'footerRights')}
          </p>
          <div className="flex gap-8">
            {['Privacy', 'Terms', 'Security'].map((text, i) => (
              <a key={i} href="#" className={`text-[10px] font-bold uppercase tracking-[0.2em] hover:underline ${isDark ? 'text-white/20 hover:text-white' : 'text-slate-400 hover:text-[#003366]'}`}>
                {text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;