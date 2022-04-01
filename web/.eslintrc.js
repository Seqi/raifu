const path = require('path')

const restrictedGlobals = require('confusing-browser-globals')
// Fix eslint shareable config (https://github.com/eslint/eslint/issues/3458)
// TL;DR: Allows plugins to be loaded from current project depdencencies rather than caller's
// Only useful if a package so commented out for now.
// require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:react-hooks/recommended',
		// This is mostly for the configuration of parser
		// We overwrite most of the rules themselves
		'react-app',
		'plugin:import/recommended',
		'plugin:prettier/recommended',
	],
	plugins: ['jsx-a11y'],
	settings: {
		'import/resolver': {
			typescript: {
				project: [path.join(__dirname, 'tsconfig.json')],
			},
		},
	},
	rules: {
		// ESLint
		// http://eslint.org/docs/rules/
		'array-callback-return': 'warn',
		complexity: 'warn',
		'default-case-last': 'error',
		'default-param-last': 'error',
		eqeqeq: ['warn', 'smart'],
		'id-denylist': ['error', 'data', 'cb', 'callback'],
		'new-parens': 'warn',
		'no-await-in-loop': 'warn',
		'no-array-constructor': 'warn',
		'no-caller': 'warn',
		'no-duplicate-imports': 'warn',
		'no-empty-function': 'warn',
		'no-eval': 'warn',
		'no-extend-native': 'warn',
		'no-extra-bind': 'warn',
		'no-floating-decimal': 'error',
		'no-implied-eval': 'warn',
		'no-labels': 'error',
		'no-lone-blocks': 'error',
		'no-lonely-if': 'error',
		'no-new-func': 'error',
		'no-new-object': 'error',
		'no-new-symbol': 'error',
		'no-new-wrappers': 'error',
		'no-mixed-operators': [
			'warn',
			{
				groups: [
					['&', '|', '^', '~', '<<', '>>', '>>>'],
					['==', '!=', '===', '!==', '>', '>=', '<', '<='],
					['&&', '||'],
					['in', 'instanceof'],
				],
				allowSamePrecedence: false,
			},
		],
		'no-multi-str': 'warn',
		'no-negated-condition': 'warn',
		'no-nested-ternary': 'warn',
		'no-octal': 'warn',
		'no-octal-escape': 'warn',
		'no-param-reassign': ['error', { props: true }],
		'no-promise-executor-return': 'error',
		'no-restricted-globals': ['error'].concat(restrictedGlobals),
		'no-restricted-properties': [
			'error',
			{
				object: 'require',
				property: 'ensure',
				message:
					'Please use import() instead. More info: https://webpack.js.org/api/module-methods/#requireensure',
			},
			{
				object: 'System',
				property: 'import',
				message: 'Please use import() instead.',
			},
		],
		'no-return-assign': 'warn',
		'no-script-url': 'error',
		'no-self-compare': 'error',
		'no-template-curly-in-string': 'warn',
		'no-throw-literal': 'warn',
		'no-unexpected-multiline': 'warn',
		'no-unneeded-ternary': 'warn',
		'no-unused-expressions': [
			'error',
			{
				allowShortCircuit: true,
				allowTernary: true,
				allowTaggedTemplates: true,
			},
		],
		'no-unused-vars': [
			'warn',
			{
				args: 'none',
				ignoreRestSiblings: true,
			},
		],
		'no-use-before-define': [
			'warn',
			{
				functions: false,
				classes: false,
				variables: false,
			},
		],
		'no-useless-catch': 'error',
		'no-useless-computed-key': 'warn',
		'no-useless-concat': 'warn',
		'no-useless-constructor': 'error',
		'no-useless-escape': 'warn',
		'no-useless-rename': 'error',
		'no-useless-return': 'error',
		'no-var': 'error',
		'no-with': 'error',
		'prefer-template': 'warn',
		'require-yield': 'error',
		'spaced-comment': 'warn',
		strict: ['warn', 'never'],
		'use-isnan': 'error',
		'valid-typeof': 'error',
		yoda: 'error',

		// React
		// https://github.com/yannickcr/eslint-plugin-react
		'react/button-has-type': 'warn',
		'react/forbid-foreign-prop-types': ['warn', { allowInPropTypes: true }],
		'react/function-component-definition': [
			'warn',
			{
				namedComponents: 'arrow-function',
				unnamedComponents: 'function-expression',
			},
		],
		'react/hook-use-state': 'warn',
		'react/jsx-boolean-value': ['error', 'always'],
		'react/jsx-curly-brace-presence': 'warn',
		'react/jsx-filename-extension': [
			'warn',
			{ allow: 'as-needed', extensions: ['.tsx', '.jsx'] },
		],
		'react/jsx-fragments': ['warn', 'syntax'],
		'react/jsx-handler-names': 'warn',
		'react/jsx-no-comment-textnodes': 'warn',
		'react/jsx-no-constructed-context-values': 'warn',
		'react/jsx-no-duplicate-props': 'warn',
		'react/jsx-no-script-url': 'error',
		'react/jsx-no-target-blank': 'warn',
		'react/jsx-no-undef': 'error',
		'react/jsx-no-useless-fragment': 'error',
		'react/jsx-pascal-case': [
			'warn',
			{
				allowAllCaps: false,
				ignore: [],
			},
		],
		'react/no-access-state-in-setstate': 'error',
		'react/no-danger-with-children': 'warn',
		'react/no-deprecated': 'warn',
		'react/no-direct-mutation-state': 'warn',
		'react/no-is-mounted': 'warn',
		'react/no-namespace': 'error',
		'react/no-typos': 'error',
		'react/no-unstable-nested-components': ['warn', { allowAsProps: true }],
		'react/no-unused-prop-types': 'warn',
		'react/no-unused-state': 'warn',
		// Waiting on this to be added!
		// "react/prefer-functional-component": "warn"
		'react/self-closing-comp': 'warn',
		'react/style-prop-object': 'warn',
		'react/void-dom-elements-no-children': 'error',

		// React Hooks
		// https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks

		// Recommended covers all rules!

		// JSX A11y
		// https://github.com/evcohen/eslint-plugin-jsx-a11y
		'jsx-a11y/alt-text': 'warn',
		'jsx-a11y/anchor-has-content': 'warn',
		'jsx-a11y/anchor-is-valid': [
			'warn',
			{
				aspects: ['noHref', 'invalidHref'],
			},
		],
		'jsx-a11y/aria-activedescendant-has-tabindex': 'warn',
		'jsx-a11y/aria-props': 'warn',
		'jsx-a11y/aria-proptypes': 'warn',
		'jsx-a11y/aria-role': ['warn', { ignoreNonDOM: true }],
		'jsx-a11y/aria-unsupported-elements': 'warn',
		'jsx-a11y/autocomplete-valid': 'warn',
		'jsx-a11y/click-events-have-key-events': 'off',
		'jsx-a11y/heading-has-content': 'warn',
		'jsx-a11y/iframe-has-title': 'warn',
		'jsx-a11y/interactive-supports-focus': [
			'off',
			{
				tabbable: [
					'button',
					'checkbox',
					'link',
					'searchbox',
					'spinbutton',
					'switch',
					'textbox',
				],
			},
		],
		'jsx-a11y/img-redundant-alt': 'warn',
		'jsx-a11y/label-has-associated-control': 'warn',
		'jsx-a11y/media-has-caption': 'off',
		'jsx-a11y/mouse-events-have-key-events': 'off',
		'jsx-a11y/no-access-key': 'warn',
		'jsx-a11y/no-autofocus': 'off',
		'jsx-a11y/no-distracting-elements': 'warn',
		'jsx-a11y/no-interactive-element-to-noninteractive-role': [
			'warn',
			{
				tr: ['none', 'presentation'],
				canvas: ['img'],
			},
		],
		'jsx-a11y/no-noninteractive-element-interactions': 'off',
		'jsx-a11y/no-noninteractive-element-to-interactive-role': 'off',
		'jsx-a11y/no-noninteractive-tabindex': 'warn',
		'jsx-a11y/no-redundant-roles': 'warn',
		'jsx-a11y/no-static-element-interactions': 'warn',
		'jsx-a11y/role-has-required-aria-props': 'warn',
		'jsx-a11y/role-supports-aria-props': 'warn',
		'jsx-a11y/scope': 'warn',
		'jsx-a11y/tabindex-no-positive': 'warn',

		// Import
		// https://github.com/benmosher/eslint-plugin-import
		'import/dynamic-import-chunkname': 'warn',
		'import/first': 'error',
		'import/newline-after-import': 'warn',
		'import/no-amd': 'error',
		'import/no-anonymous-default-export': 'warn',
		'import/no-cycle': 'warn',
		'import/no-deprecated': 'warn',
		'import/no-extraneous-dependencies': 'off',
		'import/no-internal-modules': 'off', // Would be good to turn on soon
		'import/no-mutable-exports': 'warn',
		'import/no-self-import': 'error',
		'import/no-unused-modules': [
			'warn',
			{
				unusedExports: true,
				ignoreExports: [path.join(__dirname, 'src', 'index.tsx')],
			},
		],
		'import/no-useless-path-segments': ['warn', { noUselessIndex: true }],
		'import/no-webpack-loader-syntax': 'error',
		'import/order': [
			'warn',
			{
				groups: [
					'builtin',
					'external',
					'internal',
					['parent', 'sibling'],
					'index',
					'object',
					'type',
				],
				pathGroups: [
					{
						pattern: 'react*',
						group: 'builtin',
					},
					{
						pattern: 'prop-types',
						group: 'builtin',
					},
					{
						pattern: 'app/**',
						group: 'internal',
					},
				],
				pathGroupsExcludedImportTypes: ['react*', 'prop-types'],
				'newlines-between': 'always',
			},
		],
	},
	overrides: [
		{
			files: ['**/*.ts?(x)'],
			parserOptions: {
				project: [path.join(__dirname, 'tsconfig.json')],
			},
			extends: [
				'plugin:@typescript-eslint/recommended',
				'plugin:@typescript-eslint/recommended-requiring-type-checking',
				'plugin:import/typescript',
				// Re-extend to make sure all fornatting rules are turned off even after ts configs
				'plugin:prettier/recommended',
			],
			rules: {
				// Typescript
				// https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin/docs/rules

				'default-param-last': 'off',
				'@typescript-eslint/default-param-last': 'error',
				'no-constant-condition': 'off',
				'@typescript-eslint/no-unnecessary-condition': 'warn',
				'@typescript-eslint/no-confusing-non-null-assertion': 'warn',
				'@typescript-eslint/no-confusing-void-expression': [
					'warn',
					{ ignoreArrowShorthand: true },
				],
				'@typescript-eslint/no-empty-interface': 'warn',
				'@typescript-eslint/no-explicit-any': 'off',
				'@typescript-eslint/no-unsafe-member-access': 'off',

				// TypeScript's `noFallthroughCasesInSwitch` option is more robust (#6906)
				'default-case': 'off',

				// Add TypeScript specific rules (and turn off ESLint equivalents)
				'@typescript-eslint/consistent-type-assertions': 'warn',

				'no-duplicate-imports': 'off',
				'@typescript-eslint/no-duplicate-imports': 'warn',
				'no-redeclare': 'off',
				'@typescript-eslint/no-misused-promises': [
					'error',
					{
						checkVoidReturn: false,
					},
				],
				'@typescript-eslint/no-redeclare': 'warn',
				'@typescript-eslint/no-unsafe-call': 'off',
				'@typescript-eslint/no-unsafe-assignment': 'off', // Would be good to turn this on
				'@typescript-eslint/no-unsafe-return': 'off', // Would be good to turn this on
				'no-use-before-define': 'off',
				'@typescript-eslint/no-use-before-define': [
					'warn',
					{
						functions: false,
						classes: false,
						variables: false,
						typedefs: false,
					},
				],
				'no-unused-expressions': 'off',
				'@typescript-eslint/no-unused-expressions': [
					'error',
					{
						allowShortCircuit: true,
						allowTernary: true,
						allowTaggedTemplates: true,
					},
				],
				'no-unused-vars': 'off',
				'@typescript-eslint/no-unused-vars': [
					'warn',
					{
						args: 'none',
						ignoreRestSiblings: true,
					},
				],
				'no-useless-constructor': 'off',
				'@typescript-eslint/no-useless-constructor': 'warn',
				'@typescript-eslint/prefer-includes': 'warn',
				'@typescript-eslint/prefer-nullish-coalescing': [
					'off',
					{
						ignoreConditionalTests: true,
						ignoreMixedLogicalExpressions: true,
					},
				],
				'@typescript-eslint/prefer-optional-chain': 'warn',
				'@typescript-eslint/prefer-string-starts-ends-with': 'warn',
				'@typescript-eslint/restrict-template-expressions': 'off',
			},
		},
		{
			files: ['**/__tests__/**/*', '**/*.{spec,test}.*'],
			extends: [
				'plugin:jest/recommended',
				'plugin:jest/style',
				'plugin:testing-library/react',
			],
			env: {
				'jest/globals': true,
			},
			rules: {
				// Jest
				// https://github.com/jest-community/eslint-plugin-jest
				'jest/consistent-test-it': 'error',
				'jest/no-disabled-tests': 'warn',
				'jest/no-test-return-statement': 'error',
				'jest/no-test-prefixes': 'warn',
				'jest/prefer-called-with': 'warn',
				'jest/prefer-comparison-matcher': 'warn',
				'jest/prefer-equality-matcher': 'warn',
				'jest/prefer-expect-resolves': 'warn',
				'jest/prefer-hooks-on-top': 'warn',
				'jest/prefer-lowercase-title': 'warn',
				'jest/prefer-snapshot-hint': 'warn',
				'jest/prefer-spy-on': 'warn',
				'jest/require-hook': 'warn',
				'jest/require-top-level-describe': 'warn',

				// Testing Library
				// https://github.com/testing-library/eslint-plugin-testing-library
				'testing-library/no-await-sync-events': 'warn',
				'testing-library/prefer-explicit-assert': 'warn',
				'testing-library/prefer-user-event': 'warn',
				'testing-library/prefer-wait-for': 'warn',
			},
		},
	],
}
