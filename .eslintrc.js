module.exports = {
  root: true,
  extends: '@react-native',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'prettier/prettier': [
          'error',
          {
            endOfLine: 'auto',
          },
        ],
      },
    },
  ],
};
