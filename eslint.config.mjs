import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import vuePlugin from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';

const importOrder = {
  'import/order': [
    'error',
    {
      groups: ['builtin', 'external', 'internal', 'sibling', 'parent', 'index', 'type', 'object', 'unknown'],
      pathGroups: [
        {
          pattern: 'vue*',
          group: 'builtin',
          position: 'before',
        },
        {
          pattern: '@/**',
          group: 'external',
          position: 'after',
        },
      ],
      pathGroupsExcludedImportTypes: [
        'builtin',
        'external',
        'internal',
        'sibling',
        'parent',
        'index',
        'type',
        'object',
        'unknown',
      ],
      'newlines-between': 'always',
      alphabetize: {
        order: 'asc',
        caseInsensitive: false,
      },
      warnOnUnassignedImports: false,
    },
  ],
};

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    ignores: ['**/*.d.ts'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        uni: 'readonly',
        wx: 'readonly',
        getCurrentPages: 'readonly',
        getApp: 'readonly',
        console: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      import: importPlugin,
    },
    rules: {
      'no-unused-vars': ['warn', { varsIgnorePattern: '^(READ|PATH|PARSE)$' }],
      'no-console': 'off',
      'no-debugger': 'warn',
      'prefer-const': 'warn',
      'no-var': 'error',
      // TypeScript 相关规则
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          // 忽略接口和类型定义中的未使用参数
          ignoreRestSiblings: true,
        },
      ],
      // 禁用传统的 no-unused-vars 规则，使用 TypeScript 版本
      'no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      ...importOrder,
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: typescriptParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        uni: 'readonly',
        wx: 'readonly',
        getCurrentPages: 'readonly',
        getApp: 'readonly',
        console: 'readonly',
      },
    },
    plugins: {
      vue: vuePlugin,
      '@typescript-eslint': typescriptEslint,
      import: importPlugin,
    },
    rules: {
      'no-unused-vars': 'off',
      'no-console': 'off',
      'no-debugger': 'warn',
      'prefer-const': 'warn',
      'no-var': 'error',
      // TypeScript 相关规则
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          // 忽略接口和类型定义中的未使用参数
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      // Vue 特定规则
      'vue/multi-word-component-names': 'off',
      'vue/no-unused-vars': 'warn',
      'vue/component-definition-name-casing': ['error', 'PascalCase'],
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/prefer-import-from-vue': 'error',
      'vue/no-v-html': 'warn',
      // Vue 属性排序规则
      'vue/attributes-order': [
        'error',
        {
          order: [
            'LIST_RENDERING',
            'CONDITIONALS',
            'RENDER_MODIFIERS',
            'TWO_WAY_BINDING',
            'CONTENT',
            'OTHER_DIRECTIVES',
            'ATTR_STATIC',
            'ATTR_SHORTHAND_BOOL',
            'ATTR_DYNAMIC',
            'EVENTS',
          ],
          alphabetical: false,
        },
      ],
      // Vue 文件块顺序建议（注释形式，因为规则可能不存在）
      // script-template-style 顺序已在项目中手动维护
      // HTML 属性换行
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: {
            max: 3,
          },
          multiline: {
            max: 1,
          },
        },
      ],
      // 模板内部缩进
      'vue/html-indent': [
        'error',
        2,
        {
          attribute: 1,
          baseIndent: 1,
          closeBracket: 0,
          alignAttributesVertically: true,
          ignores: [],
        },
      ],
      // 结束标签换行
      'vue/html-closing-bracket-newline': [
        'error',
        {
          singleline: 'never',
          multiline: 'always',
        },
      ],
      ...importOrder,
    },
  },
  // Prettier 集成 - 确保在最后应用
  prettierConfig,
];
