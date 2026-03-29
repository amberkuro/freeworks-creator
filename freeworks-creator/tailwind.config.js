/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#F8F6F1",
          warm: "#F5F0EB",
          black: "#0A0A0A",
          text: "#1A1A1A",
          muted: "#5C5C5C",
          dim: "#9E9E9E",
          yellow: "#F2C80F",
          "yellow-hover": "#E0B800",
          "yellow-soft": "rgba(242,200,15,0.10)",
          "yellow-glow": "rgba(242,200,15,0.25)",
          gold: "#C4A24E",
          silver: "#8E9AAA",
          bronze: "#B08456",
          border: "rgba(0,0,0,0.06)",
          "border-hover": "rgba(0,0,0,0.12)",
        },
      },
      fontFamily: {
        syne: ["Syne", "sans-serif"],
        pretendard: ["Pretendard", "sans-serif"],
        num: ["Manrope", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-16px)" },
        },
        cf1: {
          "0%, 100%": { transform: "translateY(0) rotate(-0.4deg)" },
          "50%": { transform: "translateY(-12px) rotate(0.4deg)" },
        },
        cf2: {
          "0%, 100%": { transform: "translateY(0) rotate(0.3deg)" },
          "50%": { transform: "translateY(-9px) rotate(-0.3deg)" },
        },
        cf3: {
          "0%, 100%": { transform: "translateY(0) rotate(-0.2deg)" },
          "50%": { transform: "translateY(-14px) rotate(0.3deg)" },
        },
        cf4: {
          "0%, 100%": { transform: "translateY(0) rotate(0.2deg)" },
          "50%": { transform: "translateY(-7px) rotate(-0.4deg)" },
        },
        cf5: {
          "0%, 100%": { transform: "translateY(0) rotate(-0.3deg)" },
          "50%": { transform: "translateY(-10px) rotate(0.2deg)" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        cf1: "cf1 7s ease-in-out infinite",
        cf2: "cf2 9s ease-in-out infinite",
        cf3: "cf3 8s ease-in-out infinite",
        cf4: "cf4 10s ease-in-out infinite",
        cf5: "cf5 11s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
