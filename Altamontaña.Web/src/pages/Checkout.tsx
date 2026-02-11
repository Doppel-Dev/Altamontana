import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getExperience, createWebpayTransaction } from '../services/api';
import { Experience } from '../types';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, ShieldCheck, MapPin } from 'lucide-react';
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
      // Guardamos datos temporales para la vuelta de Transbank
      localStorage.setItem('temp_booking', JSON.stringify({
        experience,
        booking: formData
      }));

      const totalPriceClp = Math.round((experience.price * formData.participants) * 950);
      const res = await createWebpayTransaction(experience.id, totalPriceClp);
      
      // Redirección POST a Transbank
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

  if (!experience) return <div className="p-20 text-center font-bold italic">Sincronizando...</div>;

  return (
    <div className={`min-h-screen pt-40 pb-24 ${isDark ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'}`}>
      <div className="section-container max-w-5xl">
        <header className="mb-16 flex items-center gap-6">
          <Link to={`/experience/${experience.id}`} className={`p-3 transition-all ${isDark ? 'bg-neutral-900 text-white hover:bg-[#ff6b00]' : 'bg-white text-[#003366] shadow-md hover:scale-110'}`}>
            <ArrowLeft size={24} />
          </Link>
          <h1 className={`text-4xl md:text-7xl leading-none ${isDark ? 'font-black uppercase italic tracking-tighter' : 'font-serif text-[#003366]'}`}>
            {t('checkoutTitle')}
          </h1>
        </header>

        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <form onSubmit={handleSubmit} className={`p-10 card-theme ${isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-white border-none shadow-2xl'}`}>
              <div className="space-y-10">
                <div>
                  <label className={`block text-[10px] font-bold uppercase tracking-[0.2em] mb-4 ${isDark ? 'text-neutral-500' : 'text-slate-400'}`}>{t('fullName')}</label>
                  <input required type="text" className={`w-full bg-transparent border-b-2 outline-none py-4 text-xl font-bold transition-all ${isDark ? 'border-neutral-800 focus:border-[#ff6b00] text-white' : 'border-slate-100 focus:border-[#003366] text-[#003366]'}`} value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} />
                </div>
                <div>
                  <label className={`block text-[10px] font-bold uppercase tracking-[0.2em] mb-4 ${isDark ? 'text-neutral-500' : 'text-slate-400'}`}>Email</label>
                  <input required type="email" className={`w-full bg-transparent border-b-2 outline-none py-4 text-xl font-bold transition-all ${isDark ? 'border-neutral-800 focus:border-[#ff6b00] text-white' : 'border-slate-100 focus:border-[#003366] text-[#003366]'}`} value={formData.customerEmail} onChange={e => setFormData({...formData, customerEmail: e.target.value})} />
                </div>
                <div>
                  <label className={`block text-[10px] font-bold uppercase tracking-[0.2em] mb-4 ${isDark ? 'text-neutral-500' : 'text-slate-400'}`}>{t('passengers')}</label>
                  <select className={`w-full bg-transparent border-b-2 outline-none py-4 text-xl font-bold transition-all ${isDark ? 'border-neutral-800 focus:border-[#ff6b00] text-white' : 'border-slate-100 focus:border-[#003366] text-[#003366]'}`} value={formData.participants} onChange={e => setFormData({...formData, participants: parseInt(e.target.value)})}>
                    {[1,2,3,4,5,6].map(n => <option key={n} value={n} className="text-black">{n} {n === 1 ? (isDark ? 'RECLUTA' : 'PASAJERO') : (isDark ? 'RECLUTAS' : 'PASAJEROS')}</option>)}
                  </select>
                </div>
                <button disabled={submitting} className={`btn-primary-theme w-full py-6 text-xl font-black mt-4 active:scale-95 ${isDark ? 'hover:bg-white hover:text-black' : ''}`}>
                  {submitting ? '...' : t('confirmAndPay')}
                </button>
              </div>
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className={`p-10 card-theme h-fit relative overflow-hidden ${isDark ? 'bg-[#ff6b00] text-black' : 'bg-[#003366] text-white shadow-2xl'}`}>
              <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
                <ShieldCheck size={120} />
              </div>
              <h3 className={`text-3xl font-black uppercase italic mb-10 border-b pb-6 tracking-tighter ${isDark ? 'border-black/10' : 'border-white/10'}`}>Resumen de Vuelo</h3>
              <div className="flex gap-8 mb-12">
                <img src={experience.imageUrl} className={`w-28 h-28 object-cover border-4 shadow-xl ${isDark ? 'border-black' : 'border-white'}`} alt={t(experience.title)} />
                <div>
                  <p className="font-black italic uppercase text-2xl leading-tight mb-2 tracking-tighter break-words">{t(experience.title)}</p>
                  <p className={`text-xs uppercase font-bold tracking-widest flex items-center gap-2 ${isDark ? 'text-black/60' : 'text-white/70'}`}>
                    <MapPin size={14} /> {t(experience.location)}
                  </p>
                </div>
              </div>
              <div className={`space-y-6 pt-10 border-t ${isDark ? 'border-black/10' : 'border-white/10'}`}>
                <div className={`flex justify-between font-bold uppercase tracking-widest text-sm ${isDark ? 'text-black/60' : 'text-white/70'}`}>
                  <span>Tarifa x {formData.participants}</span>
                  <span className="price-tag">${experience.price * formData.participants}</span>
                </div>
                <div className="flex justify-between items-end pt-8">
                  <span className="text-xl font-bold uppercase italic tracking-tighter">{t('total')}</span>
                  <span className="text-6xl font-black italic tracking-tighter leading-none">${experience.price * formData.participants}</span>
                </div>
              </div>
            </div>
            <div className={`mt-12 flex justify-center gap-10 opacity-30 font-black italic uppercase text-xs tracking-widest ${isDark ? 'text-white' : 'text-[#003366]'}`}>
              <div className="flex items-center gap-2"><Lock size={16} /> 256-BIT SSL</div>
              <div className="flex items-center gap-2"><ShieldCheck size={16} /> AIR-SAFE</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
