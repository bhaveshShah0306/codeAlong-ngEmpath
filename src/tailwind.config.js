module.exports = {
  content: ["./src/**/*.{html,ts}"],
  safelist: ["bg-header-gradient"],
  theme: {
    extend: {
      colors: {
        "custom-purple": "#3922C9",
      },
      backgroundImage: {
        "header-gradient": "linear-gradient(to right, #3922C9, #000000)",
      },
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
