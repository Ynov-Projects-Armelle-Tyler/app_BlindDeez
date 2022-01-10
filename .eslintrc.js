module.exports = {
  extends: ['@poool/eslint-config-react-native'],
  rules: {
    'react/prop-types': [2, { ignore: ['className', 'children'] }],
    'max-len': [2, { code: 80, tabWidth: 2, ignoreRegExpLiterals: true }],
  },
  overrides: [{
    files: ['tests/**/*.js'],
    env: {
      jest: true,
    },
  }, {
    files: ['src/**/*.js'],
    rules: {
      'no-console': 0,
    },
  }],
};
