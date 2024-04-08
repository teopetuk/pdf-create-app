require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  env: {
    node: true,
    es6: true,
    'jest/globals': true,
  },

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:jest/all',
  ],

  plugins: ['jest'],

  rules: {
    yoda: 'warn',
    complexity: ['warn', 15],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-this-alias': 'warn',
    '@typescript-eslint/no-shadow': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/no-inferrable-types': ['warn', {ignoreParameters: true}],
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
      },
    ],
    '@typescript-eslint/no-magic-numbers': [
      'warn',
      {
        ignoreEnums: true,
        ignoreArrayIndexes: true,
        ignore: [-1, 0, 1, 2, 10, 100, 1000, 60, 3600],
      },
    ],
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        varsIgnorePattern: 'unused|Promise',
        argsIgnorePattern: '^_|^unused',
      },
    ],

    'jest/no-hooks': [
      'error',
      {
        allow: ['beforeEach', 'afterEach', 'beforeAll'],
      },
    ],
    'jest/prefer-expect-assertions': 'off',
    'jest/prefer-called-with': 'off',
    'jest/lowercase-name': 'off',
    'jest/prefer-lowercase-title': 'off',
    'jest/no-alias-methods': 'off',
    'jest/expect-expect': 'off',
    'jest/prefer-strict-equal': 'off',
    'jest/no-standalone-expect': 'off',
    'jest/prefer-spy-on': 'off',
    'jest/require-hook': 'off',

    'no-console': 'error',
    'no-var': 'error',
    'no-self-compare': 'error',
    'no-useless-concat': 'error',
    'no-useless-return': 'error',
    'no-template-curly-in-string': 'error',
    'no-unused-vars': 'off',
    'no-await-in-loop': 'warn',
    'no-param-reassign': 'warn',
    'prefer-const': ['error', {destructuring: 'all'}],
    'keyword-spacing': 'warn',
    curly: ['error', 'multi-line'],

    'prettier/prettier': 'warn',
  },
  overrides: [
    {
      files: [
        '*.spec.ts',
        '*.integration.ts',
        'src/**/__mocks__/**/*.ts',
        'src/**/__tests__/**/*.ts',
        'src/utils/jest/*',
      ],
      rules: {
        'no-global-assign': 'off',
        'no-await-in-loop': 'off',
        complexity: 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-magic-numbers': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
  ],
};

module.exports = baseConfig;
