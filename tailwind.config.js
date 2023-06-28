/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      spacing: {
        13: "3.25rem",
      },
      fontFamily: {
        inter: ["Inter"],
        ArchivoBlack: ["Archivo Black"],
        Poppins: ["Poppins"],
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        shake: "shake 1s ease-in-out infinite",
      },
      keyframes: {
        shake: {
          "0%, 100%": {
            transform: "rotate(-10deg)",
          },
          "50%": {
            transform: "rotate(10deg)",
          },
        },
      },
    },
  },
  plugins: [],
};
