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

const ignoredRules = new Set()

const renamedRules: Record<string, string> = {}

export function normaliseOxlintRule(rule: string): string {
	const cleanRule = rule.replace(/💭$/u, "")
	return renamedRules[cleanRule] ?? cleanRule
}

const scopeRegex = new RegExp(`^(${[...includedScopes].join("|")})/`, "u")

export function isAcceptedOxlintRule(rule: string): boolean {
	return scopeRegex.test(rule) && !ignoredRules.has(rule)
}
