import type { OxlintConfig } from "oxlint"

/**
 * @see https://oxc.rs/docs/guide/usage/linter/config-file-reference.html
 * @see https://oxc.rs/docs/guide/usage/linter/rules.html
 */
export function oxlintReactPreset(): OxlintConfig {
	return {
		plugins: ["jsx-a11y", "react"],
		rules: {
			"eslint/no-restricted-globals": [
				"warn",
				{
					name: "React",
					message: "Import from `react` instead of using the global `React` object.",
				},
			],
			"jsx-a11y/alt-text": "warn",
			// "jsx-a11y/anchor-ambiguous-text": "off", // Unconfigured.
			"jsx-a11y/anchor-has-content": "warn",
			"jsx-a11y/anchor-is-valid": "warn",
			"jsx-a11y/aria-activedescendant-has-tabindex": "warn",
			"jsx-a11y/aria-props": "warn",
			"jsx-a11y/aria-proptypes": "warn",
			"jsx-a11y/aria-role": "warn",
			"jsx-a11y/aria-unsupported-elements": "warn",
			"jsx-a11y/autocomplete-valid": "warn",
			"jsx-a11y/click-events-have-key-events": "warn",
			"jsx-a11y/heading-has-content": "warn",
			"jsx-a11y/html-has-lang": "warn",
			"jsx-a11y/iframe-has-title": "warn",
			// "jsx-a11y/img-redundant-alt": "off", // Unconfigured.
			"jsx-a11y/interactive-supports-focus": "warn",
			"jsx-a11y/label-has-associated-control": "warn",
			"jsx-a11y/lang": "warn",
			"jsx-a11y/media-has-caption": "warn",
			"jsx-a11y/mouse-events-have-key-events": "warn",
			"jsx-a11y/no-access-key": "warn",
			"jsx-a11y/no-aria-hidden-on-focusable": "warn",
			"jsx-a11y/no-autofocus": "warn",
			"jsx-a11y/no-distracting-elements": "warn",
			"jsx-a11y/no-noninteractive-tabindex": "warn",
			"jsx-a11y/no-redundant-roles": "warn",
			"jsx-a11y/no-static-element-interactions": "warn",
			"jsx-a11y/prefer-tag-over-role": "warn",
			"jsx-a11y/role-has-required-aria-props": "warn",
			"jsx-a11y/role-supports-aria-props": "warn",
			"jsx-a11y/scope": "warn",
			"jsx-a11y/tabindex-no-positive": "warn",
			// "react/button-has-type": "off",
			"react/checked-requires-onchange-or-readonly": "warn",
			// "react/display-name": "off",
			// "react/exhaustive-deps": "off", // This rule raises false positives for non-destructured props and suggests incorrect fixes. See https://github.com/facebook/react/issues/16265.
			// "react/forbid-component-props": "off", // Unconfigured.
			// "react/forbid-dom-props": "off", // Unconfigured.
			// "react/forbid-elements": "off", // Unconfigured.
			"react/forward-ref-uses-ref": "warn",
			"react/hook-use-state": "warn",
			"react/iframe-missing-sandbox": "warn",
			"react/jsx-boolean-value": ["warn", "never"],
			"react/jsx-curly-brace-presence": ["warn", "never"],
			"react/jsx-filename-extension": [
				"warn",
				{
					allow: "as-needed",
					extensions: ["tsx"],
					ignoreFilesWithoutCode: true,
				},
			],
			"react/jsx-fragments": ["warn", "syntax"],
			"react/jsx-handler-names": "warn",
			"react/jsx-key": "warn",
			"react/jsx-max-depth": ["warn", { max: 6 }],
			"react/jsx-no-comment-textnodes": "warn",
			"react/jsx-no-constructed-context-values": "warn",
			"react/jsx-no-duplicate-props": "warn",
			"react/jsx-no-script-url": "warn",
			"react/jsx-no-target-blank": "warn",
			// "react/jsx-no-undef": "off", // Superseded by TypeScript.
			"react/jsx-no-useless-fragment": "warn",
			"react/jsx-pascal-case": "warn",
			"react/jsx-props-no-spread-multi": "warn",
			"react/jsx-props-no-spreading": "warn",
			"react/no-array-index-key": "warn",
			"react/no-children-prop": "warn",
			"react/no-clone-element": "warn",
			"react/no-danger": "warn",
			"react/no-danger-with-children": "warn",
			// "react/no-did-mount-set-state": "off", // Not applicable to function components.
			// "react/no-did-update-set-state": "off", // Not applicable to function components.
			// "react/no-direct-mutation-state": "off", // Not applicable to function components.
			// "react/no-find-dom-node": "off", // Not applicable in React 19.
			// "react/no-is-mounted": "off", // Not applicable to function components.
			"react/no-multi-comp": "warn",
			"react/no-namespace": "warn",
			"react/no-react-children": "warn",
			// "react/no-redundant-should-component-update": "off", // Not applicable to function components.
			// "react/no-render-return-value": "off", // Not applicable in React 19.
			// "react/no-set-state": "off", // Not applicable to function components.
			// "react/no-string-refs": "off", // Not applicable in React 19.
			"react/no-this-in-sfc": "warn",
			"react/no-unescaped-entities": "warn",
			"react/no-unknown-property": "warn",
			// "react/no-unsafe": "off", // Not applicable to function components.
			// "react/no-will-update-set-state": "off", // Not applicable to function components.
			"react/only-export-components": "warn",
			// "react/prefer-es6-class": "off", // Not applicable to function components.
			"react/prefer-function-component": "warn",
			// "react/react-in-jsx-scope": "off", // Not applicable in React 19.
			// "react/require-render-return": "off", // Not applicable to function components.
			"react/rules-of-hooks": "warn",
			"react/self-closing-comp": "warn",
			// "react/state-in-constructor": "off", // Not applicable to function components.
			"react/style-prop-object": "warn",
			"react/void-dom-elements-no-children": "warn",
			// "typescript/no-restricted-types": [
			// 	"warn",
			// 	{
			// 		types: {
			// 			ReactNode: {
			// 				message: "Please use `Renderable` instead of `ReactNode`.",
			// 				use: "Renderable",
			// 			},
			// 		},
			// 	},
			// ],
		},
	}
}
