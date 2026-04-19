/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#489EA2',
          50: '#f2fafa',
          100: '#e1f4f5',
          200: '#c4e9eb',
          300: '#9bdae0',
          400: '#6cc4cd',
          500: '#489EA2',
          600: '#36828a',
          700: '#2d686f',
          800: '#28555b',
          900: '#23484d',
          950: '#142f33',
        }
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" }
        }
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.2s ease-out forwards',
        'blob': "blob 7s infinite"
      }
    },
  },
  plugins: [],
};
