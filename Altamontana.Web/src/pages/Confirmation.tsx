import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Printer, Download, ShieldCheck, Calendar, CreditCard, Hash, RefreshCw } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useEffect, useRef, useState } from 'react';
import { WebpayResponse } from '../types';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Confirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';
  const voucherRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

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

  const handleDownload = async () => {
    if (!voucherRef.current) return;
    
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(voucherRef.current, {
        scale: 2, // Mayor calidad
        useCORS: true,
        backgroundColor: isDark ? '#171717' : '#ffffff',
        logging: false,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`Voucher-Altamontana-${paymentData?.buy_order || 'Booking'}.pdf`);
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert('Error al generar el PDF. Por favor use la opción de Imprimir.');
    } finally {
      setIsDownloading(false);
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
                    ref={voucherRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`relative overflow-hidden rounded-[2rem] shadow-2xl print-voucher-card ${isDark ? 'bg-neutral-900 border border-neutral-800 text-white' : 'bg-white text-slate-900'}`}
                  >
                    {/* Decoración lateral de ticket */}
                    <div className={`absolute top-1/2 -left-4 w-8 h-8 rounded-full -translate-y-1/2 no-print ${isDark ? 'bg-black' : 'bg-slate-50'}`}></div>
                    <div className={`absolute top-1/2 -right-4 w-8 h-8 rounded-full -translate-y-1/2 no-print ${isDark ? 'bg-black' : 'bg-slate-50'}`}></div>
            
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
                                  <Calendar size={12} /> {t('accountingDate')}
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
                          <p className={`text-lg font-black uppercase italic tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {booking.participants} {booking.participants === 1 
                              ? (isDark ? t('recruit') : t('passenger')) 
                              : (isDark ? t('recruits') : t('passengersLabel'))}
                          </p>
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
                    <button 
                      onClick={handleDownload} 
                      disabled={isDownloading}
                      className={`px-10 py-5 font-bold uppercase tracking-widest text-xs flex items-center gap-3 border-2 transition-all ${isDownloading ? 'opacity-50 cursor-wait' : ''} ${isDark ? 'border-neutral-800 text-white hover:bg-white hover:text-black' : 'border-slate-200 text-slate-600 hover:border-[#003366] hover:text-[#003366]'}`}
                    >
                      {isDownloading ? (
                        <>
                          <RefreshCw size={20} className="animate-spin" /> {t('processing')}
                        </>
                      ) : (
                        <>
                          <Download size={20} /> {t('downloadVoucher')}
                        </>
                      )}
                    </button>
                    <Link to="/" className={`px-10 py-5 font-bold uppercase tracking-widest text-xs flex items-center gap-3 border-2 transition-all ${isDark ? 'border-[#ff6b00] text-[#ff6b00] hover:bg-[#ff6b00] hover:text-black' : 'border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white'}`}>
                      {t('backToHome')} <ArrowRight size={16} />
                    </Link>
                  </div>
        <div className="mt-20 text-center opacity-20 font-black italic uppercase text-[10px] tracking-[0.5em] no-print">
            Altamontana Flight Experience &copy; 2024 - Sky is not the limit
        </div>
      </div>

      <style>{`
        @media print {
            @page {
              margin: 1cm;
              size: portrait;
            }
            .no-print { display: none !important; }
            body { background: white !important; color: black !important; }
            .section-container { max-width: 100% !important; padding: 0 !important; margin: 0 !important; }
            .pt-40 { padding-top: 0 !important; }
            
            /* Aislar el voucher */
            .print-voucher-card {
                position: relative !important;
                top: 0 !important;
                left: 0 !important;
                width: 100% !important;
                box-shadow: none !important;
                border: 1px solid #eee !important;
                border-radius: 1rem !important;
                background: ${isDark ? '#171717' : 'white'} !important;
                color: ${isDark ? 'white' : 'black'} !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
            
            /* Asegurar visibilidad de textos */
            .print-voucher-card p, .print-voucher-card span {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
        }
      `}</style>
    </div>
  );

};

export default Confirmation;
