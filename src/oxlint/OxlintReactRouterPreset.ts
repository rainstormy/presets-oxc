import type { OxlintConfig } from "oxlint"

/**
 * @see https://oxc.rs/docs/guide/usage/linter/config-file-reference.html
 * @see https://oxc.rs/docs/guide/usage/linter/rules.html
 */
export function oxlintReactRouterPreset(): OxlintConfig {
	return {
		overrides: [
			{
				// React Router file routes.
				// https://reactrouter.com/how-to/file-route-conventions
				// https://reactrouter.com/start/framework/route-module
				files: ["src/routes/**.tsx", "src/root.tsx"],
				rules: {
					"eslint/no-restricted-exports": "off", // Allow default exports of routes.
					"react/only-export-components": [
						"warn",
						{
							allowExportNames: [
								"action",
								"clientAction",
								"clientLoader",
								"clientMiddleware",
								"ErrorBoundary",
								"handle",
								"headers",
								"HydrateFallback",
								"links",
								"loader",
								// "meta", // Discouraged in React 19.
								"middleware",
								"shouldRevalidate",
							],
						},
					],
					"unicorn/filename-case": "off", // Allow all route names.
				},
			},
			{
				// Route configuration.
				// https://reactrouter.com/how-to/file-route-conventions
				files: ["src/routes.ts"],
				rules: {
					"eslint/no-restricted-exports": "off", // Allow default exports of the route configuration.
					"unicorn/filename-case": "off",
				},
			},
		],
	}
}
