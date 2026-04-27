const includedScopes = new Set([
	"eslint",
	"jsx-a11y",
	"nextjs",
	"oxc",
	"react",
	"typescript",
	"unicorn",
	"vitest",
])

const ignoredRules = new Set([
	"jest/no-confusing-set-timeout",
	"jest/no-deprecated-functions",
	"jest/no-done-callback",
	"jest/no-export",
	"jest/no-jasmine-globals",
	"jest/no-untyped-mock-factory",
	"jest/padding-around-after-all-blocks",
	"jest/padding-around-test-blocks",
	"jest/prefer-ending-with-an-expect",
	"jest/prefer-jest-mocked",
	"jest/prefer-to-have-been-called",
	"jest/valid-title",
])

const renamedRules: Record<string, string> = {
	"jest/consistent-test-it": "vitest/consistent-test-it",
	"jest/expect-expect": "vitest/expect-expect",
	"jest/max-expects": "vitest/max-expects",
	"jest/max-nested-describe": "vitest/max-nested-describe",
	"jest/no-alias-methods": "vitest/no-alias-methods",
	"jest/no-commented-out-tests": "vitest/no-commented-out-tests",
	"jest/no-conditional-expect": "vitest/no-conditional-expect",
	"jest/no-conditional-in-test": "vitest/no-conditional-in-test",
	"jest/no-disabled-tests": "vitest/no-disabled-tests",
	"jest/no-duplicate-hooks": "vitest/no-duplicate-hooks",
	"jest/no-focused-tests": "vitest/no-focused-tests",
	"jest/no-hooks": "vitest/no-hooks",
	"jest/no-identical-title": "vitest/no-identical-title",
	"jest/no-interpolation-in-snapshots": "vitest/no-interpolation-in-snapshots",
	"jest/no-large-snapshots": "vitest/no-large-snapshots",
	"jest/no-mocks-import": "vitest/no-mocks-import",
	"jest/no-restricted-jest-methods": "vitest/no-restricted-vi-methods",
	"jest/no-restricted-matchers": "vitest/no-restricted-matchers",
	"jest/no-standalone-expect": "vitest/no-standalone-expect",
	"jest/no-test-prefixes": "vitest/no-test-prefixes",
	"jest/no-test-return-statement": "vitest/no-test-return-statement",
	"jest/no-unneeded-async-expect-function": "vitest/no-unneeded-async-expect-function",
	"jest/prefer-called-with": "vitest/prefer-called-with",
	"jest/prefer-comparison-matcher": "vitest/prefer-comparison-matcher",
	"jest/prefer-each": "vitest/prefer-each",
	"jest/prefer-equality-matcher": "vitest/prefer-equality-matcher",
	"jest/prefer-expect-resolves": "vitest/prefer-expect-resolves",
	"jest/prefer-hooks-in-order": "vitest/prefer-hooks-in-order",
	"jest/prefer-hooks-on-top": "vitest/prefer-hooks-on-top",
	"jest/prefer-importing-jest-globals": "vitest/prefer-importing-vitest-globals",
	"jest/prefer-lowercase-title": "vitest/prefer-lowercase-title",
	"jest/prefer-mock-promise-shorthand": "vitest/prefer-mock-promise-shorthand",
	"jest/prefer-mock-return-shorthand": "vitest/prefer-mock-return-shorthand",
	"jest/prefer-snapshot-hint": "vitest/prefer-snapshot-hint",
	"jest/prefer-spy-on": "vitest/prefer-spy-on",
	"jest/prefer-strict-equal": "vitest/prefer-strict-equal",
	"jest/prefer-to-be": "vitest/prefer-to-be",
	"jest/prefer-to-contain": "vitest/prefer-to-contain",
	"jest/prefer-to-have-been-called-times": "vitest/prefer-to-have-been-called-times",
	"jest/prefer-to-have-length": "vitest/prefer-to-have-length",
	"jest/prefer-todo": "vitest/prefer-todo",
	"jest/require-hook": "vitest/require-hook",
	"jest/require-to-throw-message": "vitest/require-to-throw-message",
	"jest/require-top-level-describe": "vitest/require-top-level-describe",
	"jest/valid-describe-callback": "vitest/valid-describe-callback",
	"jest/valid-expect": "vitest/valid-expect",
	"jest/valid-expect-in-promise": "vitest/valid-expect-in-promise",
}

export function normaliseOxlintRule(rule: string): string {
	const cleanRule = rule.replace(/💭$/u, "")
	return renamedRules[cleanRule] ?? cleanRule
}

const scopeRegex = new RegExp(`^(${[...includedScopes].join("|")})/`, "u")

export function isAcceptedOxlintRule(rule: string): boolean {
	return scopeRegex.test(rule) && !ignoredRules.has(rule)
}
