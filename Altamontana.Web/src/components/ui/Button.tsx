/**
 * Button Component - Botón reutilizable con variantes y estados
 * Soporta diferentes tamaños, variantes, iconos y estados de carga
 */

import React, { forwardRef } from 'react';
import { useThemeColors } from '../../hooks/useThemeColors';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      className = '',
      type = 'button',
      ...props
    },
    ref
  ) => {
    const { isDark } = useThemeColors();

    // Tamaños
    const sizeClasses = {
      sm: 'h-8 px-3 btn-text-small',
      md: 'h-10 px-4 btn-text-base',
      lg: 'h-12 px-6 btn-text-large',
    };

    // Variantes
    const variantClasses = {
      primary: isDark
        ? 'bg-brand-orange text-black hover:bg-brand-orange-light disabled:bg-gray-700 disabled:text-gray-500'
        : 'bg-brand-blue text-white hover:bg-brand-blue-dark disabled:bg-gray-300 disabled:text-gray-500',
      secondary: isDark
        ? 'bg-gray-700 text-white hover:bg-gray-600 border border-gray-600 disabled:bg-gray-800 disabled:text-gray-600'
        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 disabled:bg-gray-100 disabled:text-gray-400',
      ghost: isDark
        ? 'bg-transparent text-white hover:bg-gray-800 disabled:text-gray-600'
        : 'bg-transparent text-gray-700 hover:bg-gray-100 disabled:text-gray-400',
      danger: isDark
        ? 'bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-700 disabled:text-gray-500'
        : 'bg-red-500 text-white hover:bg-red-600 disabled:bg-gray-300 disabled:text-gray-500',
      success: isDark
        ? 'bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-700 disabled:text-gray-500'
        : 'bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-300 disabled:text-gray-500',
    };

    const baseClasses = `
      inline-flex items-center justify-center gap-2
      rounded-lg
      transition-all duration-200
      focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
      disabled:cursor-not-allowed disabled:opacity-60
      active:scale-95
      ${isDark ? 'focus-visible:ring-brand-orange' : 'focus-visible:ring-brand-blue'}
    `;

    const widthClass = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={`
          ${baseClasses}
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          ${widthClass}
          ${className}
        `.trim().replace(/\s+/g, ' ')}
        aria-busy={loading}
        aria-disabled={disabled}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
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
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}

        {!loading && icon && iconPosition === 'left' && (
          <span className="inline-flex" aria-hidden="true">
            {icon}
          </span>
        )}

        {children}

        {!loading && icon && iconPosition === 'right' && (
          <span className="inline-flex" aria-hidden="true">
            {icon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
