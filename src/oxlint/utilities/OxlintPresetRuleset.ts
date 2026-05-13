import { readFile } from "node:fs/promises"
import { isAcceptedOxlintRule, normaliseOxlintRule } from "#oxlint/utilities/OxlintRule.ts"

export async function oxlintPresetRuleset(): Promise<Set<string>> {
	const rulesets = await Promise.all([
		loadOxlintPresetRules("./src/oxlint/OxlintPreset.ts"),
		loadOxlintPresetRules("./src/oxlint/OxlintNextjsPreset.ts"),
		loadOxlintPresetRules("./src/oxlint/OxlintReactPreset.ts"),
		loadOxlintPresetRules("./src/oxlint/OxlintReactRouterPreset.ts"),
		loadOxlintPresetRules("./src/oxlint/OxlintStorybookPreset.ts"),
	])

	return new Set(rulesets.flat())
}

async function loadOxlintPresetRules(path: string): Promise<Array<string>> {
	try {
		const rawContent = await readFile(path, "utf8")
		return rawContent
			.trim()
			.split("\n")
			.map((line) => line.trim())
			.map((line) => (line.startsWith("// ") ? line.slice(3) : line)) // Include commented lines (i.e. disabled rules).
			.filter(
				(line) =>
					// Assume that rule keys are always quoted.
					line.startsWith('"') &&
					line.includes("/") &&
					(line.includes('": "') || line.includes('": [')),
			)
			.map((line) => line.slice(1, line.indexOf(":") - 1)) // Extract rule keys.
			.map(normaliseOxlintRule)
			.filter(isAcceptedOxlintRule)
	} catch (error) {
		throw new Error(`${path}: ${error instanceof Error ? error.message : "unknown error"}`, {
			cause: error,
		})
	}
}
