/**
 * SectionHeader Component - Encabezado de sección reutilizable
 * Usado en todas las páginas para mantener consistencia
 */

import React from 'react';
import { useThemeColors } from '../../hooks/useThemeColors';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  centered?: boolean;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  icon,
  centered = false,
  className = '',
}) => {
  const { isDark } = useThemeColors();

  const alignmentClass = centered ? 'text-center items-center' : 'text-left items-start';

  return (
    <div className={`flex flex-col gap-3 ${alignmentClass} ${className}`}>
      {/* Icon */}
      {icon && (
        <div
          className={`inline-flex ${centered ? 'mx-auto' : ''}`}
          aria-hidden="true"
        >
          {icon}
        </div>
      )}

      {/* Title */}
      <h2
        className={isDark ? 'heading-h2-dark' : 'heading-h2-light'}
      >
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p
          className={`
            body-large text-secondary max-w-2xl
            ${centered ? 'mx-auto' : ''}
          `}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
