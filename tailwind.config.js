/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors - Studio Flora Green
        'sf-green': {
          'primary': '#4a5d3a',
          'light': '#6b7c5a',
          'dark': '#3a4d2a',
          '50': '#f7f9f5',
          '100': '#e8f0e3',
          '200': '#d1e0c8',
          '300': '#a8c295',
        },
        
        // Neutral Colors - Whites & Creams
        'sf-white': '#ffffff',
        'sf-cream': '#faf9f7',
        'sf-beige': '#f5f3f0',
        
        // Grays
        'sf-gray': {
          '50': '#f9fafb',
          '100': '#f3f4f6',
          '200': '#e5e7eb',
          '300': '#d1d5db',
          '400': '#9ca3af',
          '500': '#6b7280',
          '600': '#4b5563',
          '700': '#374151',
          '800': '#1f2937',
          '900': '#111827',
        },
        
        // Earth Tones
        'sf-brown': {
          'light': '#d4b896',
          'medium': '#b8956f',
          'dark': '#8b6f4a',
        },
        
        // Status Colors
        'sf-success': '#059669',
        'sf-warning': '#d97706',
        'sf-error': '#dc2626',
        'sf-info': '#0284c7',
      },
      
      fontFamily: {
        'primary': ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        'secondary': ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        'accent': ['var(--font-dancing)', 'Dancing Script', 'cursive'],
      },
      
      fontSize: {
        // Headings
        '6xl': ['3.75rem', { lineHeight: '1.1' }],      // 60px - Hero titles
        '5xl': ['3rem', { lineHeight: '1.1' }],         // 48px - Main page titles
        '4xl': ['2.25rem', { lineHeight: '1.2' }],      // 36px - Section headers
        '3xl': ['1.875rem', { lineHeight: '1.2' }],     // 30px - Subsection headers
        '2xl': ['1.5rem', { lineHeight: '1.3' }],       // 24px - Card titles
        'xl': ['1.25rem', { lineHeight: '1.4' }],       // 20px - Large text
        
        // Body Text
        'lg': ['1.125rem', { lineHeight: '1.6' }],      // 18px - Large body text
        'base': ['1rem', { lineHeight: '1.6' }],        // 16px - Standard body text
        'sm': ['0.875rem', { lineHeight: '1.5' }],      // 14px - Small text
        'xs': ['0.75rem', { lineHeight: '1.4' }],       // 12px - Captions, labels
      },
      
      fontWeight: {
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      },
      
      spacing: {
        // Studio Flora spacing scale (based on 0.25rem = 4px)
        '0': '0',
        '1': '0.25rem',    // 4px
        '2': '0.5rem',     // 8px
        '3': '0.75rem',    // 12px
        '4': '1rem',       // 16px
        '5': '1.25rem',    // 20px
        '6': '1.5rem',     // 24px
        '8': '2rem',       // 32px
        '10': '2.5rem',    // 40px
        '12': '3rem',      // 48px
        '16': '4rem',      // 64px
        '20': '5rem',      // 80px
        '24': '6rem',      // 96px
      },
      
      borderRadius: {
        'sm': '0.25rem',   // 4px
        'md': '0.5rem',    // 8px
        'lg': '0.75rem',   // 12px
        'xl': '1rem',      // 16px
        '2xl': '1.5rem',   // 24px
      },
      
      boxShadow: {
        'sf-sm': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'sf-md': '0 4px 16px rgba(0, 0, 0, 0.1)',
        'sf-lg': '0 4px 12px rgba(74, 93, 58, 0.15)',
        'sf-focus': '0 0 0 3px rgba(74, 93, 58, 0.1)',
      },
      
      transitionDuration: {
        'sf': '0.2s',
        'sf-slow': '0.3s',
      },
      
      transitionTimingFunction: {
        'sf': 'ease',
      },
      
      animation: {
        'sf-spin': 'spin 1s linear infinite',
        'sf-loading': 'loading 1.5s infinite',
      },
      
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        loading: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      
      backgroundImage: {
        'sf-gradient': 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
        'sf-skeleton': 'linear-gradient(90deg, #f3f4f6 25%, #f9fafb 50%, #f3f4f6 75%)',
      },
      
      backgroundSize: {
        'sf-skeleton': '200% 100%',
      },
    },
  },
}