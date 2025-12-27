/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
      "*.{js,ts,jsx,tsx,mdx}"
],
  theme: {
    extend: {
      colors: {
        // CookinBiz Brand Colors
        void: '#0a0a0a',
        dark: '#0f0f0f',
        card: '#141414',
        elevated: '#1a1a1a',
        gold: {
          DEFAULT: '#D4AF37',
          deep: '#B8860B',
          bright: '#FFD700',
          light: '#F4E4A6',
        },
        // shadcn compatible
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#D4AF37',
          foreground: '#0a0a0a',
        },
        secondary: {
          DEFAULT: '#1a1a1a',
          foreground: '#ffffff',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: '#1a1a1a',
          foreground: 'rgba(255,255,255,0.5)',
        },
        accent: {
          DEFAULT: '#D4AF37',
          foreground: '#0a0a0a',
        },
        popover: {
          DEFAULT: '#141414',
          foreground: '#ffffff',
        },
        card: {
          DEFAULT: '#141414',
          foreground: '#ffffff',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        lg: '12px',
        md: '8px',
        sm: '4px',
      },
      boxShadow: {
        'glow-gold': '0 0 30px rgba(212,175,55,0.4), 0 0 60px rgba(212,175,55,0.2)',
        'glow-gold-intense': '0 0 20px rgba(212,175,55,0.6), 0 0 40px rgba(212,175,55,0.4), 0 0 80px rgba(212,175,55,0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGold: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.1)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(212,175,55,0.4)' },
          '100%': { boxShadow: '0 0 40px rgba(212,175,55,0.6), 0 0 60px rgba(212,175,55,0.3)' },
        },
      },
    },
  },
  plugins: [],
}
