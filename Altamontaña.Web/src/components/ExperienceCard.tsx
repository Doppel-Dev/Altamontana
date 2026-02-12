import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Crosshair, Shield } from 'lucide-react';
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`${className} group relative`}
    >
      {/* Background Texture Overlay (Subtle) */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className={`relative h-full flex flex-col transition-all duration-700 overflow-hidden ${
        isDark 
          ? 'bg-[#0a0a0a] border border-white/5' 
          : 'bg-white shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100'
      }`}>
        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {/* Overlay for depth */}
          <div className={`absolute inset-0 z-10 transition-opacity duration-700 ${
            isDark ? 'bg-black/20 group-hover:opacity-0' : 'bg-transparent'
          }`} />
          
          <img 
            src={exp.imageUrl} 
            alt={exp.title} 
            className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 ${
              isDark ? 'grayscale group-hover:grayscale-0' : ''
            }`} 
          />

          {/* Location Badge (Floating) */}
          <div className="absolute bottom-4 left-4 z-20">
            <div className={`px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] backdrop-blur-md border ${
              isDark 
                ? 'bg-black/60 text-white border-white/10' 
                : 'bg-white/90 text-[#003366] border-black/5'
            }`}>
              {t(exp.location).split(',')[0]}
            </div>
          </div>

          {/* Price Tag - Technical Style */}
          <div className="absolute top-0 right-0 z-20">
            <div className={`p-6 backdrop-blur-xl border-l border-b flex flex-col items-end transition-all duration-500 ${
              isDark 
                ? 'bg-[#ff6b00] border-white/10 text-black' 
                : 'bg-[#003366] border-black/5 text-white shadow-lg'
            }`}>
              <span className="text-[8px] font-black tracking-[0.3em] uppercase opacity-70 mb-1">
                {t('from')}
              </span>
              <div className="text-2xl font-black italic tracking-tighter">
                ${exp.price}
              </div>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-8 flex-grow flex flex-col relative">
          {/* Technical Info Row */}
          <div className="flex items-center gap-6 mb-6 opacity-40">
            <div className="flex items-center gap-2">
              <Crosshair size={12} />
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase">ID: {String(exp.id).padStart(3, '0')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={12} />
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase">{exp.duration}</span>
            </div>
          </div>
          
          {/* Title - Different styles for themes */}
          <h3 className={`mb-8 leading-[1.1] ${
            isDark 
              ? 'text-white font-black italic uppercase text-2xl tracking-tighter' 
              : 'text-[#003366] font-serif text-3xl font-bold tracking-tight'
          }`}>
            {t(exp.title)}
          </h3>

          <p className={`mb-10 text-sm leading-relaxed line-clamp-2 ${
            isDark ? 'text-white/50' : 'text-slate-500'
          }`}>
            {t(exp.description)}
          </p>

          {/* Action Row */}
          <div className="mt-auto pt-8 border-t border-current border-opacity-5 flex items-center justify-between">
            <Link 
              to={`/experience/${exp.id}`}
              className={`group/btn relative flex items-center gap-4 transition-all duration-500 ${
                isDark ? 'text-[#ff6b00]' : 'text-[#003366]'
              }`}
            >
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                {t('exploreMission')}
              </span>
              <div className={`w-8 h-[1px] bg-current transition-all duration-500 group-hover/btn:w-16`} />
              <ArrowRight size={16} className="-ml-2 transition-transform duration-500 group-hover/btn:translate-x-2" />
            </Link>

            <div className="flex items-center gap-2 opacity-20">
              <Shield size={14} />
              <span className="text-[8px] font-black uppercase tracking-widest">SECURE</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};


