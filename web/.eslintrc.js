const path = require('path')

module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'react-app',
		'react-app/jest',
		'plugin:import/typescript',
		'plugin:prettier/recommended',
	],
	settings: {
		'import/resolver': {
			typescript: {},
		},
	},
	rules: {
		'react/button-has-type': 'warn',
		'react/jsx-curly-brace-presence': 'warn',
		'react/jsx-filename-extension': ['warn', { extensions: ['.tsx', '.ts'] }],
		'react/jsx-fragments': 'warn',
		'react/jsx-no-useless-fragment': 'warn',
		'react/no-access-state-in-setstate': 'error',
		'react/no-unused-prop-types': 'warn',
		'react/no-unused-state': 'warn',
		'react/self-closing-comp': 'warn',

		'import/dynamic-import-chunkname': 'warn',
		'import/newline-after-import': 'warn',
		'import/no-self-import': 'error',
		'import/no-cycle': 'warn',
		'import/no-useless-path-segments': ['warn', { noUselessIndex: true }],
		'import/no-internal-modules': 'off', // Would be good to turn on soon
		'import/no-named-as-default': 'warn',
		'import/no-extraneous-dependencies': 'off',
		'import/no-unused-modules': [
			'warn',
			{
				unusedExports: true,
				src: [path.join(__dirname, 'src')],
				ignoreExports: [path.join(__dirname, 'src', 'index.tsx')],
			},
		],
		'import/no-mutable-exports': 'warn',
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
			rules: {
				'no-constant-condition': 'off',
				'@typescript-eslint/no-unnecessary-condition': 'warn',
			},
		},
		{
			files: ['**/__tests__/**/*', '**/*.{spec,test}.*'],
			extends: ['plugin:jest/recommended', 'plugin:jest/style'],
			rules: {
				'jest/consistent-test-it': 'error',
				'jest/no-test-return-statement': 'error',
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

				'testing-library/prefer-explicit-assert': 'warn',
				'testing-library/prefer-user-event': 'warn',
				'testing-library/prefer-wait-for': 'warn',
			},
		},
	],
}
