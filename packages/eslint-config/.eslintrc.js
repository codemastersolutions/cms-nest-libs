module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
    jest: true
  },
  extends: [
    'standard',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'prettier/standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 11,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error'
  },
  settings: {
    'import/resolver': {
      typescript: {}
    }
  }
};
