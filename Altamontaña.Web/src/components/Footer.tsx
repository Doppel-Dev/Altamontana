import { Link } from 'react-router-dom';
import { Mountain, Instagram, Facebook, Twitter, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
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
        { name: t(content.footer_srv1 || 'Heli-Skiing'), path: '/experiences' },
        { name: t(content.footer_srv2 || 'Trekking VIP'), path: '/experiences' },
        { name: t(content.footer_srv3 || 'Refugios Premium'), path: '/experiences' },
        { name: t(content.footer_srv4 || 'Expediciones'), path: '/experiences' },
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className={`relative overflow-hidden transition-colors duration-500 ${
      isDark ? 'bg-black text-white' : 'bg-[#fcfcfc] text-[#003366]'
    }`}>
      {/* Background Texture/Noise for Dark Mode */}
      {isDark && (
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
      )}

      {/* Decorative Top Border with Gradient */}
      <div className={`h-[1px] w-full ${
        isDark 
          ? 'bg-gradient-to-r from-transparent via-[#ff6b00]/30 to-transparent' 
          : 'bg-gradient-to-r from-transparent via-[#003366]/10 to-transparent'
      }`} />

      <div className="section-container pt-24 pb-12">
        {/* Main Footer Content */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20"
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="space-y-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className={`p-2.5 transition-all duration-500 ${
                isDark ? 'bg-[#ff6b00] text-black scale-110' : 'bg-[#003366] text-white'
              }`}>
                <Mountain size={28} />
              </div>
              <span className={`text-2xl uppercase ${
                isDark ? 'font-sans text-white italic font-black tracking-tighter' : 'font-serif text-[#003366] font-bold tracking-tight'
              }`}>
                Alta Montaña
              </span>
            </Link>
            <p className={`body-small opacity-60 max-w-xs leading-relaxed ${isDark ? 'italic font-sans' : 'font-serif'}`}>
              {t(content.footer_desc || 'Redefiniendo el lujo en la cumbre. Experiencias diseñadas para quienes buscan lo extraordinario en el fin del mundo.')}
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <motion.a 
                  key={i}
                  href="#" 
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 transition-all duration-300 ${
                    isDark 
                      ? 'bg-white/5 text-white hover:bg-[#ff6b00] hover:text-black border border-white/10' 
                      : 'bg-[#003366]/5 text-[#003366] hover:bg-[#003366] hover:text-white border border-[#003366]/5'
                  }`}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Sections */}
          {sections.map((section, i) => (
            <motion.div variants={itemVariants} key={i}>
              <h4 className={`mb-8 ${isDark ? 'eyebrow-dark text-[#ff6b00]' : 'eyebrow-light text-[#003366]'}`}>
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <Link
                      to={link.path}
                      className={`body-small opacity-60 hover:opacity-100 transition-all flex items-center gap-2 group ${
                        isDark ? 'italic font-sans hover:text-[#ff6b00]' : 'font-serif hover:text-[#ff6b00]'
                      }`}
                    >
                      <ArrowUpRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#ff6b00]" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact Column */}
          <motion.div variants={itemVariants}>
            <h4 className={`mb-8 ${isDark ? 'eyebrow-dark text-[#ff6b00]' : 'eyebrow-light text-[#003366]'}`}>
              {t('contact')}
            </h4>
            <ul className="space-y-6">
              {[
                { Icon: MapPin, text: t(content.contact_address || 'Valle Nevado, Chile') },
                { Icon: Phone, text: t(content.contact_phone || '+56 2 2345 6789') },
                { Icon: Mail, text: t(content.contact_email || 'concierge@altamontana.cl') }
              ].map(({ Icon, text }, i) => (
                <li key={i} className="flex items-start gap-4 group">
                  <div className={`p-2 transition-colors duration-300 ${
                    isDark ? 'bg-white/5 text-[#ff6b00]' : 'bg-[#003366]/5 text-[#003366]'
                  }`}>
                    <Icon size={18} />
                  </div>
                  <span className={`body-small opacity-60 leading-tight group-hover:opacity-100 transition-opacity mt-1.5 ${
                    isDark ? 'italic font-sans' : 'font-serif'
                  }`}>
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className={`pt-12 border-t flex flex-col md:flex-row justify-between items-center gap-6 ${
            isDark ? 'border-white/5' : 'border-[#003366]/5'
          }`}
        >
          <p className="label-tiny opacity-40">
            © {new Date().getFullYear()} ALTA MONTAÑA. {t('all_rights_reserved') || 'TODOS LOS DERECHOS RESERVADOS.'}
          </p>
          <div className="flex gap-8">
            {['Privacidad', 'Términos', 'Seguridad'].map((text, i) => (
              <a key={i} href="#" className="label-tiny opacity-40 hover:opacity-100 transition-opacity hover:underline underline-offset-4">
                {text}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="space-y-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className={`p-2.5 transition-all duration-500 ${
                isDark ? 'bg-[#ff6b00] text-black scale-110' : 'bg-[#003366] text-white'
              }`}>
                <Mountain size={28} />
              </div>
              <span className={`text-2xl uppercase ${
                isDark ? 'font-sans text-white italic font-black tracking-tighter' : 'font-serif text-[#003366] font-bold tracking-tight'
              }`}>
                Alta Montaña
              </span>
            </Link>
            <p className={`body-small opacity-60 max-w-xs leading-relaxed ${isDark ? 'italic font-sans' : 'font-serif'}`}>
              {t(content.footer_desc || 'Redefiniendo el lujo en la cumbre. Experiencias diseñadas para quienes buscan lo extraordinario en el fin del mundo.')}
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <motion.a 
                  key={i}
                  href="#" 
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 transition-all duration-300 ${
                    isDark 
                      ? 'bg-white/5 text-white hover:bg-[#ff6b00] hover:text-black border border-white/10' 
                      : 'bg-[#003366]/5 text-[#003366] hover:bg-[#003366] hover:text-white border border-[#003366]/5'
                  }`}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Sections */}
          {sections.map((section, i) => (
            <motion.div variants={itemVariants} key={i}>
              <h4 className={`mb-8 ${isDark ? 'eyebrow-dark text-[#ff6b00]' : 'eyebrow-light text-[#003366]'}`}>
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <Link
                      to={link.path}
                      className={`body-small opacity-60 hover:opacity-100 transition-all flex items-center gap-2 group ${
                        isDark ? 'italic font-sans hover:text-[#ff6b00]' : 'font-serif hover:text-[#ff6b00]'
                      }`}
                    >
                      <ArrowUpRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#ff6b00]" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact Column */}
          <motion.div variants={itemVariants}>
            <h4 className={`mb-8 ${isDark ? 'eyebrow-dark text-[#ff6b00]' : 'eyebrow-light text-[#003366]'}`}>
              {t('contact')}
            </h4>
            <ul className="space-y-6">
              {[
                { Icon: MapPin, text: t(content.contact_address || 'Valle Nevado, Chile') },
                { Icon: Phone, text: t(content.contact_phone || '+56 2 2345 6789') },
                { Icon: Mail, text: t(content.contact_email || 'concierge@altamontana.cl') }
              ].map(({ Icon, text }, i) => (
                <li key={i} className="flex items-start gap-4 group">
                  <div className={`p-2 transition-colors duration-300 ${
                    isDark ? 'bg-white/5 text-[#ff6b00]' : 'bg-[#003366]/5 text-[#003366]'
                  }`}>
                    <Icon size={18} />
                  </div>
                  <span className={`body-small opacity-60 leading-tight group-hover:opacity-100 transition-opacity mt-1.5 ${
                    isDark ? 'italic font-sans' : 'font-serif'
                  }`}>
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className={`pt-12 border-t flex flex-col md:flex-row justify-between items-center gap-6 ${
            isDark ? 'border-white/5' : 'border-[#003366]/5'
          }`}
        >
          <p className="label-tiny opacity-40">
            © {new Date().getFullYear()} ALTA MONTAÑA. {t('all_rights_reserved') || 'TODOS LOS DERECHOS RESERVADOS.'}
          </p>
          <div className="flex gap-8">
            {['Privacidad', 'Términos', 'Seguridad'].map((text, i) => (
              <a key={i} href="#" className="label-tiny opacity-40 hover:opacity-100 transition-opacity hover:underline underline-offset-4">
                {text}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;