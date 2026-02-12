import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getExperience, createWebpayTransaction } from '../services/api';
import { Experience } from '../types';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, ShieldCheck, MapPin, Zap, ChevronRight, User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const experienceId = searchParams.get('experienceId');
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';
  
  const [experience, setExperience] = useState<Experience | null>(null);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    participants: 1
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (experienceId) {
      getExperience(parseInt(experienceId))
        .then(res => setExperience(res.data))
        .catch(err => console.error(err));
    }
  }, [experienceId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!experience) return;

    setSubmitting(true);
    try {
      localStorage.setItem('temp_booking', JSON.stringify({
        experience,
        booking: formData
      }));

      const totalPriceClp = Math.round((experience.price * formData.participants) * 950);
      const res = await createWebpayTransaction(experience.id, totalPriceClp);
      
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = res.data.url;
      const tokenInput = document.createElement('input');
      tokenInput.type = 'hidden';
      tokenInput.name = 'token_ws';
      tokenInput.value = res.data.token;
      form.appendChild(tokenInput);
      document.body.appendChild(form);
      form.submit();
    } catch (err: any) {
      console.error("Webpay Error Detail:", err.response?.data);
      const errorMsg = err.response?.data?.message || err.response?.data?.error || "Error desconocido";
      alert(`Error al iniciar el pago con Webpay: ${errorMsg}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (!experience) return (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-[#050505] text-white' : 'bg-white'}`}>
      <div className="flex flex-col items-center gap-6">
        <div className={`w-12 h-[1px] ${isDark ? 'bg-[#ff6b00]' : 'bg-[#003366]'} animate-pulse`} />
        <span className="text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">{t('preparingCheckout')}</span>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen pt-40 md:pt-44 pb-32 relative overflow-hidden transition-colors duration-500 ${isDark ? 'bg-[#050505] text-white' : 'bg-[#fafafa] text-slate-900'}`}>
      {/* Background Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.02] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="section-container max-w-5xl relative z-10">
        <header className="mb-16 md:mb-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to={`/experience/${experience.id}`} className={`p-3 rounded-full transition-all border ${
              isDark ? 'border-white/10 hover:bg-[#ff6b00] hover:text-black' : 'border-slate-200 hover:bg-[#003366] hover:text-white shadow-sm'
            }`}>
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className={`leading-none mb-2 ${
                isDark ? 'text-4xl md:text-5xl font-black uppercase tracking-tighter' : 'text-3xl md:text-4xl font-serif font-bold text-[#003366]'
              }`}>
                {t('checkoutTitle')}
              </h1>
              <div className="flex items-center gap-2 opacity-40">
                <span className="text-[9px] font-black uppercase tracking-widest">{t('step')} 02</span>
                <div className="w-6 h-[1px] bg-current" />
                <span className="text-[9px] font-black uppercase tracking-widest">{t('finalAuth')}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Form Section */}
          <div className="lg:col-span-7">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid gap-10">
                  <div className="relative">
                    <label className={`absolute -top-2.5 left-4 px-2 text-[9px] font-black uppercase tracking-widest z-10 ${
                      isDark ? 'bg-[#050505] text-white/40' : 'bg-[#fafafa] text-slate-400'
                    }`}>
                      {t('fullName')}
                    </label>
                    <div className="relative group">
                      <User className={`absolute left-6 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                        isDark ? 'text-white/20 group-focus-within:text-[#ff6b00]' : 'text-slate-300 group-focus-within:text-[#003366]'
                      }`} size={18} />
                      <input 
                        required 
                        type="text" 
                        placeholder="ALEXANDER B. COLEMAN"
                        className={`w-full bg-transparent border-2 outline-none pl-14 pr-8 py-5 text-sm font-bold transition-all ${
                          isDark 
                            ? 'border-white/5 focus:border-[#ff6b00] text-white placeholder:text-white/5' 
                            : 'border-slate-200 focus:border-[#003366] text-[#003366] placeholder:text-slate-200'
                        }`} 
                        value={formData.customerName} 
                        onChange={e => setFormData({...formData, customerName: e.target.value})} 
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className={`absolute -top-2.5 left-4 px-2 text-[9px] font-black uppercase tracking-widest z-10 ${
                      isDark ? 'bg-[#050505] text-white/40' : 'bg-[#fafafa] text-slate-400'
                    }`}>
                      Email
                    </label>
                    <div className="relative group">
                      <Lock className={`absolute left-6 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                        isDark ? 'text-white/20 group-focus-within:text-[#ff6b00]' : 'text-slate-300 group-focus-within:text-[#003366]'
                      }`} size={18} />
                      <input 
                        required 
                        type="email" 
                        placeholder="PILOT@ALTAMONTANA.COM"
                        className={`w-full bg-transparent border-2 outline-none pl-14 pr-8 py-5 text-sm font-bold transition-all ${
                          isDark 
                            ? 'border-white/5 focus:border-[#ff6b00] text-white placeholder:text-white/5' 
                            : 'border-slate-200 focus:border-[#003366] text-[#003366] placeholder:text-slate-200'
                        }`} 
                        value={formData.customerEmail} 
                        onChange={e => setFormData({...formData, customerEmail: e.target.value})} 
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className={`absolute -top-2.5 left-4 px-2 text-[9px] font-black uppercase tracking-widest z-10 ${
                      isDark ? 'bg-[#050505] text-white/40' : 'bg-[#fafafa] text-slate-400'
                    }`}>
                      {t('passengers')}
                    </label>
                    <select 
                      className={`w-full bg-transparent border-2 outline-none px-6 py-5 text-sm font-bold appearance-none transition-all cursor-pointer ${
                        isDark 
                          ? 'border-white/5 focus:border-[#ff6b00] text-white' 
                          : 'border-slate-200 focus:border-[#003366] text-[#003366]'
                      }`} 
                      value={formData.participants} 
                      onChange={e => setFormData({...formData, participants: parseInt(e.target.value)})}
                    >
                      {[1,2,3,4,5,6].map(n => (
                        <option key={n} value={n} className="text-black bg-white">
                          {n} {n === 1 ? t('participants').slice(0, -1) : t('participants')}
                        </option>
                      ))}
                    </select>
                    <ChevronRight size={18} className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none opacity-40" />
                  </div>
                </div>

                <div className={`p-6 border border-dashed ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                   <p className="text-[11px] font-bold leading-relaxed opacity-60 flex items-start gap-4 uppercase italic">
                     <ShieldCheck size={16} className="shrink-0" />
                     {isDark ? t('tacticalPrep') : t('conciergeTeam')}
                   </p>
                </div>

                <button 
                  disabled={submitting} 
                  className={`group relative w-full py-6 flex items-center justify-center gap-5 overflow-hidden transition-all active:scale-95 ${
                    isDark ? 'bg-white text-black hover:bg-[#ff6b00]' : 'bg-[#003366] text-white hover:bg-[#002244]'
                  }`}
                >
                  <span className="text-xs font-black uppercase tracking-[0.3em] relative z-10">
                    {submitting ? t('processing') : t('confirmAndPay')}
                  </span>
                  <Zap size={16} className="relative z-10" fill="currentColor" />
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                </button>
              </form>
            </motion.div>
          </div>

          {/* Summary Section */}
          <div className="lg:col-span-5">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className={`relative overflow-hidden ${
                isDark ? 'bg-white text-black' : 'bg-[#003366] text-white shadow-[0_30px_60px_-15px_rgba(0,51,102,0.3)]'
              }`}>
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                  <ShieldCheck size={120} className="rotate-12" />
                </div>

                <div className="p-8 border-b border-current border-opacity-10">
                  <h3 className="text-lg font-black uppercase tracking-tight mb-8">{t('flightSummary')}</h3>
                  
                  <div className="flex gap-6 items-start">
                    <div className="w-20 h-20 shrink-0 overflow-hidden relative">
                      <img src={experience.imageUrl} className="w-full h-full object-cover grayscale" alt={t(experience.title)} />
                      <div className="absolute inset-0 border border-current border-opacity-10" />
                    </div>
                    <div className="space-y-2">
                      <p className="font-bold uppercase text-lg leading-tight tracking-tight">{t(experience.title)}</p>
                      <div className="flex items-center gap-2 opacity-50">
                        <MapPin size={12} />
                        <span className="text-[10px] font-black uppercase tracking-widest">{t(experience.location)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest opacity-50">
                      <span>{t('missionCost')} X {formData.participants}</span>
                      <span>${experience.price * formData.participants}</span>
                    </div>
                    <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest opacity-50">
                      <span>{t('airportTaxes')}</span>
                      <span>{t('includedShort')}</span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-current border-opacity-10">
                    <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <span className="text-[9px] font-black uppercase tracking-widest opacity-40">{t('total')}</span>
                        <div className="text-[10px] font-mono opacity-50">{t('usdEquivalent')}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-5xl font-black italic tracking-tighter leading-none">${experience.price * formData.participants}</div>
                      </div>
                    </div>
                  </div>

                  {/* Integrated Secure Badge Bar */}
                  <div className="pt-8 mt-8 border-t border-current border-opacity-5 flex items-center justify-center gap-6 opacity-30">
                    <div className="flex items-center gap-2">
                      <Lock size={12} />
                      <span className="text-[8px] font-black tracking-widest uppercase">SSL SECURE</span>
                    </div>
                    <div className="w-[1px] h-3 bg-current opacity-20" />
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={12} />
                      <span className="text-[8px] font-black tracking-widest uppercase">AIRSAFE</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Note */}
              <p className="mt-8 text-center text-[9px] font-bold uppercase tracking-widest opacity-40 max-w-xs mx-auto leading-relaxed">
                {t('securityNotice')}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
