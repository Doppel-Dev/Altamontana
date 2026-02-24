/**
 * NavbarLogo - Logo animado con montaña y helicóptero
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mountain, Helicopter } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface NavbarLogoProps {
  isDark: boolean;
  shouldShowBg: boolean;
}

export const NavbarLogo: React.FC<NavbarLogoProps> = ({ isDark, shouldShowBg }) => {
  const { t } = useLanguage();

  return (
    <Link to="/" className="flex items-center gap-3 group">
      <motion.div className="relative flex items-center justify-center">
        <motion.div
          animate={{ rotate: isDark ? 45 : 0 }}
          className={`p-2 transition-colors ${
            isDark ? 'bg-brand-orange text-black' : 'bg-brand-blue text-white'
          }`}
        >
          <Mountain size={24} />
        </motion.div>
        <motion.div
          animate={{
            y: [0, -2, 0],
            x: [0, 2, 0],
          }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className={`absolute -top-1 -right-1 p-1 rounded-full border-2 ${
            isDark
              ? 'bg-black text-brand-orange border-brand-orange'
              : 'bg-white text-brand-blue border-brand-blue'
          }`}
        >
          <Helicopter size={12} />
        </motion.div>
      </motion.div>
      <span
        className={`text-responsive-lg whitespace-nowrap ${
          shouldShowBg ? (isDark ? 'text-white' : 'text-brand-blue') : 'text-white'
        } ${isDark ? 'font-sans font-black tracking-tighter uppercase italic' : 'font-serif font-bold tracking-tight'}`}
      >
        {t('companyName')}
      </span>
    </Link>
  );
};

export default NavbarLogo;
