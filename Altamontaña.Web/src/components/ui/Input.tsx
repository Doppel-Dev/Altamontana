/**
 * Input Component - Campo de entrada reutilizable con label, error y iconos
 * Soporta diferentes tipos y estados (focus, error, disabled)
 */

import React, { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useThemeColors } from '../../hooks/useThemeColors';

type InputSize = 'sm' | 'md' | 'lg';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  inputSize?: InputSize;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      inputSize = 'md',
      fullWidth = true,
      type = 'text',
      disabled = false,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const { isDark, getBorderClass, getTextClass } = useThemeColors();
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    // Generar ID único si no se proporciona
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    // Determinar el tipo real del input (para toggle de password)
    const inputType = type === 'password' && showPassword ? 'text' : type;

    // Tamaños
    const sizeClasses = {
      sm: 'h-8 text-sm px-3',
      md: 'h-10 text-base px-4',
      lg: 'h-12 text-lg px-5',
    };

    // Clases base
    const baseClasses = `
      rounded-lg border
      transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-1
      disabled:cursor-not-allowed disabled:opacity-50
      ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}
    `;

    // Clases de borde y focus
    const borderClasses = error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
      : isFocused
      ? isDark
        ? 'border-brand-orange focus:border-brand-orange focus:ring-brand-orange'
        : 'border-brand-blue focus:border-brand-blue focus:ring-brand-blue'
      : `${getBorderClass()} ${isDark ? 'focus:border-brand-orange focus:ring-brand-orange' : 'focus:border-brand-blue focus:ring-brand-blue'}`;

    // Ajuste de padding si hay iconos
    const paddingLeft = leftIcon ? 'pl-11' : '';
    const paddingRight = rightIcon || type === 'password' ? 'pr-11' : '';

    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={`block label-base mb-2 ${
              error ? 'text-red-500' : 'text-primary'
            }`}
          >
            {label}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <span className={error ? 'text-red-500' : getTextClass('secondary')}>
                {leftIcon}
              </span>
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            id={inputId}
            type={inputType}
            disabled={disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`
              ${baseClasses}
              ${sizeClasses[inputSize]}
              ${borderClasses}
              ${paddingLeft}
              ${paddingRight}
              ${fullWidth ? 'w-full' : ''}
              ${className}
            `.trim().replace(/\s+/g, ' ')}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            {...props}
          />

          {/* Right Icon o Toggle Password */}
          {type === 'password' ? (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`
                absolute right-3 top-1/2 -translate-y-1/2
                p-1 rounded
                transition-colors
                ${isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}
                focus:outline-none focus-visible:ring-2
                ${isDark ? 'focus-visible:ring-brand-orange' : 'focus-visible:ring-brand-blue'}
              `}
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          ) : rightIcon ? (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <span className={error ? 'text-red-500' : getTextClass('secondary')}>
                {rightIcon}
              </span>
            </div>
          ) : null}
        </div>

        {/* Error Message */}
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-500" role="alert">
            {error}
          </p>
        )}

        {/* Helper Text */}
        {!error && helperText && (
          <p id={`${inputId}-helper`} className="mt-1.5 text-sm text-tertiary">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
