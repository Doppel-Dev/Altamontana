/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      fontSize: {
        // Escala tipográfica base (Tailwind defaults mantenidos)
        // Valores extendidos para display y responsive
        'tiny': ['0.625rem', { lineHeight: '1rem', letterSpacing: '0.025em' }],        // 10px
        'display': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],          // 72px
        'display-sm': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],     // 56px
        'display-md': ['5rem', { lineHeight: '1', letterSpacing: '-0.025em' }],        // 80px
        'display-lg': ['6rem', { lineHeight: '1', letterSpacing: '-0.03em' }],         // 96px
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
        'extra-wide': '0.15em',
        'ultra': '0.2em',
      },
      colors: {
        'brand-blue': {
          DEFAULT: '#003366',
          dark: '#002244',
          light: '#0055aa',
        },
        'brand-orange': {
          DEFAULT: '#ff6b00',
          dark: '#e65100',
          light: '#ff8833',
        },
        text: {
          primary: {
            light: '#1a1a1a',
            dark: '#ffffff',
          },
          secondary: {
            light: '#4a5568',
            dark: '#e2e8f0',
          },
          tertiary: {
            light: '#718096',
            dark: '#cbd5e0',
          },
          muted: {
            light: '#9ca3af',
            dark: '#9ca3af',
          },
          subtle: {
            light: '#d1d5db',
            dark: '#6b7280',
          },
        },
      },
      spacing: {
        'navbar': '80px',
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-fast': 'fadeIn 0.3s ease-in-out',
        'fade-in-slow': 'fadeIn 0.8s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'slide-left': 'slideLeft 0.4s ease-out',
        'slide-right': 'slideRight 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 0.6s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.65, 0, 0.35, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      boxShadow: {
        'navbar': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'elevated': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      maxWidth: {
        'container': '1280px',
      },
      minHeight: {
        'touch': '44px',
      },
      minWidth: {
        'touch': '44px',
      },
    },
  },
  plugins: [],
}
