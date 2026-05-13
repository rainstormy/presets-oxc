import * as process from "node:process"
import { oxlintOfficialRuleset } from "#oxlint/utilities/OxlintOfficialRuleset.ts"
import { oxlintPresetRuleset } from "#oxlint/utilities/OxlintPresetRuleset.ts"

const officialRuleset = oxlintOfficialRuleset()
const presetRuleset = await oxlintPresetRuleset()

const unknownRules = presetRuleset.difference(officialRuleset)

if (unknownRules.size > 0) {
	console.error(
		`Unknown rules in the Oxlint presets:\n\n${[...unknownRules]
			.map((rule) => `+ ${rule}`)
			.toSorted()
			.join("\n")}`,
	)
	process.exit(1)
}

const unconfiguredRules = officialRuleset.difference(presetRuleset)

if (unconfiguredRules.size > 0) {
	console.error(
		`Missing rules in the Oxlint presets:\n\n${[...unconfiguredRules]
			.map((rule) => `- ${rule}`)
			.toSorted()
			.join("\n")}`,
	)
	process.exit(1)
}
