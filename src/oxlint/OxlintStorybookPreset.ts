import type { OxlintConfig } from "oxlint"
import { oxlintRestrictedImportPatterns } from "#oxlint/RestrictedImportPattern.ts"

/**
 * @see https://oxc.rs/docs/guide/usage/linter/config-file-reference.html
 * @see https://oxc.rs/docs/guide/usage/linter/rules.html
 */
export function oxlintStorybookPreset(): OxlintConfig {
	return {
		overrides: [
			{
				// Story decorators.
				files: ["src/**/*.decorators.{ts,tsx}"],
				rules: {
					"eslint/complexity": ["warn", { max: 12, variant: "modified" }],
					"eslint/no-restricted-imports": [
						"warn",
						{
							patterns: oxlintRestrictedImportPatterns({
								allowDecorators: true,
								allowFixtures: true,
							}),
						},
					],
				},
			},
			{
				// CSF stories.
				// https://storybook.js.org/docs/api/csf
				files: ["src/**/*.stories.{ts,tsx}"],
				rules: {
					"eslint/complexity": ["warn", { max: 12, variant: "modified" }],
					"eslint/no-restricted-exports": "off", // Allow default exports of static metadata.
					"eslint/no-restricted-imports": [
						"warn",
						{
							patterns: oxlintRestrictedImportPatterns({
								allowMocks: true,
								allowDecorators: true,
								allowStories: true,
								allowFixtures: true,
							}),
						},
					],
					"eslint/no-unused-vars": ["warn", { reportUsedIgnorePattern: false }],
					"react/rules-of-hooks": "off", // Allow hooks in `render` components.
				},
			},
			{
				// Storybook configuration files.
				// https://storybook.js.org/docs/configure
				files: [
					".storybook/main.{ts,tsx}",
					".storybook/manager.{ts,tsx}",
					".storybook/preview.{ts,tsx}",
				],
				rules: {
					"eslint/no-console": "off",
					"eslint/no-restricted-exports": "off", // Allow default exports.
					"eslint/no-restricted-globals": "off", // Allow access to environment variables through `process.env`.
					"eslint/no-restricted-imports": [
						"warn",
						{
							patterns: oxlintRestrictedImportPatterns({
								allowRelativePaths: true,
								allowNodejs: true,
								allowFixtures: true,
								allowDecorators: true,
								allowMocks: true,
							}),
						},
					],
					"unicorn/filename-case": ["warn", { case: "kebabCase" }],
					"unicorn/no-process-exit": "off",
				},
			},
		],
	}
}
