// export default {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//     'postcss-import': {},
//     'tailwindcss/nesting': {},
//   },
// };

/* eslint-env node */

module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': 'postcss-nesting',
    tailwindcss: {},
    autoprefixer: {},
  },
};
