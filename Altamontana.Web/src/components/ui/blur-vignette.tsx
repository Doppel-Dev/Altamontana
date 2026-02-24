'use client';
import React, { createContext, useContext } from 'react';
import { cn } from '../../lib/utils';

interface BlurVignetteContextProps {
  radius?: string;
  inset?: string;
  transitionLength?: string;
  blur?: string;
}

const BlurVignetteContext = createContext<BlurVignetteContextProps>({
  radius: '24px',
  inset: '20px',
  transitionLength: '44px',
  blur: '6px',
});

export const useBlurVignetteContext = () => useContext(BlurVignetteContext);

interface BlurVignetteProps {
  className?: string;
  children: React.ReactNode;
  radius?: string;
  inset?: string;
  transitionLength?: string;
  blur?: string;
}

export const BlurVignette: React.FC<BlurVignetteProps> = ({
  className,
  children,
  radius = '24px',
  inset = '20px',
  transitionLength = '44px',
  blur = '6px',
}) => {
  return (
    <BlurVignetteContext.Provider
      value={{ radius, inset, transitionLength, blur }}
    >
      <div
        className={cn('relative overflow-hidden', className)}
        style={{ borderRadius: radius }}
      >
        {children}
      </div>
    </BlurVignetteContext.Provider>
  );
};

interface BlurVignetteArticleProps {
  children?: React.ReactNode;
  className?: string;
}

export const BlurVignetteArticle: React.FC<BlurVignetteArticleProps> = ({
  children,
  className,
}) => {
  const { radius, inset, transitionLength, blur } = useBlurVignetteContext();

  return (
    <div
      className={cn(
        'blur-vignette absolute inset-0 z-1 pointer-events-none',
        className
      )}
      style={
        {
          '--radius': radius,
          '--inset': inset,
          '--transition-length': transitionLength,
          '--blur': blur,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};
