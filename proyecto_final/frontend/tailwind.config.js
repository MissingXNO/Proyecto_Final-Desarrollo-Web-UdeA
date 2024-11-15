module.exports = {
  content: ["./pages/**/*.html", "./assets/js/**/*.js"],
  theme: {
    extend: {
      opacity: {
        '0': '0',
        '100': '1',
      },
      transitionProperty: {
        'opacity': 'opacity',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out',
        fadeOut: 'fadeOut 1s ease-in-out',
      },
    },
  },
  plugins: [],
};
