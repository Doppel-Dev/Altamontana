import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Printer, Share2, ShieldCheck, Calendar, CreditCard, Hash } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useEffect } from 'react';
import { WebpayResponse } from '../types';

const Confirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';

  useEffect(() => {
    // Si entran directo sin estado, mandarlos a home
    if (!state) {
        navigate('/');
    }
  }, [state, navigate]);

  if (!state) return null;

  const { experience, booking, paymentData, totalPrice }: { 
    experience: any, 
    booking: any, 
    paymentData: WebpayResponse, 
    totalPrice: number 
  } = state;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const shareData = {
      title: `Septos Flight - ${t(experience.title)}`,
      text: `¡Mi vuelo está confirmado! Me voy a volar con Septos Flight Experience: ${t(experience.title)}.`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert(t('linkCopied') || 'Enlace copiado al portapapeles');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  // Formatear fecha de Transbank o actual
  const transactionDate = paymentData?.transaction_date ? new Date(paymentData.transaction_date) : new Date();
  const date = transactionDate.toLocaleDateString('es-CL', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Formatear accounting_date (MMDD)
  const formatAccountingDate = (dateStr: string) => {
    if (!dateStr || dateStr.length !== 4) return null;
    const month = dateStr.substring(0, 2);
    const day = dateStr.substring(2, 4);
    const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    return `${day} ${months[parseInt(month) - 1]}`;
  };

  return (
    <div className={`min-h-screen pt-40 pb-24 transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-slate-50'}`}>
      <div className="section-container max-w-4xl">
        
        {/* Header de Éxito */}
        <div className="text-center mb-16">
            <motion.div 
                initial={{ scale: 0, rotate: -180 }} 
                animate={{ scale: 1, rotate: 0 }} 
                transition={{ type: "spring", damping: 12 }}
                className={`w-24 h-24 mx-auto mb-10 rounded-full flex items-center justify-center ${isDark ? 'bg-[#ff6b00] text-black' : 'bg-[#003366] text-white shadow-xl'}`}
            >
                <Check size={48} strokeWidth={4} />
            </motion.div>
            
                    <h1 className={`text-5xl md:text-7xl mb-6 ${isDark ? 'font-black uppercase italic tracking-tighter text-white' : 'font-serif text-[#003366]'}`}>
                      {t('confTitle')}
                    </h1>
                    <p className={`text-xl opacity-60 italic font-bold ${isDark ? 'text-white' : 'text-slate-600'}`}>
                      {t('confSub')} {booking.customerEmail}
                    </p>
                  </div>
            
                  {/* Voucher / Ticket */}
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`relative overflow-hidden rounded-[2rem] shadow-2xl ${isDark ? 'bg-neutral-900 border border-neutral-800' : 'bg-white'}`}
                  >
                    {/* Decoración lateral de ticket */}
                    <div className={`absolute top-1/2 -left-4 w-8 h-8 rounded-full -translate-y-1/2 ${isDark ? 'bg-black' : 'bg-slate-50'}`}></div>
                    <div className={`absolute top-1/2 -right-4 w-8 h-8 rounded-full -translate-y-1/2 ${isDark ? 'bg-black' : 'bg-slate-50'}`}></div>
            
                    <div className="p-8 md:p-12">
                      <div className="flex flex-col md:flex-row justify-between gap-12 mb-12 border-b border-dashed pb-12 border-neutral-700/20">
                        <div className="space-y-8">
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ff6b00] mb-2">{t('flightExp')}</p>
                            <p className={`text-3xl font-black uppercase italic tracking-tighter ${isDark ? 'text-white' : 'text-[#003366]'}`}>
                              {t(experience.title)}
                            </p>
                            <p className={`text-sm font-bold opacity-50 mt-1 uppercase tracking-widest ${isDark ? 'text-white' : 'text-slate-600'}`}>
                              {t(experience.location)}
                            </p>
                          </div>
                          <div className="flex gap-12">
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2 flex items-center gap-2">
                                <Calendar size={12} /> {t('purchaseDate')}
                              </p>
                              <p className={`text-sm font-bold uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>{date}</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2 flex items-center gap-2">
                                <Hash size={12} /> {t('orderNum')}
                              </p>
                              <p className={`text-sm font-bold uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>{paymentData?.buy_order || 'N/A'}</p>
                            </div>
                            {paymentData?.accounting_date && (
                              <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2 flex items-center gap-2">
                                  <Calendar size={12} /> Contable
                                </p>
                                <p className={`text-sm font-bold uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                  {formatAccountingDate(paymentData.accounting_date)}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
            
                        <div className={`p-8 rounded-2xl flex flex-col justify-center items-center md:items-end min-w-[240px] ${isDark ? 'bg-neutral-800/50' : 'bg-slate-50'}`}>
                          <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">{t('totalPaid')} (CLP)</p>
                          <p className={`text-5xl font-black italic tracking-tighter ${isDark ? 'text-[#ff6b00]' : 'text-[#003366]'}`}>
                            ${totalPrice?.toLocaleString('es-CL')}
                          </p>
                          <div className="flex items-center gap-2 mt-4 text-[10px] font-bold opacity-50 uppercase tracking-widest">
                            <ShieldCheck size={14} className="text-green-500" /> {t('secureTrans')}
                          </div>
                        </div>
                      </div>
            
                      <div className="grid md:grid-cols-3 gap-12">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-3">{t('responsiblePax')}</p>
                          <p className={`text-lg font-black uppercase italic tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{booking.customerName}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-3">{t('paxCount')}</p>
                          <p className={`text-lg font-black uppercase italic tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{booking.participants} {booking.participants === 1 ? (isDark ? 'RECLUTA' : 'PASAJERO') : (isDark ? 'RECLUTAS' : 'PASAJEROS')}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-3">{t('paymentMethod')}</p>
                          <div className="flex items-center gap-3">
                            <CreditCard size={20} className={isDark ? 'text-white/40' : 'text-slate-400'} />
                            <p className={`text-lg font-black uppercase italic tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                              Tarjeta **** {paymentData?.card_detail?.card_number || 'Webpay'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
            
                    {/* Pie del Voucher */}
                    <div className={`p-6 text-center border-t ${isDark ? 'bg-neutral-950/50 border-neutral-800' : 'bg-slate-50 border-slate-100'}`}>
                      <p className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-30">{t('boardingNotice')}</p>
                    </div>
                  </motion.div>
            
                  {/* Acciones */}
                  <div className="mt-12 flex flex-wrap gap-6 justify-center no-print">
                    <button onClick={handlePrint} className="btn-primary-theme px-10 py-5 flex items-center gap-3">
                      <Printer size={20} /> {t('printVoucher')}
                    </button>
                    <button onClick={handleShare} className={`px-10 py-5 font-bold uppercase tracking-widest text-xs flex items-center gap-3 border-2 transition-all ${isDark ? 'border-neutral-800 text-white hover:bg-white hover:text-black' : 'border-slate-200 text-slate-600 hover:border-[#003366] hover:text-[#003366]'}`}>
                      <Share2 size={20} /> {t('share')}
                    </button>
                    <Link to="/" className={`px-10 py-5 font-bold uppercase tracking-widest text-xs flex items-center gap-3 border-2 transition-all ${isDark ? 'border-[#ff6b00] text-[#ff6b00] hover:bg-[#ff6b00] hover:text-black' : 'border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white'}`}>
                      {t('backToHome')} <ArrowRight size={16} />
                    </Link>
                  </div>
        <div className="mt-20 text-center opacity-20 font-black italic uppercase text-[10px] tracking-[0.5em] no-print">
            Septos Flight Experience &copy; 2024 - Sky is not the limit
        </div>
      </div>

      <style>{`
        @media print {
            .no-print { display: none !important; }
            body { background: white !important; }
            .section-container { max-width: 100% !important; padding-top: 2rem !important; }
        }
      `}</style>
    </div>
  );
};

export default Confirmation;