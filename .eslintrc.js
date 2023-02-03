module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jquery: true,
  },
  extends: [
    'jquery',
    'airbnb-base',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'linebreak-style': 0,
    'lines-between-class-members': 'off',
    'no-plusplus': 0,
    'no-console': 'off',
    'no-unused-expressions': 0,
  },
};
