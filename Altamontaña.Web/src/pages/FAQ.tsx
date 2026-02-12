import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useState, useEffect } from 'react';
import { getSiteContent } from '../services/api';
import { Plus, Minus, ShieldCheck, HelpCircle, LifeBuoy, ShieldAlert, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQItem = ({ faq, isOpen, toggle, isDark }: { faq: any, isOpen: boolean, toggle: () => void, isDark: boolean }) => {
  return (
    <div 
      className={`group transition-all duration-300 border-l-4 ${
        isOpen 
          ? (isDark ? 'border-[#ff6b00] bg-white/5' : 'border-[#003366] bg-slate-50') 
          : 'border-transparent hover:border-current hover:opacity-100 opacity-80'
      }`}
    >
      <button 
        onClick={toggle}
        className="w-full text-left p-8 flex justify-between items-center gap-6"
      >
        <div className="flex items-center gap-6">
          <h3 className={`transition-all ${
            isOpen
              ? (isDark ? 'heading-h4-dark text-brand-orange' : 'heading-h4-light text-brand-blue')
              : (isDark ? 'heading-h4-dark text-white' : 'heading-h4-light text-slate-800')
          }`}>
            {faq.q}
          </h3>
        </div>
        <div className={`p-2 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}>
          {isOpen ? <Minus size={20} className={isDark ? 'text-[#ff6b00]' : 'text-[#003366]'} /> : <Plus size={20} />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className="overflow-hidden"
          >
            <div className={`px-4 sm:px-8 md:px-12 lg:px-24 pb-10 ${isDark ? 'italic' : ''}`}>
              <div className="max-w-2xl body-large text-secondary">
                {faq.a}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';
  const [content, setContent] = useState<any>({});
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    getSiteContent().then(res => {
      const contentMap = res.data.reduce((acc: any, curr: any) => {
        acc[curr.key] = curr.value;
        return acc;
      }, {});
      setContent(contentMap);
    });
  }, []);

  // Mapeamos dinámicamente desde el contenido de la base de datos
  const faqs = [
    { id: "01", q: t(content.faq_q1 || 'faqQ1'), a: t(content.faq_a1 || 'faqA1') },
    { id: "02", q: t(content.faq_q2 || 'faqQ2'), a: t(content.faq_a2 || 'faqA2') },
    { id: "03", q: t(content.faq_q3 || 'faqQ3'), a: t(content.faq_a3 || 'faqA3') },
    { id: "04", q: t(content.faq_q4 || 'faqQ4'), a: t(content.faq_a4 || 'faqA4') }
  ];

  return (
    <div className={`min-h-screen pt-40 pb-24 transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-slate-50'}`}>
      <div className="section-container max-w-5xl relative z-10">
        <header className="mb-24 flex flex-col items-center text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`p-4 rounded-full mb-8 ${isDark ? 'bg-[#ff6b00]/10 text-[#ff6b00]' : 'bg-[#003366]/10 text-[#003366]'}`}
          >
            <ShieldCheck size={40} />
          </motion.div>
          <h1 className={isDark ? 'heading-h1-dark text-white mb-6' : 'heading-h1-light text-[#003366] mb-6'}>
            {t(content.faq_title || 'faqTitle')}
          </h1>
          <p className={`body-large text-muted uppercase italic max-w-2xl ${isDark ? '' : 'text-[#003366]'}`}>
            {t(content.faq_sub || 'faqSub')}
          </p>
        </header>

        <div className={`border-t border-b ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
          {faqs.map((faq, i) => (
            <FAQItem 
              key={i} 
              faq={faq} 
              isOpen={openIndex === i} 
              toggle={() => setOpenIndex(openIndex === i ? null : i)}
              isDark={isDark}
            />
          ))}
        </div>

        <div className="mt-32 grid md:grid-cols-3 gap-8">
          <div className={`p-8 card-theme flex flex-col gap-4 ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white shadow-xl border-none'}`}>
            <HelpCircle className={isDark ? "text-[#ff6b00]" : "text-[#003366]"} size={32} />
            <h4 className={isDark ? 'heading-h4-dark' : 'heading-h4-light'}>{t('support247')}</h4>
            <p className="body-small text-muted">{t('supportDesc')}</p>
          </div>
          <div className={`p-8 card-theme flex flex-col gap-4 ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white shadow-xl border-none'}`}>
            <LifeBuoy className={isDark ? "text-[#ff6b00]" : "text-[#003366]"} size={32} />
            <h4 className={isDark ? 'heading-h4-dark' : 'heading-h4-light'}>{t('airInsurance')}</h4>
            <p className="body-small text-muted">{t('airInsuranceDesc')}</p>
          </div>
          <div className={`p-8 card-theme flex flex-col gap-4 ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white shadow-xl border-none'}`}>
            <ShieldAlert className={isDark ? "text-[#ff6b00]" : "text-[#003366]"} size={32} />
            <h4 className={isDark ? 'heading-h4-dark' : 'heading-h4-light'}>{t('dgacChile')}</h4>
            <p className="body-small text-muted">{t('dgacDesc')}</p>
          </div>
        </div>

        <div className="mt-32 text-center">
          <h2 className={`mb-8 ${isDark ? 'heading-h2-dark text-white' : 'heading-h2-light text-[#003366]'}`}>
            {t('moreQuestions')}
          </h2>
          <Link 
            to="/contact" 
            className={`inline-flex items-center gap-4 px-12 py-6 font-black uppercase italic transition-all active:scale-95 ${
              isDark ? 'bg-[#ff6b00] text-black hover:bg-white' : 'bg-[#003366] text-white hover:bg-slate-800'
            }`}
          >
            {t('talkConcierge')} <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQ;