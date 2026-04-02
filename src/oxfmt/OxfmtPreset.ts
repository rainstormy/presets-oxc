import type { OxfmtConfig } from "oxfmt"

/**
 * @see https://oxc.rs/docs/guide/usage/formatter/config-file-reference.html
 */
export function oxfmtPreset(config: OxfmtConfig = {}): OxfmtConfig {
	const { ignorePatterns = [], overrides = [], ...options } = config

	return {
		ignorePatterns: [
			".idea/**/*",
			"node_modules/**/*",
			"package-lock.json",
			"pnpm-lock.yaml",
			...ignorePatterns,
		],

		/**
		 * Omit semicolons to reduce noise and improve readability.
		 * @see https://slides.com/evanyou/semicolons
		 */
		semi: false,

		sortImports: {
			groups: ["builtin", "external", "subpath", "unknown"],
			newlinesBetween: false,
		},

		/**
		 * Currently, Oxfmt will separate `dependencies` from `// dependencies` in `package.json`.
		 * It does not yet support custom field ordering.
		 */
		sortPackageJson: false,

		overrides: [
			{
				files: ["**/*.{json,jsonc}"],
				options: {
					trailingComma: "none", // JSON does not allow trailing commas.
				},
			},
			{
				files: ["**/*.{yml,yaml}"],
				options: {
					singleQuote: true, // Use single quotes in YAML to match the GitHub Actions syntax for `hashFiles()`.
				},
			},
			...overrides,
		],

		...options,
	}
}
