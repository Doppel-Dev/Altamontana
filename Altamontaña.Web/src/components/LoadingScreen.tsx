import { motion } from 'framer-motion';
import { Helicopter } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const LoadingScreen = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center ${isDark ? 'bg-black' : 'bg-white'}`}>
      <div className="relative w-64 h-32 flex items-center justify-center">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, -2, 2, 0],
            x: [-10, 10, -10]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2, 
            ease: "easeInOut" 
          }}
          className={`${isDark ? 'text-[#ff6b00]' : 'text-[#003366]'}`}
        >
          <Helicopter size={80} strokeWidth={1.5} />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.1, ease: "linear" }}
            className={`absolute -top-1 left-1/2 -translate-x-1/2 w-16 h-[2px] ${isDark ? 'bg-[#ff6b00]' : 'bg-[#003366]'} opacity-40`}
            style={{ originX: "50%", originY: "50%" }}
          />
        </motion.div>
      </div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className={`mt-8 font-bold uppercase tracking-[0.5em] text-xs ${isDark ? 'text-[#ff6b00] italic' : 'text-[#003366]'}`}
      >
        {isDark ? t('loadingDark') : t('loadingLight')}
      </motion.p>
    </div>
  );
};

export default LoadingScreen;