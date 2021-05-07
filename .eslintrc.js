module.exports = {
  env: {
    browser: true,
    es6: true
  },
  plugins: [
    'lodash'
  ],
  extends: [
    'airbnb',
    'airbnb/hooks'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  overrides: [
    {
      files: [ '**/*.ts?(x)' ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        },
        warnOnUnsupportedTypeScriptVersion: true
      },
      plugins: [ '@typescript-eslint' ],
      // If adding a typescript-eslint version of an existing ESLint rule,
      // make sure to disable the ESLint rule here.
      rules: {
        'default-case': 'off',
        'no-dupe-class-members': 'off',
        'no-undef': 'off',

        // Add TypeScript specific rules (and turn off ESLint equivalents)
        '@typescript-eslint/consistent-type-assertions': 'warn',
        'no-array-constructor': 'off',
        '@typescript-eslint/member-delimiter-style': [
          'error',
          {
            multiline: {
              delimiter: 'comma',
              requireLast: false
            },
            singleline: {
              delimiter: 'comma',
              requireLast: false
            }
          }
        ],
        '@typescript-eslint/no-array-constructor': 'warn',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': [
          'warn',
          {
            functions: false,
            classes: false,
            variables: false,
            typedefs: false
          }
        ],
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': [
          'error',
          {
            allowShortCircuit: true,
            allowTernary: true,
            allowTaggedTemplates: true
          }
        ],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            ignoreRestSiblings: true
          }
        ],
        'no-useless-constructor': 'off',
        '@typescript-eslint/no-useless-constructor': 'warn'
      }
    }
  ],
  rules: {
    'array-bracket-spacing': [ 'error', 'always' ],
    'comma-dangle': [ 'error', 'never' ],
    'import/exports-last': 'error',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ],
    'react/require-default-props': [ 2, { ignoreFunctionalComponents: true } ],
    'import/first': 'error',
    'import/order': [ 'error', {
      groups: [
        [ 'external', 'builtin' ],
        [ 'index', 'internal', 'sibling', 'parent' ]
      ],
      'newlines-between': 'always-and-inside-groups'
    } ],
    'import/no-extraneous-dependencies': [ 'error', {
      devDependencies: [ '.storybook/**', '**/*.stories.tsx', 'scripts/*.js', 'src/setupTests.ts' ]
    } ],
    'import/prefer-default-export': [ 'off' ],
    'lodash/import-scope': [ 'error' ],
    'no-class-assign': [ 'off' ],
    'no-func-assign': [ 'off' ],
    'no-multiple-empty-lines': [ 'error', { max: 1, maxBOF: 0, maxEOF: 0 } ],
    'no-param-reassign': [ 'error', { props: false } ],
    'no-plusplus': [ 'error', { allowForLoopAfterthoughts: true } ],
    'no-unused-vars': [ 'error', { ignoreRestSiblings: true, argsIgnorePattern: '^_' } ],
    'object-curly-newline': [ 'error', { consistent: true } ],
    'react/forbid-prop-types': [ 'off' ],
    'react/jsx-filename-extension': [ 'error', { extensions: [ '.tsx' ] } ],
    'react/jsx-one-expression-per-line': [ 'off' ],
    'react/jsx-props-no-spreading': [ 'off' ],
    'react/no-unused-prop-types': [ 'off' ],
    'react/prop-types': [ 'off' ],
    semi: [ 'error', 'never' ],
    'spaced-comment': [ 'error', 'always', { markers: [ '/' ] } ]
  },
  settings: {
    'import/resolver': {
      node: {
        paths: [ 'src' ]
      },
      typescript: {}
    }
  }
}
