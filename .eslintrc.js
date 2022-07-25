module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    semi: ['error', 'always'],
    'no-tabs': 'off',
    quotes: ['error', 'single'],
    'quote-props': 'off',
    'no-undef': 'off',
    'vue/return-in-computed-property': 'off',
    'vue/multi-word-component-names': 'off',
    'nuxt/no-cjs-in-config': 'off',
    'require-await': 'off',
		'no-return-assig': 'off',
		'indent': 'off',
		'no-return-assign': 'off',
		'arrow-parens': 'off',
		'object-shorthand': 'off',
		'no-mixed-spaces-and-tabs': 'off',
		'no-console': 'off',
		'vue/html-indent': 'off',
		'vue/html-self-closing': 'off'
  }
};
