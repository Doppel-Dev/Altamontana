/**
 * Spinner Component - Indicador de carga reutilizable
 * Variantes de tamaño adaptadas al theme
 */

import React from 'react';
import { useThemeColors } from '../../hooks/useThemeColors';

type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface SpinnerProps {
  size?: SpinnerSize;
  className?: string;
  label?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  className = '',
  label = 'Cargando...',
}) => {
  const { isDark } = useThemeColors();

  // Tamaños
  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const strokeWidth = {
    xs: '3',
    sm: '3',
    md: '4',
    lg: '4',
    xl: '4',
  };

  const color = isDark ? '#ff6b00' : '#003366';

  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <svg
        className={`animate-spin ${sizeClasses[size]}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke={color}
          strokeWidth={strokeWidth[size]}
        />
        <path
          className="opacity-75"
          fill={color}
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </div>
  );
};

// Variante de página completa
export const SpinnerFullPage: React.FC<{ label?: string }> = ({ label }) => {
  const { isDark } = useThemeColors();

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        ${isDark ? 'bg-black/80' : 'bg-white/80'}
        backdrop-blur-sm
      `}
      role="status"
      aria-live="polite"
      aria-label={label || 'Cargando...'}
    >
      <div className="flex flex-col items-center gap-4">
        <Spinner size="xl" label={label} />
        {label && (
          <p className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {label}
          </p>
        )}
      </div>
    </div>
  );
};

export default Spinner;
