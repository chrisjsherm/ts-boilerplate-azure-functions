module.exports = {
  root: true,
  // Specifies the ESLint parser.
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    // JSDoc specific linting rules for ESLint.
    'plugin:jsdoc/recommended',

    // Use ESLint's inbuilt "recommended" config - it turns on a small,
    // sensible set of rules which lint for well-known best-practices.
    'eslint:recommended',

    // Disable a few of the eslint:recommended rules the TypeScript compiler
    // already checks for.
    'plugin:@typescript-eslint/eslint-recommended',

    // Use the typescript-eslint NPM project's recommended rule set.
    'plugin:@typescript-eslint/recommended',

    // Uses eslint-config-prettier to disable ESLint rules from
    // @typescript-eslint/eslint-plugin that would conflict with prettier.
    'prettier/@typescript-eslint',

    // Enables eslint-plugin-prettier and eslint-config-prettier. This will
    // display prettier errors as ESLint errors. Make sure this is always the
    // LAST configuration in the extends array.
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    // Allows for the parsing of modern ECMAScript features.
    ecmaVersion: 2018,

    // Allows for the use of imports.
    sourceType: 'module',
  },
  // Place to specify ESLint rules. Used to overwrite rules specified from the extended configs.
  rules: {
    // Disable JSDoc types because it's redundant for TypeScript code.
    'jsdoc/require-param-type': 0,
    'jsdoc/require-returns-type': 0,
  },
};
