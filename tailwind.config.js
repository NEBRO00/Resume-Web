/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0C0C0C',
        panel: '#141414',
        paper: '#EDE7DD',
        fog: '#D7E2EA',
        steel: '#646973',
        mist: '#BBCCD7',
        glow: {
          violet: '#8B7CF6',
          blue: '#5B8DEF',
          rose: '#F2748C',
          amber: '#F2A25C',
        },
      },
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'],
      },
      borderRadius: {
        xl2: '40px',
        xl3: '60px',
      },
      keyframes: {
        marqueeLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeRight: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,-18px,0)' },
        },
        driftSlow: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(0,-28px,0) scale(1.04)' },
        },
        runLegFront: {
          '0%, 100%': { transform: 'rotate(-32deg)' },
          '50%': { transform: 'rotate(34deg)' },
        },
        runLegBack: {
          '0%, 100%': { transform: 'rotate(34deg)' },
          '50%': { transform: 'rotate(-32deg)' },
        },
        bodyBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-7px)' },
        },
        paperFlap: {
          '0%, 100%': { transform: 'rotate(-10deg)' },
          '50%': { transform: 'rotate(12deg)' },
        },
        tailWag: {
          '0%, 100%': { transform: 'rotate(-10deg)' },
          '50%': { transform: 'rotate(10deg)' },
        },
        swoosh: {
          '0%': { transform: 'translateX(6px)', opacity: '0' },
          '30%': { opacity: '0.6' },
          '100%': { transform: 'translateX(-26px)', opacity: '0' },
        },
        loaderBar: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
      animation: {
        'marquee-left': 'marqueeLeft 38s linear infinite',
        'marquee-right': 'marqueeRight 42s linear infinite',
        drift: 'drift 7s ease-in-out infinite',
        'drift-slow': 'driftSlow 11s ease-in-out infinite',
        'run-leg-front': 'runLegFront 0.42s ease-in-out infinite',
        'run-leg-back': 'runLegBack 0.42s ease-in-out infinite',
        'body-bounce': 'bodyBounce 0.42s ease-in-out infinite',
        'paper-flap': 'paperFlap 0.3s ease-in-out infinite',
        'tail-wag': 'tailWag 0.5s ease-in-out infinite',
        swoosh: 'swoosh 0.7s ease-out infinite',
        'loader-bar': 'loaderBar 4.8s linear forwards',
      },
    },
  },
  plugins: [],
}
