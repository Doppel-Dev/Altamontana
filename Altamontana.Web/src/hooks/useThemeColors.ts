/**
 * Hook useThemeColors - Centraliza la lógica de colores por tema
 * Elimina la repetición del pattern "isDark = theme === 'dark'" en 12+ archivos
 */

import { useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { COLORS } from '../constants/designTokens';

export const useThemeColors = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const colors = useMemo(() => {
    return isDark ? COLORS.dark : COLORS.light;
  }, [isDark]);

  // Utility functions para clases Tailwind comunes
  const getBgClass = (variant: 'primary' | 'surface' | 'elevated' | 'alt' = 'surface') => {
    const bgMap = {
      primary: isDark ? 'bg-gray-800' : 'bg-white',
      surface: isDark ? 'bg-gray-900' : 'bg-white',
      elevated: isDark ? 'bg-gray-800' : 'bg-gray-50',
      alt: isDark ? 'bg-gray-800' : 'bg-gray-100',
    };
    return bgMap[variant];
  };

  const getTextClass = (variant: 'primary' | 'secondary' | 'tertiary' | 'inverse' = 'primary') => {
    const textMap = {
      primary: isDark ? 'text-gray-100' : 'text-gray-900',
      secondary: isDark ? 'text-gray-300' : 'text-gray-600',
      tertiary: isDark ? 'text-gray-400' : 'text-gray-500',
      inverse: isDark ? 'text-gray-900' : 'text-white',
    };
    return textMap[variant];
  };

  const getCardClass = () => {
    return isDark
      ? 'bg-gray-800 border-gray-700'
      : 'bg-white border-gray-200';
  };

  const getBorderClass = (light = false) => {
    if (light) {
      return isDark ? 'border-gray-800' : 'border-gray-100';
    }
    return isDark ? 'border-gray-700' : 'border-gray-200';
  };

  const getHoverClass = () => {
    return isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50';
  };

  // Colores inline para casos donde Tailwind no es suficiente
  const getInlineStyles = () => ({
    background: colors.background,
    backgroundAlt: colors.backgroundAlt,
    surface: colors.surface,
    text: colors.text.primary,
    textSecondary: colors.text.secondary,
    border: colors.border,
    primary: colors.primary,
    accent: colors.accent,
  });

  return {
    isDark,
    theme,
    colors,
    // Utility functions
    getBgClass,
    getTextClass,
    getCardClass,
    getBorderClass,
    getHoverClass,
    getInlineStyles,
  };
};

export default useThemeColors;
