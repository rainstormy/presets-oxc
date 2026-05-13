import type { OxlintConfig } from "oxlint"

/**
 * @see https://oxc.rs/docs/guide/usage/linter/config-file-reference.html
 * @see https://oxc.rs/docs/guide/usage/linter/rules.html
 */
export function oxlintNextjsPreset(): OxlintConfig {
	return {
		ignorePatterns: [".next/**/*", "next-env.d.ts"],
		plugins: ["nextjs"],
		rules: {
			// "nextjs/google-font-display": "off", // Unconfigured.
			// "nextjs/google-font-preconnect": "off", // Unconfigured.
			"nextjs/inline-script-id": "warn",
			// "nextjs/next-script-for-ga": "off", // Unconfigured.
			"nextjs/no-assign-module-variable": "warn",
			"nextjs/no-async-client-component": "warn",
			// "nextjs/no-before-interactive-script-outside-document": "off", // Not applicable in the app router.
			"nextjs/no-css-tags": "warn",
			// "nextjs/no-document-import-in-page": "off", // Not applicable in the app router.
			// "nextjs/no-duplicate-head": "off", // Not applicable in the app router.
			"nextjs/no-head-element": "warn",
			// "nextjs/no-head-import-in-document": "off", // Not applicable in the app router.
			"nextjs/no-html-link-for-pages": "warn",
			"nextjs/no-img-element": "warn",
			// "nextjs/no-page-custom-font": "off", // Not applicable in the app router.
			"nextjs/no-script-component-in-head": "warn",
			// "nextjs/no-styled-jsx-in-document": "off", // Not applicable in the app router.
			"nextjs/no-sync-scripts": "warn",
			"nextjs/no-title-in-document-head": "warn",
			// "nextjs/no-typos": "off", // Not applicable in the app router.
			"nextjs/no-unwanted-polyfillio": "warn",
			"unicorn/no-typeof-undefined": "off", // Next.js does not support `globalThis`.
			"unicorn/prefer-global-this": "off", // Next.js does not support `globalThis`.
		},
		overrides: [
			{
				files: ["src/app/**/*"],
				rules: {
					"eslint/max-lines": ["warn", { max: 0 }], // Disallow non-route files in the `app` directory.
				},
			},
			{
				// App router.
				// https://nextjs.org/docs/app/api-reference/file-conventions
				// https://nextjs.org/docs/app/api-reference/functions
				files: [
					"src/app/**/apple-icon.{ts,tsx}",
					"src/app/**/default.{ts,tsx}",
					"src/app/**/error.{ts,tsx}",
					"src/app/**/forbidden.{ts,tsx}",
					"src/app/**/global-error.{ts,tsx}",
					"src/app/**/icon.{ts,tsx}",
					"src/app/**/layout.{ts,tsx}",
					"src/app/**/loading.{ts,tsx}",
					"src/app/**/not-found.{ts,tsx}",
					"src/app/**/opengraph-image.{ts,tsx}",
					"src/app/**/page.{ts,tsx}",
					"src/app/**/route.ts",
					"src/app/**/sitemap.ts",
					"src/app/**/template.{ts,tsx}",
					"src/app/**/twitter-image.{ts,tsx}",
					"src/app/**/unauthorized.{ts,tsx}",
					"src/app/manifest.ts",
					"src/app/robots.ts",
					"src/instrumentation-*.ts",
					"src/instrumentation.ts",
					"src/mdx-components.{ts,tsx}",
					"src/middleware.ts", // Next.js 15.
					"src/proxy.ts", // Next.js 16 and newer.
				],
				rules: {
					"eslint/max-lines": "off", // Allow route files in the `app` directory.
					"eslint/no-restricted-exports": "off", // Allow default exports of pages and layouts.
					"react/jsx-filename-extension": "off",
					"react/only-export-components": [
						"warn",
						{
							allowExportNames: [
								"generateImageMetadata",
								"generateMetadata",
								"generateStaticParams",
								"generateViewport",
								"metadata",
								"runtime",
								"viewport",
							],
						},
					],
					"unicorn/filename-case": "off", // Allow all route names.
				},
			},
			{
				// Layouts.
				files: ["src/app/**/layout.tsx"],
				rules: {
					"eslint/no-restricted-imports": [
						"warn",
						{
							paths: [
								{
									name: "react",
									importNames: ["Suspense"],
									message:
										"Layout components must not use `<Suspense>`, as it interferes with some routing optimisations done by Next.js.",
								},
							],
						},
					],
					// "typescript/no-restricted-types": [
					// 	"warn",
					// 	{
					// 		types: {
					// 			Suspendable: {
					// 				message:
					// 					"Layout components must not be async, as it interferes with some routing optimisations done by Next.js. Use `Renderable` instead of `Suspendable`.",
					// 				use: "Renderable",
					// 			},
					// 		},
					// 	},
					// ],
				},
			},
		],
	}
}
