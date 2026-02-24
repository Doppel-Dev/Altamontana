/**
 * Card Component - Componente de tarjeta reutilizable con subcomponentes
 * Estructura: <Card><Card.Header /><Card.Body /><Card.Footer /></Card>
 */

import React from 'react';
import { useThemeColors } from '../../hooks/useThemeColors';

type CardVariant = 'default' | 'elevated' | 'outlined' | 'flat';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  hover?: boolean;
  padding?: boolean;
}

interface CardSubComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: boolean;
}

const Card = ({
  children,
  variant = 'default',
  hover = false,
  padding = true,
  className = '',
  ...props
}: CardProps) => {
  const { getCardClass } = useThemeColors();

  const variantClasses = {
    default: `${getCardClass()} border`,
    elevated: `${getCardClass()} shadow-card`,
    outlined: `${getCardClass()} border-2`,
    flat: `${getCardClass()}`,
  };

  const hoverClass = hover ? 'hover:shadow-card-hover transition-shadow duration-300' : '';
  const paddingClass = padding ? 'p-6' : '';

  return (
    <div
      className={`
        rounded-lg overflow-hidden
        ${variantClasses[variant]}
        ${hoverClass}
        ${paddingClass}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      {...props}
    >
      {children}
    </div>
  );
};

// Subcomponente Header
const CardHeader = ({ children, padding = true, className = '', ...props }: CardSubComponentProps) => {
  const { getBorderClass } = useThemeColors();
  const paddingClass = padding ? 'p-6 pb-4' : '';

  return (
    <div
      className={`
        border-b ${getBorderClass()}
        ${paddingClass}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      {...props}
    >
      {children}
    </div>
  );
};

// Subcomponente Body
const CardBody = ({ children, padding = true, className = '', ...props }: CardSubComponentProps) => {
  const paddingClass = padding ? 'p-6' : '';

  return (
    <div
      className={`
        ${paddingClass}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      {...props}
    >
      {children}
    </div>
  );
};

// Subcomponente Footer
const CardFooter = ({ children, padding = true, className = '', ...props }: CardSubComponentProps) => {
  const { getBorderClass } = useThemeColors();
  const paddingClass = padding ? 'p-6 pt-4' : '';

  return (
    <div
      className={`
        border-t ${getBorderClass()}
        ${paddingClass}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      {...props}
    >
      {children}
    </div>
  );
};

// Asignar subcomponentes al componente principal
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export { Card };
export default Card;
