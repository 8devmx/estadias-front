/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        'Modal70': '70%', // Define una clase de anchura personalizada
        'Modal50': '50%',
      },
      colors: {
        customBlak: "#000000", // Define una clase de color personalizado
      },  
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
      plugins: [require('daisyui')],
    daisyui: {
      themes: ["light"],
    },
  },
  plugins: [require("@tailwindcss/typography"), require('daisyui')],
};

