import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Map, ArrowLeft, Crosshair } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const NotFound = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 selection:bg-[#ff6b00] selection:text-white transition-colors duration-500 ${isDark ? 'bg-[#050505] text-white' : 'bg-white text-slate-900'}`}>
      {/* Subtle Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* Background Technical Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.03] overflow-hidden whitespace-nowrap">
          <span className="text-[20vw] font-black italic uppercase leading-none">SIGNAL LOST SIGNAL LOST SIGNAL LOST</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Technical Icon */}
          <div className="mb-12 flex justify-center">
            <div className={`relative p-8 rounded-full border ${isDark ? 'border-white/10 bg-white/5' : 'border-slate-100 bg-slate-50'}`}>
              <motion.div
                animate={{ rotate: [0, 90, 180, 270, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                 <div className={`w-[120%] h-[1px] ${isDark ? 'bg-[#ff6b00]/20' : 'bg-[#003366]/20'}`} />
                 <div className={`h-[120%] w-[1px] ${isDark ? 'bg-[#ff6b00]/20' : 'bg-[#003366]/20'}`} />
              </motion.div>
              <Map size={48} className={isDark ? 'text-[#ff6b00]' : 'text-[#003366]'} />
            </div>
          </div>

          <h1 className={`mb-4 leading-none tracking-tighter ${
            isDark 
              ? 'text-[clamp(4rem,12vw,8rem)] font-black uppercase italic' 
              : 'text-[clamp(3rem,10vw,7rem)] font-serif font-bold text-[#003366]'
          }`}>
            404
          </h1>
          
          <div className="flex items-center justify-center gap-4 mb-8 opacity-60">
            <Crosshair size={14} />
            <span className="text-[10px] font-mono font-bold tracking-[0.4em] uppercase">{t('statusOutOfBounds')}</span>
          </div>

          <p className={`mb-12 text-lg md:text-xl font-light leading-relaxed max-w-md mx-auto ${isDark ? 'text-white/60' : 'text-slate-500'}`}>
            {t('notFoundDesc')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              to="/" 
              className={`group relative px-10 py-5 flex items-center justify-center gap-4 transition-all active:scale-95 ${
                isDark ? 'bg-white text-black hover:bg-[#ff6b00]' : 'bg-[#003366] text-white hover:bg-slate-800'
              }`}
            >
              <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
              <span className="text-xs font-black uppercase tracking-[0.3em]">{t('returnToBase')}</span>
            </Link>
          </div>

          {/* Technical Footer Details */}
          <div className="mt-20 flex items-center justify-center gap-8 opacity-20">
            <div className="flex flex-col items-center">
              <span className="text-[8px] font-mono font-bold tracking-widest uppercase">LAT</span>
              <span className="text-[10px] font-mono font-bold">-33.3742</span>
            </div>
            <div className="w-[1px] h-4 bg-current" />
            <div className="flex flex-col items-center">
              <span className="text-[8px] font-mono font-bold tracking-widest uppercase">LON</span>
              <span className="text-[10px] font-mono font-bold">-70.5786</span>
            </div>
            <div className="w-[1px] h-4 bg-current" />
            <div className="flex flex-col items-center">
              <span className="text-[8px] font-mono font-bold tracking-widest uppercase">ALT</span>
              <span className="text-[10px] font-mono font-bold">ERR_0</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
