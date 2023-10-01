/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    colors: {
      lightmode: {
        "blanco": "#CFF5E7", 
        "verdeagua": "#A0E4CB", 
        "verdeagua2": "#59C1BD", 
        "azul": "#0D4C92", 
        "azul2" : "#5893D4",
        "azul3" : "#005B96",
      },
      darkmode: {
        "azul1": "#071E3D",
        "azul2": "#1F4287",
        "azul3": "#1C3655",
        "verdeagua1": "#278EA5",
        "verdeagua2": "#21E6C1",
        "blanco": "#CAEDFF",
      }
    },
    screens: {
      'mobile': {'min': '100px', 'max': '700px'},
      'desktop': {'min': '701px', 'max': '3000px'}
    }
  },
  plugins: [],
}