/* === Change These Values === */

// Try using 8, 9, 10 or 11
const INTERNAL_IMPORT_GROUPS = 9;

const USE_MULTIPLE_NAMESPACE_GROUPS = false;

/* =========================== */

const internalImports = new Array(26).fill(0).map((_, idx) => {
  return String.fromCharCode(97 + idx);
});

const internalImportRegex = `^(${internalImports.join('|')})(\\/|$)`;

const namespaceGroups = (
  USE_MULTIPLE_NAMESPACE_GROUPS ? ['foo', 'bar'] : ['**']
).map(name => ({
  pattern: `@namespace/${name}`,
  group: 'external',
  position: 'after',
}));

module.exports = {
  parser: '@babel/eslint-parser',

  parserOptions: {
    requireConfigFile: false,
  },

  settings: {
    'import/internal-regex': internalImportRegex,
  },

  plugins: ['import'],

  rules: {
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          ['sibling', 'index'],
        ],
        pathGroups: [
          ...namespaceGroups,
          ...internalImports.slice(0, INTERNAL_IMPORT_GROUPS).map(name => ({
            pattern: name,
            group: 'internal',
            position: 'before',
          })),
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        'newlines-between': 'always',
      },
    ],
  },
};
