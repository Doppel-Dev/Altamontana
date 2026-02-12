import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Clock, ArrowRight, Crosshair } from 'lucide-react';
import { Experience } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ExperienceCardProps {
  exp: Experience;
  isDark: boolean;
  className?: string;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ exp, isDark, className = '' }) => {
  const { t } = useLanguage();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className={`${className} group relative`}
    >
      {/* Technical Border Effect (Dark Mode only) */}
      {isDark && (
        <div className="absolute -inset-[1px] bg-gradient-to-br from-white/10 via-transparent to-[#ff6b00]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[1px]" />
      )}

      <div className={`relative h-full flex flex-col transition-all duration-700 overflow-hidden ${
        isDark 
          ? 'bg-[#050505] border border-white/5' 
          : 'bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-slate-100'
      }`}>
        {/* Image Container - Switched to Aspect Video for compactness */}
        <div className="relative aspect-video overflow-hidden">
          {/* Grain Texture Overlay */}
          <div className="absolute inset-0 z-10 opacity-[0.15] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
          
          <img 
            src={exp.imageUrl} 
            alt={exp.title} 
            className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110" 
          />

          {/* Technical Badge (Top Left) */}
          <div className="absolute top-3 left-3 z-20">
            <div className={`px-2.5 py-1.5 text-[9px] font-mono tracking-widest uppercase flex items-center gap-2 backdrop-blur-md transition-colors duration-500 ${
              isDark 
                ? 'bg-black/60 text-white/70 group-hover:text-[#ff6b00] border border-white/10' 
                : 'bg-white/90 text-[#003366]/70 group-hover:text-[#003366] border border-black/5 shadow-sm'
            }`}>
              <Crosshair size={10} className="animate-pulse" />
              {t('mission')}: {String(exp.id).padStart(3, '0')}
            </div>
          </div>

          {/* Price Badge (Top Right) - Improved Contrast with Glassmorphism */}
          <div className="absolute top-3 right-3 z-20">
            <div className={`px-3 py-1.5 backdrop-blur-md border flex flex-col items-end transition-all duration-500 ${
              isDark 
                ? 'bg-black/40 border-white/10' 
                : 'bg-white/80 border-black/5 shadow-sm'
            }`}>
              <span className={`text-[9px] font-bold tracking-[0.2em] opacity-80 ${isDark ? 'text-white/60' : 'text-[#003366]/60'}`}>
                {t('price')}
              </span>
              <div className={`text-xl font-black italic tracking-tighter ${isDark ? 'text-[#ff6b00]' : 'text-[#003366]'}`}>
                ${exp.price} <span className="text-[10px] not-italic opacity-60">USD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Container - More compact padding */}
        <div className="p-6 md:p-8 flex-grow flex flex-col relative">
          <div className="flex gap-4 label-base text-muted font-mono mb-4">
            <span className="flex items-center gap-1.5 text-[11px] font-bold">
              <MapPin size={12} className={isDark ? 'text-[#ff6b00]' : 'text-[#003366]'} /> 
              {t(exp.location).split(',')[0]}
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-bold">
              <Clock size={12} className={isDark ? 'text-[#ff6b00]' : 'text-[#003366]'} /> 
              {t(exp.duration)}
            </span>
          </div>
          
          {/* Fixed height for title to ensure alignment */}
          <div className="min-h-[3.5rem] flex items-start mb-8">
            <h3 className={`leading-tight ${
              isDark 
                ? 'text-white font-bold italic uppercase text-xl tracking-tighter' 
                : 'text-[#003366] font-serif text-2xl font-bold tracking-tight'
            }`}>
              {t(exp.title)}
            </h3>
          </div>

          {/* Card Footer - Refined Button Design */}
          <div className="mt-auto pt-6 border-t border-current border-opacity-10">
            <Link 
              to={`/experience/${exp.id}`}
              className={`group/btn relative w-full py-4 px-6 flex items-center justify-between overflow-hidden transition-all duration-500 ${
                isDark 
                  ? 'bg-white text-black hover:bg-[#ff6b00]' 
                  : 'bg-[#003366] text-white hover:bg-[#004488]'
              }`}
            >
              <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.2em]">
                {t('viewDetails')}
              </span>
              
              <div className="relative z-10 flex items-center gap-2">
                <div className={`w-8 h-[1px] transition-all duration-500 group-hover/btn:w-12 ${
                  isDark ? 'bg-black' : 'bg-white'
                }`} />
                <ArrowRight size={16} />
              </div>

              {/* Subtle Overlay for depth */}
              <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-10 transition-opacity bg-white pointer-events-none" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

