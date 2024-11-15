/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}",],
  theme: {
    extend: {
      backgroundImage :{
        'login-bg':"url(/src/assets/images/login-bg.png) ",
      },
    
    },
  },
  plugins: [],
}

