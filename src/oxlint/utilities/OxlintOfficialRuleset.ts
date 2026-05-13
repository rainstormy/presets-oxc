import { isAcceptedOxlintRule, normaliseOxlintRule } from "#oxlint/utilities/OxlintRule.ts"

/**
 * Rule table contents, copied directly from the web page.
 *
 * @see https://oxc.rs/docs/guide/usage/linter/rules.html
 */
const RAW_OXLINT_RULE_TABLE = `
accessor-pairs\teslint\tpedantic\t\t
adjacent-overload-signatures\ttypescript\tstyle\t\t
alt-text\tjsx-a11y\tcorrectness\t\t
always-return\tpromise\tsuspicious\t\t
anchor-ambiguous-text\tjsx-a11y\trestriction\t\t
anchor-has-content\tjsx-a11y\tcorrectness\t\t💡
anchor-is-valid\tjsx-a11y\tcorrectness\t\t
approx-constant\toxc\tsuspicious\t\t💡
aria-activedescendant-has-tabindex\tjsx-a11y\tcorrectness\t\t
aria-props\tjsx-a11y\tcorrectness\t\t🛠️
aria-proptypes\tjsx-a11y\tcorrectness\t\t
aria-role\tjsx-a11y\tcorrectness\t\t
aria-unsupported-elements\tjsx-a11y\tcorrectness\t\t🛠️
array-callback-return\teslint\tpedantic\t\t🚧
array-type\ttypescript\tstyle\t\t🛠️
arrow-body-style\teslint\tstyle\t\t🛠️
autocomplete-valid\tjsx-a11y\tcorrectness\t\t
avoid-new\tpromise\tstyle\t\t
await-thenable💭\ttypescript\tcorrectness\t✅\t💡
bad-array-method-on-arguments\toxc\tcorrectness\t✅\t
bad-bitwise-operator\toxc\trestriction\t\t💡
bad-char-at-comparison\toxc\tcorrectness\t✅\t
bad-comparison-sequence\toxc\tcorrectness\t✅\t
bad-min-max-func\toxc\tcorrectness\t✅\t
bad-object-literal-comparison\toxc\tcorrectness\t✅\t
bad-replace-all-arg\toxc\tcorrectness\t✅\t
ban-ts-comment\ttypescript\tpedantic\t\t🛠️
ban-tslint-comment\ttypescript\tstyle\t\t🛠️
ban-types\ttypescript\tpedantic\t\t
block-scoped-var\teslint\tsuspicious\t\t
branches-sharing-code\toxc\tpedantic\t\t💡
button-has-type\treact\trestriction\t\t
capitalized-comments\teslint\tstyle\t\t🛠️
catch-error-name\tunicorn\tstyle\t\t🛠️
catch-or-return\tpromise\trestriction\t\t
check-access\tjsdoc\trestriction\t\t
check-property-names\tjsdoc\tcorrectness\t\t🚧
check-tag-names\tjsdoc\tcorrectness\t\t🚧
checked-requires-onchange-or-readonly\treact\tpedantic\t\t
class-literal-property-style\ttypescript\tstyle\t\t🚧
class-methods-use-this\teslint\trestriction\t\t
click-events-have-key-events\tjsx-a11y\tcorrectness\t\t
complexity\teslint\trestriction\t\t
consistent-assert\tunicorn\tpedantic\t\t🛠️
consistent-date-clone\tunicorn\tstyle\t\t🛠️
consistent-each-for\tvitest\tcorrectness\t\t
consistent-empty-array-spread\tunicorn\tpedantic\t\t💡
consistent-existence-index-check\tunicorn\tstyle\t\t🛠️
consistent-function-scoping\tunicorn\tsuspicious\t\t🚧
consistent-generic-constructors\ttypescript\tstyle\t\t🛠️
consistent-indexed-object-style\ttypescript\tstyle\t\t🛠️
consistent-return💭\ttypescript\tsuspicious\t\t
consistent-template-literal-escape\tunicorn\tstyle\t\t🛠️
consistent-test-filename\tvitest\tstyle\t\t
consistent-test-it\tjest\tstyle\t\t🛠️
consistent-test-it\tvitest\tstyle\t\t🛠️
consistent-type-assertions\ttypescript\tstyle\t\t🛠️ 💡
consistent-type-definitions\ttypescript\tstyle\t\t⚠️ 🛠️
consistent-type-exports💭\ttypescript\tstyle\t\t
consistent-type-imports\ttypescript\tstyle\t\t🛠️
consistent-type-specifier-style\timport\tstyle\t\t🛠️
consistent-vitest-vi\tvitest\tstyle\t\t🛠️
const-comparisons\toxc\tcorrectness\t✅\t
constructor-super\teslint\tcorrectness\t✅\t
curly\teslint\tstyle\t\t🛠️
custom-error-definition\tunicorn\tstyle\t\t🚧
default\timport\tcorrectness\t\t
default-case\teslint\trestriction\t\t
default-case-last\teslint\tstyle\t\t
default-param-last\teslint\tstyle\t\t
define-emits-declaration\tvue\tstyle\t\t🚧
define-props-declaration\tvue\tstyle\t\t
define-props-destructuring\tvue\tstyle\t\t
display-name\treact\tpedantic\t\t
dot-notation💭\ttypescript\tstyle\t\t
double-comparisons\toxc\tcorrectness\t✅\t🛠️
empty-brace-spaces\tunicorn\tstyle\t\t🛠️
empty-tags\tjsdoc\trestriction\t\t🚧
eqeqeq\teslint\tpedantic\t\t⚠️ 🛠️
erasing-op\toxc\tcorrectness\t✅\t⚠️ 🛠️
error-message\tunicorn\tstyle\t\t
escape-case\tunicorn\tpedantic\t\t🛠️
exhaustive-deps\treact\tcorrectness\t\t⚠️ 🛠 💡
expect-expect\tjest\tcorrectness\t\t
expect-expect\tvitest\tcorrectness\t\t
explicit-function-return-type\ttypescript\trestriction\t\t
explicit-length-check\tunicorn\tpedantic\t\t🛠️
explicit-member-accessibility\ttypescript\trestriction\t\t🛠️ 💡
explicit-module-boundary-types\ttypescript\trestriction\t\t
export\timport\tnursery\t\t
exports-last\timport\tstyle\t\t
extensions\timport\trestriction\t\t
filename-case\tunicorn\tstyle\t\t
first\timport\tstyle\t\t🚧
for-direction\teslint\tcorrectness\t✅\t⚠️ 🛠️
forbid-component-props\treact\trestriction\t\t
forbid-dom-props\treact\trestriction\t\t
forbid-elements\treact\trestriction\t\t
forward-ref-uses-ref\treact\tcorrectness\t\t💡
func-name-matching\teslint\tstyle\t\t
func-names\teslint\tstyle\t\t🛠️ 💡
func-style\teslint\tstyle\t\t🚧
getter-return\teslint\tcorrectness\t✅\t
global-require\tnode\tstyle\t\t
google-font-display\tnextjs\tcorrectness\t\t
google-font-preconnect\tnextjs\tcorrectness\t\t
group-exports\timport\tstyle\t\t
grouped-accessor-pairs\teslint\tstyle\t\t🚧
guard-for-in\teslint\tstyle\t\t
handle-callback-err\tnode\trestriction\t\t
heading-has-content\tjsx-a11y\tcorrectness\t\t
hoisted-apis-on-top\tvitest\tcorrectness\t\t💡
hook-use-state\treact\tstyle\t\t🚧
html-has-lang\tjsx-a11y\tcorrectness\t\t
id-length\teslint\tstyle\t\t
iframe-has-title\tjsx-a11y\tcorrectness\t\t
iframe-missing-sandbox\treact\tsuspicious\t\t🚧
img-redundant-alt\tjsx-a11y\tcorrectness\t\t
implements-on-classes\tjsdoc\tcorrectness\t\t
init-declarations\teslint\tstyle\t\t
inline-script-id\tnextjs\tcorrectness\t\t
interactive-supports-focus\tjsx-a11y\tcorrectness\t\t💡
jsx-boolean-value\treact\tstyle\t\t🛠️
jsx-curly-brace-presence\treact\tstyle\t\t🛠️
jsx-filename-extension\treact\trestriction\t\t🚧
jsx-fragments\treact\tstyle\t\t🛠️
jsx-handler-names\treact\tstyle\t\t
jsx-key\treact\tcorrectness\t\t
jsx-max-depth\treact\tstyle\t\t
jsx-no-comment-textnodes\treact\tsuspicious\t\t
jsx-no-constructed-context-values\treact\tperf\t\t
jsx-no-duplicate-props\treact\tcorrectness\t\t
jsx-no-jsx-as-prop\treact-perf\tperf\t\t
jsx-no-new-array-as-prop\treact-perf\tperf\t\t
jsx-no-new-function-as-prop\treact-perf\tperf\t\t
jsx-no-new-object-as-prop\treact-perf\tperf\t\t
jsx-no-script-url\treact\tsuspicious\t\t🚧
jsx-no-target-blank\treact\tpedantic\t\t🚧
jsx-no-undef\treact\tcorrectness\t\t
jsx-no-useless-fragment\treact\tpedantic\t\t💡
jsx-pascal-case\treact\tstyle\t\t
jsx-props-no-spread-multi\treact\tcorrectness\t\t🛠️
jsx-props-no-spreading\treact\tstyle\t\t
label-has-associated-control\tjsx-a11y\tcorrectness\t\t
lang\tjsx-a11y\tcorrectness\t\t
logical-assignment-operators\teslint\tstyle\t\t🚧
max-classes-per-file\teslint\tpedantic\t\t
max-dependencies\timport\tpedantic\t\t
max-depth\teslint\tpedantic\t\t
max-expects\tjest\tstyle\t\t
max-expects\tvitest\tstyle\t\t
max-lines\teslint\tpedantic\t\t
max-lines-per-function\teslint\tpedantic\t\t
max-nested-callbacks\teslint\tpedantic\t\t
max-nested-describe\tjest\tstyle\t\t
max-nested-describe\tvitest\tstyle\t\t
max-params\teslint\tstyle\t\t
max-props\tvue\trestriction\t\t
max-statements\teslint\tstyle\t\t
media-has-caption\tjsx-a11y\tcorrectness\t\t
misrefactored-assign-op\toxc\tsuspicious\t\t💡
missing-throw\toxc\tcorrectness\t✅\t💡
mouse-events-have-key-events\tjsx-a11y\tcorrectness\t\t
named\timport\tnursery\t\t
namespace\timport\tcorrectness\t\t
new-cap\teslint\tstyle\t\t🚧
new-for-builtins\tunicorn\tpedantic\t\t🚧
next-script-for-ga\tnextjs\tcorrectness\t\t
no-absolute-path\timport\tsuspicious\t\t🚧
no-abusive-eslint-disable\tunicorn\trestriction\t\t
no-access-key\tjsx-a11y\tcorrectness\t\t💡
no-accessor-recursion\tunicorn\tsuspicious\t\t
no-accumulating-spread\toxc\tperf\t\t
no-alert\teslint\trestriction\t\t
no-alias-methods\tjest\tstyle\t\t🛠️
no-alias-methods\tvitest\tstyle\t\t🛠️
no-amd\timport\trestriction\t\t
no-anonymous-default-export\timport\tstyle\t\t
no-anonymous-default-export\tunicorn\trestriction\t\t🚧
no-aria-hidden-on-focusable\tjsx-a11y\tcorrectness\t\t🛠️
no-array-callback-reference\tunicorn\tpedantic\t\t🚧
no-array-constructor\teslint\tpedantic\t\t🛠️
no-array-delete💭\ttypescript\tcorrectness\t✅\t💡
no-array-for-each\tunicorn\trestriction\t\t🚧
no-array-index-key\treact\tperf\t\t
no-array-method-this-argument\tunicorn\tstyle\t\t🚧
no-array-reduce\tunicorn\trestriction\t\t
no-array-reverse\tunicorn\tsuspicious\t\t🛠️
no-array-sort\tunicorn\tsuspicious\t\t🛠️
no-arrow-functions-in-watch\tvue\tcorrectness\t\t
no-assign-module-variable\tnextjs\tcorrectness\t\t
no-async-await\toxc\trestriction\t\t
no-async-client-component\tnextjs\tcorrectness\t\t
no-async-endpoint-handlers\toxc\tsuspicious\t\t
no-async-promise-executor\teslint\tcorrectness\t✅\t
no-autofocus\tjsx-a11y\tcorrectness\t\t💡
no-await-expression-member\tunicorn\tstyle\t\t⚠️ 🛠️
no-await-in-loop\teslint\tperf\t\t
no-await-in-promise-methods\tunicorn\tcorrectness\t✅\t💡
no-barrel-file\toxc\trestriction\t\t
no-base-to-string💭\ttypescript\tcorrectness\t✅\t
no-before-interactive-script-outside-document\tnextjs\tcorrectness\t\t
no-bitwise\teslint\trestriction\t\t
no-callback-in-promise\tpromise\tcorrectness\t\t
no-caller\teslint\tcorrectness\t✅\t
no-case-declarations\teslint\tpedantic\t\t💡
no-children-prop\treact\tcorrectness\t\t
no-class-assign\teslint\tcorrectness\t✅\t
no-clone-element\treact\trestriction\t\t
no-commented-out-tests\tjest\tsuspicious\t\t
no-commented-out-tests\tvitest\tsuspicious\t\t
no-commonjs\timport\trestriction\t\t
no-compare-neg-zero\teslint\tcorrectness\t✅\t🛠️ 💡
no-cond-assign\teslint\tcorrectness\t✅\t
no-conditional-expect\tjest\tcorrectness\t\t
no-conditional-expect\tvitest\tcorrectness\t\t
no-conditional-in-test\tjest\tpedantic\t\t
no-conditional-in-test\tvitest\tpedantic\t\t
no-conditional-tests\tvitest\tcorrectness\t\t
no-confusing-non-null-assertion\ttypescript\tsuspicious\t\t🚧
no-confusing-set-timeout\tjest\tstyle\t\t
no-confusing-void-expression💭\ttypescript\tpedantic\t\t🛠️ 💡
no-console\teslint\trestriction\t\t💡
no-console-spaces\tunicorn\tstyle\t\t🛠️
no-const-assign\teslint\tcorrectness\t✅\t
no-const-enum\toxc\trestriction\t\t🛠️
no-constant-binary-expression\teslint\tcorrectness\t✅\t
no-constant-condition\teslint\tcorrectness\t✅\t
no-constructor-return\teslint\tpedantic\t\t
no-continue\teslint\tstyle\t\t
no-control-regex\teslint\tcorrectness\t✅\t
no-css-tags\tnextjs\tcorrectness\t\t
no-cycle\timport\trestriction\t\t
no-danger\treact\trestriction\t\t
no-danger-with-children\treact\tcorrectness\t\t
no-debugger\teslint\tcorrectness\t✅\t💡
no-default-export\timport\trestriction\t\t
no-defaults\tjsdoc\tcorrectness\t\t🚧
no-delete-var\teslint\tcorrectness\t✅\t
no-deprecated💭\ttypescript\tpedantic\t\t
no-deprecated-data-object-declaration\tvue\tcorrectness\t\t🚧
no-deprecated-delete-set\tvue\tcorrectness\t\t
no-deprecated-destroyed-lifecycle\tvue\tcorrectness\t\t🛠️
no-deprecated-events-api\tvue\tcorrectness\t\t
no-deprecated-functions\tjest\tstyle\t\t🛠️
no-deprecated-model-definition\tvue\tcorrectness\t\t🚧
no-deprecated-vue-config-keycodes\tvue\tcorrectness\t\t
no-did-mount-set-state\treact\tcorrectness\t\t
no-did-update-set-state\treact\tcorrectness\t\t
no-direct-mutation-state\treact\tcorrectness\t\t
no-disabled-tests\tjest\tcorrectness\t\t
no-disabled-tests\tvitest\tcorrectness\t\t
no-distracting-elements\tjsx-a11y\tcorrectness\t\t
no-div-regex\teslint\trestriction\t\t🛠️
no-document-cookie\tunicorn\trestriction\t\t
no-document-import-in-page\tnextjs\tcorrectness\t\t
no-done-callback\tjest\tstyle\t\t🚧
no-dupe-class-members\teslint\tcorrectness\t✅\t
no-dupe-else-if\teslint\tcorrectness\t✅\t
no-dupe-keys\teslint\tcorrectness\t✅\t
no-duplicate-case\teslint\tcorrectness\t✅\t
no-duplicate-enum-values\ttypescript\tcorrectness\t✅\t
no-duplicate-head\tnextjs\tcorrectness\t\t
no-duplicate-hooks\tjest\tstyle\t\t
no-duplicate-hooks\tvitest\tstyle\t\t
no-duplicate-imports\teslint\tstyle\t\t🚧
no-duplicate-type-constituents💭\ttypescript\tcorrectness\t✅\t🛠️
no-duplicates\timport\tstyle\t\t
no-dynamic-delete\ttypescript\trestriction\t\t
no-dynamic-require\timport\trestriction\t\t
no-else-return\teslint\tpedantic\t\t🛠️
no-empty\teslint\trestriction\t\t💡
no-empty-character-class\teslint\tcorrectness\t✅\t
no-empty-file\tunicorn\tcorrectness\t✅\t
no-empty-function\teslint\trestriction\t\t💡
no-empty-interface\ttypescript\tstyle\t\t🚧
no-empty-named-blocks\timport\tsuspicious\t\t🛠️
no-empty-object-type\ttypescript\trestriction\t\t🚧
no-empty-pattern\teslint\tcorrectness\t✅\t
no-empty-static-block\teslint\tcorrectness\t✅\t💡
no-eq-null\teslint\trestriction\t\t⚠️ 🛠️
no-eval\teslint\tcorrectness\t✅\t
no-ex-assign\teslint\tcorrectness\t✅\t
no-explicit-any\ttypescript\trestriction\t\t🛠️
no-export\tjest\tcorrectness\t\t
no-export-in-script-setup\tvue\tcorrectness\t\t
no-exports-assign\tnode\tstyle\t\t🛠️
no-extend-native\teslint\tsuspicious\t\t
no-extra-bind\teslint\tsuspicious\t\t🚧
no-extra-boolean-cast\teslint\tcorrectness\t✅\t🛠️ 💡
no-extra-label\teslint\tstyle\t\t🛠️
no-extra-non-null-assertion\ttypescript\tcorrectness\t✅\t🛠️
no-extraneous-class\ttypescript\tsuspicious\t\t⚠️ 💡
no-fallthrough\teslint\tpedantic\t\t🚧
no-find-dom-node\treact\tcorrectness\t\t
no-floating-promises💭\ttypescript\tcorrectness\t✅\t💡
no-focused-tests\tjest\tcorrectness\t\t🛠️
no-focused-tests\tvitest\tcorrectness\t\t🛠️
no-for-in-array💭\ttypescript\tcorrectness\t✅\t
no-func-assign\teslint\tcorrectness\t✅\t
no-global-assign\teslint\tcorrectness\t✅\t
no-head-element\tnextjs\tcorrectness\t\t
no-head-import-in-document\tnextjs\tcorrectness\t\t
no-hex-escape\tunicorn\tpedantic\t\t🛠️
no-hooks\tjest\tstyle\t\t
no-hooks\tvitest\tstyle\t\t
no-html-link-for-pages\tnextjs\tcorrectness\t\t
no-identical-title\tjest\tstyle\t\t
no-identical-title\tvitest\tstyle\t\t
no-img-element\tnextjs\tcorrectness\t\t🚧
no-immediate-mutation\tunicorn\tpedantic\t\t🚧
no-implicit-coercion\teslint\tstyle\t\t🛠️
no-implied-eval💭\ttypescript\tcorrectness\t✅\t
no-import-assign\teslint\tcorrectness\t✅\t
no-import-compiler-macros\tvue\trestriction\t\t⚠️ 🛠️
no-import-node-test\tvitest\tstyle\t\t💡
no-import-type-side-effects\ttypescript\trestriction\t\t🛠️
no-importing-vitest-globals\tvitest\tstyle\t\t🛠️
no-inferrable-types\ttypescript\tstyle\t\t💡
no-inline-comments\teslint\tpedantic\t\t
no-inner-declarations\teslint\tpedantic\t\t
no-instanceof-array\tunicorn\tpedantic\t\t🛠️
no-instanceof-builtins\tunicorn\tsuspicious\t\t💡
no-interpolation-in-snapshots\tjest\tstyle\t\t
no-interpolation-in-snapshots\tvitest\tstyle\t\t
no-invalid-fetch-options\tunicorn\tcorrectness\t✅\t
no-invalid-regexp\teslint\tcorrectness\t✅\t
no-invalid-remove-event-listener\tunicorn\tcorrectness\t✅\t
no-invalid-void-type\ttypescript\trestriction\t\t
no-irregular-whitespace\teslint\tcorrectness\t✅\t
no-is-mounted\treact\tcorrectness\t\t
no-iterator\teslint\tcorrectness\t✅\t💡
no-jasmine-globals\tjest\tstyle\t\t🛠️
no-label-var\teslint\tstyle\t\t
no-labels\teslint\tstyle\t\t
no-large-snapshots\tjest\tstyle\t\t
no-large-snapshots\tvitest\tstyle\t\t
no-length-as-slice-end\tunicorn\trestriction\t\t🛠️
no-lifecycle-after-await\tvue\tcorrectness\t\t
no-lone-blocks\teslint\tstyle\t\t
no-lonely-if\teslint\tpedantic\t\t🚧
no-lonely-if\tunicorn\tpedantic\t\t🚧
no-loop-func\teslint\tpedantic\t\t
no-loss-of-precision\teslint\tcorrectness\t✅\t
no-magic-array-flat-depth\tunicorn\trestriction\t\t
no-magic-numbers\teslint\tstyle\t\t🚧
no-map-spread\toxc\tperf\t\t🛠️ 💡
no-meaningless-void-operator💭\ttypescript\tcorrectness\t✅\t🛠️ 💡
no-misleading-character-class\teslint\tcorrectness\t✅\t🚧
no-misused-new\ttypescript\tcorrectness\t✅\t
no-misused-promises💭\ttypescript\tpedantic\t\t
no-misused-spread💭\ttypescript\tcorrectness\t✅\t💡
no-mixed-enums💭\ttypescript\tpedantic\t\t
no-mocks-import\tjest\tstyle\t\t
no-mocks-import\tvitest\tstyle\t\t
no-multi-assign\teslint\tstyle\t\t
no-multi-comp\treact\trestriction\t\t
no-multi-str\teslint\tstyle\t\t
no-multiple-resolved\tpromise\tsuspicious\t\t
no-multiple-slot-args\tvue\trestriction\t\t🚧
no-mutable-exports\timport\tstyle\t\t
no-named-as-default\timport\tsuspicious\t\t
no-named-as-default-member\timport\tsuspicious\t\t
no-named-default\timport\tstyle\t\t
no-named-export\timport\tstyle\t\t
no-namespace\timport\tstyle\t\t🚧
no-namespace\treact\tsuspicious\t\t
no-namespace\ttypescript\trestriction\t\t
no-negated-condition\teslint\tpedantic\t\t🚧
no-negated-condition\tunicorn\tpedantic\t\t🚧
no-negation-in-equality-check\tunicorn\tpedantic\t\t💡
no-nested-ternary\teslint\tstyle\t\t
no-nested-ternary\tunicorn\tstyle\t\t🛠️
no-nesting\tpromise\tstyle\t\t🚧
no-new\teslint\tsuspicious\t\t
no-new-array\tunicorn\tcorrectness\t✅\t🚧
no-new-buffer\tunicorn\tpedantic\t\t💡
no-new-func\teslint\tstyle\t\t
no-new-native-nonconstructor\teslint\tcorrectness\t✅\t
no-new-require\tnode\trestriction\t\t
no-new-statics\tpromise\tcorrectness\t\t🛠️
no-new-wrappers\teslint\tpedantic\t\t🛠️
no-nodejs-modules\timport\tstyle\t\t
no-non-null-asserted-nullish-coalescing\ttypescript\trestriction\t\t💡
no-non-null-asserted-optional-chain\ttypescript\tcorrectness\t✅\t💡
no-non-null-assertion\ttypescript\trestriction\t\t🚧
no-noninteractive-tabindex\tjsx-a11y\tcorrectness\t\t
no-nonoctal-decimal-escape\teslint\tcorrectness\t✅\t💡
no-null\tunicorn\tstyle\t\t⚠️ 🛠️
no-obj-calls\teslint\tcorrectness\t✅\t
no-object-as-default-parameter\tunicorn\tpedantic\t\t
no-object-constructor\teslint\tpedantic\t\t🚧
no-optional-chaining\toxc\trestriction\t\t
no-page-custom-font\tnextjs\tcorrectness\t\t
no-param-reassign\teslint\trestriction\t\t
no-path-concat\tnode\trestriction\t\t
no-plusplus\teslint\trestriction\t\t💡
no-process-env\tnode\trestriction\t\t
no-process-exit\tunicorn\trestriction\t\t🚧
no-promise-executor-return\teslint\tpedantic\t\t🚧
no-promise-in-callback\tpromise\tsuspicious\t\t
no-proto\teslint\trestriction\t\t🚧
no-prototype-builtins\teslint\tpedantic\t\t🚧
no-react-children\treact\trestriction\t\t
no-redeclare\teslint\tpedantic\t\t
no-redundant-roles\tjsx-a11y\tcorrectness\t\t🛠️
no-redundant-should-component-update\treact\tstyle\t\t
no-redundant-type-constituents💭\ttypescript\tcorrectness\t✅\t
no-regex-spaces\teslint\trestriction\t\t🛠️
no-relative-parent-imports\timport\trestriction\t\t
no-render-return-value\treact\tcorrectness\t\t
no-require-imports\ttypescript\trestriction\t\t🚧
no-required-prop-with-default\tvue\tsuspicious\t\t💡
no-rest-spread-properties\toxc\trestriction\t\t
no-restricted-exports\teslint\tnursery\t\t
no-restricted-globals\teslint\trestriction\t\t
no-restricted-imports\teslint\trestriction\t\t
no-restricted-jest-methods\tjest\tstyle\t\t
no-restricted-matchers\tjest\tstyle\t\t
no-restricted-matchers\tvitest\tstyle\t\t
no-restricted-properties\teslint\trestriction\t\t
no-restricted-types\ttypescript\trestriction\t\t🛠️ 💡
no-restricted-vi-methods\tvitest\tstyle\t\t
no-return-assign\teslint\tstyle\t\t
no-return-in-finally\tpromise\tnursery\t\t
no-return-wrap\tpromise\tstyle\t\t🚧
no-script-component-in-head\tnextjs\tcorrectness\t\t
no-script-url\teslint\tstyle\t\t
no-self-assign\teslint\tcorrectness\t✅\t
no-self-compare\teslint\tpedantic\t\t
no-self-import\timport\tsuspicious\t\t
no-sequences\teslint\trestriction\t\t
no-set-state\treact\tstyle\t\t
no-setter-return\teslint\tcorrectness\t✅\t
no-shadow\teslint\tsuspicious\t\t
no-shadow-restricted-names\teslint\tcorrectness\t✅\t
no-single-promise-in-promise-methods\tunicorn\tcorrectness\t✅\t🛠️
no-sparse-arrays\teslint\tcorrectness\t✅\t
no-standalone-expect\tjest\tcorrectness\t\t
no-standalone-expect\tvitest\tcorrectness\t\t
no-static-element-interactions\tjsx-a11y\tcorrectness\t\t
no-static-only-class\tunicorn\tpedantic\t\t⚠️ 🛠️
no-string-refs\treact\tcorrectness\t\t
no-styled-jsx-in-document\tnextjs\tcorrectness\t\t
no-sync-scripts\tnextjs\tcorrectness\t\t
no-template-curly-in-string\teslint\tstyle\t\t
no-ternary\teslint\tstyle\t\t
no-test-prefixes\tjest\tstyle\t\t🛠️
no-test-prefixes\tvitest\tstyle\t\t🛠️
no-test-return-statement\tjest\tstyle\t\t
no-test-return-statement\tvitest\tstyle\t\t
no-thenable\tunicorn\tcorrectness\t✅\t
no-this-alias\ttypescript\tcorrectness\t✅\t
no-this-assignment\tunicorn\tpedantic\t\t
no-this-before-super\teslint\tcorrectness\t✅\t
no-this-in-before-route-enter\tvue\tcorrectness\t\t
no-this-in-exported-function\toxc\tsuspicious\t\t
no-this-in-sfc\treact\tcorrectness\t\t
no-throw-literal\teslint\tpedantic\t\t💡
no-title-in-document-head\tnextjs\tcorrectness\t\t
no-typeof-undefined\tunicorn\tpedantic\t\t🛠️ 💡
no-typos\tnextjs\tcorrectness\t\t🚧
no-unassigned-import\timport\tsuspicious\t\t
no-unassigned-vars\teslint\tcorrectness\t✅\t
no-undef\teslint\tnursery\t\t
no-undefined\teslint\trestriction\t\t
no-underscore-dangle\teslint\tsuspicious\t\t
no-unescaped-entities\treact\tpedantic\t\t🚧
no-unexpected-multiline\teslint\tsuspicious\t\t⚠️ 🛠️
no-unknown-property\treact\trestriction\t\t🚧
no-unmodified-loop-condition\teslint\tsuspicious\t\t
no-unnecessary-array-flat-depth\tunicorn\tpedantic\t\t💡
no-unnecessary-array-splice-count\tunicorn\tpedantic\t\t🛠️
no-unnecessary-await\tunicorn\tcorrectness\t✅\t🛠️
no-unnecessary-boolean-literal-compare💭\ttypescript\tsuspicious\t\t🚧
no-unnecessary-condition💭\ttypescript\tnursery\t\t
no-unnecessary-parameter-property-assignment\ttypescript\tcorrectness\t✅\t💡
no-unnecessary-qualifier💭\ttypescript\tstyle\t\t
no-unnecessary-slice-end\tunicorn\tpedantic\t\t🛠️
no-unnecessary-template-expression💭\ttypescript\tsuspicious\t\t🛠️
no-unnecessary-type-arguments💭\ttypescript\tsuspicious\t\t🛠️
no-unnecessary-type-assertion💭\ttypescript\tsuspicious\t\t🛠️
no-unnecessary-type-constraint\ttypescript\tsuspicious\t\t🚧
no-unnecessary-type-conversion💭\ttypescript\tsuspicious\t\t
no-unnecessary-type-parameters💭\ttypescript\tsuspicious\t\t
no-unneeded-async-expect-function\tjest\tstyle\t\t🛠️
no-unneeded-async-expect-function\tvitest\tstyle\t\t🛠️
no-unneeded-ternary\teslint\tsuspicious\t\t⚠️ 🛠️
no-unreachable\teslint\tcorrectness\t✅\t
no-unreadable-array-destructuring\tunicorn\tstyle\t\t🚧
no-unreadable-iife\tunicorn\tpedantic\t\t
no-unsafe\treact\tcorrectness\t\t
no-unsafe-argument💭\ttypescript\tpedantic\t\t
no-unsafe-assignment💭\ttypescript\tpedantic\t\t
no-unsafe-call💭\ttypescript\tpedantic\t\t
no-unsafe-declaration-merging\ttypescript\tcorrectness\t✅\t
no-unsafe-enum-comparison💭\ttypescript\tsuspicious\t\t💡
no-unsafe-finally\teslint\tcorrectness\t✅\t
no-unsafe-function-type\ttypescript\tpedantic\t\t
no-unsafe-member-access💭\ttypescript\tpedantic\t\t
no-unsafe-negation\teslint\tcorrectness\t✅\t🛠️
no-unsafe-optional-chaining\teslint\tcorrectness\t✅\t
no-unsafe-return💭\ttypescript\tpedantic\t\t
no-unsafe-type-assertion💭\ttypescript\tsuspicious\t\t
no-unsafe-unary-minus💭\ttypescript\tcorrectness\t✅\t
no-untyped-mock-factory\tjest\tstyle\t\t🛠️
no-unused-expressions\teslint\tcorrectness\t✅\t
no-unused-labels\teslint\tcorrectness\t✅\t🛠️
no-unused-private-class-members\teslint\tcorrectness\t✅\t
no-unused-vars\teslint\tcorrectness\t✅\t⚠️ 🛠 💡
no-unwanted-polyfillio\tnextjs\tcorrectness\t\t
no-use-before-define\teslint\trestriction\t\t
no-useless-assignment\teslint\tnursery\t\t
no-useless-backreference\teslint\tcorrectness\t✅\t
no-useless-call\teslint\tperf\t\t
no-useless-catch\teslint\tcorrectness\t✅\t
no-useless-collection-argument\tunicorn\tstyle\t\t💡
no-useless-computed-key\teslint\tstyle\t\t🛠️
no-useless-concat\teslint\tsuspicious\t\t🚧
no-useless-constructor\teslint\tsuspicious\t\t💡
no-useless-default-assignment💭\ttypescript\tcorrectness\t✅\t
no-useless-empty-export\ttypescript\tcorrectness\t✅\t🛠️
no-useless-error-capture-stack-trace\tunicorn\trestriction\t\t💡
no-useless-escape\teslint\tcorrectness\t✅\t🛠️
no-useless-fallback-in-spread\tunicorn\tcorrectness\t✅\t🛠️
no-useless-iterator-to-array\tunicorn\tnursery\t\t🛠️ 💡
no-useless-length-check\tunicorn\tcorrectness\t✅\t🚧
no-useless-promise-resolve-reject\tunicorn\tpedantic\t\t🛠️
no-useless-rename\teslint\tcorrectness\t✅\t🛠️
no-useless-return\teslint\tpedantic\t\t🚧
no-useless-spread\tunicorn\tcorrectness\t✅\t⚠️ 🛠️
no-useless-switch-case\tunicorn\tpedantic\t\t🚧
no-useless-undefined\tunicorn\tpedantic\t\t🛠️
no-var\teslint\trestriction\t\t🛠️
no-var-requires\ttypescript\trestriction\t\t
no-void\teslint\trestriction\t\t💡
no-warning-comments\teslint\tpedantic\t\t
no-webpack-loader-syntax\timport\trestriction\t\t
no-will-update-set-state\treact\tcorrectness\t\t
no-with\teslint\tcorrectness\t✅\t
no-wrapper-object-types\ttypescript\tcorrectness\t✅\t🛠️
no-zero-fractions\tunicorn\tstyle\t\t🛠️
non-nullable-type-assertion-style💭\ttypescript\trestriction\t\t🛠️
number-arg-out-of-range\toxc\tcorrectness\t✅\t
number-literal-case\tunicorn\tstyle\t\t🛠️
numeric-separators-style\tunicorn\tstyle\t\t🛠️
object-shorthand\teslint\tstyle\t\t🛠️
only-export-components\treact\trestriction\t\t
only-throw-error💭\ttypescript\tpedantic\t\t
only-used-in-recursion\toxc\tcorrectness\t✅\t⚠️ 🛠️
operator-assignment\teslint\tstyle\t\t⚠️ 🛠️
padding-around-after-all-blocks\tjest\tstyle\t\t🛠️
padding-around-test-blocks\tjest\tstyle\t\t🛠️
param-names\tpromise\tstyle\t\t
parameter-properties\ttypescript\tstyle\t\t
prefer-add-event-listener\tunicorn\tsuspicious\t\t🚧
prefer-array-find\tunicorn\tperf\t\t🚧
prefer-array-flat\tunicorn\tpedantic\t\t⚠️ 🛠️
prefer-array-flat-map\tunicorn\tperf\t\t🛠️
prefer-array-index-of\tunicorn\tstyle\t\t🚧
prefer-array-some\tunicorn\tpedantic\t\t💡
prefer-as-const\ttypescript\tcorrectness\t✅\t🛠️
prefer-at\tunicorn\tpedantic\t\t⚠️ 🛠️
prefer-await-to-callbacks\tpromise\tstyle\t\t
prefer-await-to-then\tpromise\tstyle\t\t
prefer-bigint-literals\tunicorn\tstyle\t\t🛠️
prefer-blob-reading-methods\tunicorn\tpedantic\t\t🚧
prefer-called-exactly-once-with\tvitest\tstyle\t\t⚠️ 🛠️
prefer-called-once\tvitest\tstyle\t\t🛠️
prefer-called-times\tvitest\tstyle\t\t🛠️
prefer-called-with\tjest\tstyle\t\t🛠️
prefer-called-with\tvitest\tstyle\t\t🛠️
prefer-catch\tpromise\tstyle\t\t🚧
prefer-class-fields\tunicorn\tstyle\t\t🛠️ 💡
prefer-classlist-toggle\tunicorn\tstyle\t\t🛠️
prefer-code-point\tunicorn\tpedantic\t\t🛠️
prefer-comparison-matcher\tjest\tstyle\t\t🛠️
prefer-comparison-matcher\tvitest\tstyle\t\t🛠️
prefer-const\teslint\tstyle\t\t🛠️
prefer-date-now\tunicorn\tpedantic\t\t🛠️
prefer-default-export\timport\tstyle\t\t
prefer-default-parameters\tunicorn\tstyle\t\t🛠️
prefer-describe-function-title\tvitest\tstyle\t\t🛠️
prefer-destructuring\teslint\tstyle\t\t🛠️
prefer-dom-node-append\tunicorn\tpedantic\t\t🛠️
prefer-dom-node-dataset\tunicorn\tpedantic\t\t🛠️
prefer-dom-node-remove\tunicorn\tpedantic\t\t🚧
prefer-dom-node-text-content\tunicorn\tstyle\t\t🛠️
prefer-each\tjest\tstyle\t\t
prefer-each\tvitest\tstyle\t\t
prefer-ending-with-an-expect\tjest\tstyle\t\t
prefer-enum-initializers\ttypescript\tpedantic\t\t💡
prefer-equality-matcher\tjest\tstyle\t\t💡
prefer-equality-matcher\tvitest\tstyle\t\t💡
prefer-es6-class\treact\tstyle\t\t
prefer-event-target\tunicorn\tpedantic\t\t
prefer-expect-assertions\tjest\tstyle\t\t💡
prefer-expect-assertions\tvitest\tstyle\t\t💡
prefer-expect-resolves\tjest\tstyle\t\t🛠️
prefer-expect-resolves\tvitest\tstyle\t\t🛠️
prefer-expect-type-of\tvitest\tstyle\t\t🛠️
prefer-exponentiation-operator\teslint\tstyle\t\t🛠️
prefer-find💭\ttypescript\tstyle\t\t
prefer-for-of\ttypescript\tstyle\t\t🚧
prefer-function-component\treact\trestriction\t\t
prefer-function-type\ttypescript\tstyle\t\t🛠️
prefer-global-this\tunicorn\tstyle\t\t💡
prefer-hooks-in-order\tjest\tstyle\t\t
prefer-hooks-in-order\tvitest\tstyle\t\t
prefer-hooks-on-top\tjest\tstyle\t\t
prefer-hooks-on-top\tvitest\tstyle\t\t
prefer-import-from-vue\tvue\tcorrectness\t\t🛠️
prefer-import-in-mock\tvitest\tstyle\t\t🛠️
prefer-import-meta-properties\tunicorn\tpedantic\t\t🛠️
prefer-importing-jest-globals\tjest\tstyle\t\t🛠️
prefer-importing-vitest-globals\tvitest\tstyle\t\t🛠️
prefer-includes💭\ttypescript\tpedantic\t\t🛠️
prefer-includes\tunicorn\tstyle\t\t💡
prefer-jest-mocked\tjest\tstyle\t\t🛠️
prefer-keyboard-event-key\tunicorn\tstyle\t\t🛠️
prefer-literal-enum-member\ttypescript\trestriction\t\t
prefer-logical-operator-over-ternary\tunicorn\tstyle\t\t💡
prefer-lowercase-title\tjest\tstyle\t\t🛠️
prefer-lowercase-title\tvitest\tstyle\t\t🛠️
prefer-math-min-max\tunicorn\tpedantic\t\t🛠️
prefer-math-trunc\tunicorn\tpedantic\t\t💡
prefer-mock-promise-shorthand\tjest\tstyle\t\t🛠️
prefer-mock-promise-shorthand\tvitest\tstyle\t\t🛠️
prefer-mock-return-shorthand\tjest\tstyle\t\t🛠️
prefer-mock-return-shorthand\tvitest\tstyle\t\t🛠️
prefer-modern-dom-apis\tunicorn\tstyle\t\t💡
prefer-modern-math-apis\tunicorn\trestriction\t\t🚧
prefer-module\tunicorn\trestriction\t\t🚧
prefer-namespace-keyword\ttypescript\tcorrectness\t✅\t🛠️
prefer-native-coercion-functions\tunicorn\tpedantic\t\t🚧
prefer-negative-index\tunicorn\tstyle\t\t🛠️
prefer-node-protocol\tunicorn\trestriction\t\t🛠️
prefer-nullish-coalescing💭\ttypescript\tpedantic\t\t🛠️
prefer-number-properties\tunicorn\trestriction\t\t⚠️ 🛠️
prefer-numeric-literals\teslint\tstyle\t\t🛠️
prefer-object-from-entries\tunicorn\tstyle\t\t🚧
prefer-object-has-own\teslint\tstyle\t\t🛠️
prefer-object-spread\teslint\tstyle\t\t🛠️
prefer-optional-catch-binding\tunicorn\tstyle\t\t🛠️
prefer-optional-chain💭\ttypescript\tnursery\t\t⚠️ 🛠 💡
prefer-promise-reject-errors\teslint\tstyle\t\t
prefer-promise-reject-errors💭\ttypescript\tpedantic\t\t
prefer-prototype-methods\tunicorn\tpedantic\t\t🛠️
prefer-query-selector\tunicorn\tpedantic\t\t🛠️
prefer-readonly💭\ttypescript\tstyle\t\t
prefer-readonly-parameter-types💭\ttypescript\tpedantic\t\t
prefer-reduce-type-parameter💭\ttypescript\tstyle\t\t🛠️
prefer-reflect-apply\tunicorn\tstyle\t\t💡
prefer-regexp-exec💭\ttypescript\tstyle\t\t
prefer-regexp-test\tunicorn\tpedantic\t\t🛠️
prefer-response-static-json\tunicorn\tstyle\t\t💡
prefer-rest-params\teslint\tstyle\t\t
prefer-return-this-type💭\ttypescript\tstyle\t\t🛠️
prefer-set-has\tunicorn\tperf\t\t⚠️ 🛠️
prefer-set-size\tunicorn\tcorrectness\t✅\t🛠️
prefer-snapshot-hint\tjest\tcorrectness\t\t
prefer-snapshot-hint\tvitest\tcorrectness\t\t
prefer-spread\teslint\tstyle\t\t
prefer-spread\tunicorn\tstyle\t\t🛠️
prefer-spy-on\tjest\tstyle\t\t💡
prefer-spy-on\tvitest\tstyle\t\t💡
prefer-strict-boolean-matchers\tvitest\tstyle\t\t🛠️
prefer-strict-equal\tjest\tstyle\t\t🛠️
prefer-strict-equal\tvitest\tstyle\t\t🛠️
prefer-string-raw\tunicorn\tstyle\t\t🛠️
prefer-string-replace-all\tunicorn\tpedantic\t\t🛠️
prefer-string-slice\tunicorn\tpedantic\t\t🛠️
prefer-string-starts-ends-with💭\ttypescript\tstyle\t✅\t
prefer-string-starts-ends-with\tunicorn\tcorrectness\t✅\t🛠️
prefer-string-trim-start-end\tunicorn\tstyle\t\t🛠️
prefer-structured-clone\tunicorn\tstyle\t\t💡
prefer-tag-over-role\tjsx-a11y\tcorrectness\t\t
prefer-template\teslint\tstyle\t\t🛠️
prefer-ternary\tunicorn\tstyle\t\t🚧
prefer-to-be\tjest\tstyle\t\t🛠️
prefer-to-be\tvitest\tstyle\t\t🛠️
prefer-to-be-falsy\tvitest\tstyle\t\t🛠️
prefer-to-be-object\tvitest\tstyle\t\t🛠️
prefer-to-be-truthy\tvitest\tstyle\t\t🛠️
prefer-to-contain\tjest\tstyle\t\t🛠️
prefer-to-contain\tvitest\tstyle\t\t🛠️
prefer-to-have-been-called\tjest\tstyle\t\t🛠️
prefer-to-have-been-called-times\tjest\tstyle\t\t🛠️
prefer-to-have-been-called-times\tvitest\tstyle\t\t🛠️
prefer-to-have-length\tjest\tstyle\t\t🛠️
prefer-to-have-length\tvitest\tstyle\t\t🛠️
prefer-todo\tjest\tstyle\t\t🛠️
prefer-todo\tvitest\tstyle\t\t🛠️
prefer-top-level-await\tunicorn\tpedantic\t\t🚧
prefer-ts-expect-error\ttypescript\tpedantic\t\t🛠️
prefer-type-error\tunicorn\tpedantic\t\t🛠️
preserve-caught-error\teslint\tsuspicious\t\t🛠️
promise-function-async💭\ttypescript\trestriction\t\t🛠️
radix\teslint\tpedantic\t\t⚠️ 🛠️
react-in-jsx-scope\treact\tsuspicious\t\t
related-getter-setter-pairs💭\ttypescript\tpedantic\t\t
relative-url-style\tunicorn\tstyle\t\t🛠️ 💡
require-array-join-separator\tunicorn\tstyle\t\t🛠️
require-array-sort-compare💭\ttypescript\tcorrectness\t✅\t
require-await\teslint\tpedantic\t\t⚠️ 🛠️
require-await💭\ttypescript\tpedantic\t\t💡
require-awaited-expect-poll\tvitest\tcorrectness\t\t
require-default-export\tvue\tsuspicious\t\t
require-hook\tjest\tstyle\t\t
require-hook\tvitest\tstyle\t\t
require-local-test-context-for-concurrent-snapshots\tvitest\tcorrectness\t\t
require-mock-type-parameters\tvitest\tcorrectness\t\t
require-module-attributes\tunicorn\tstyle\t\t💡
require-module-specifiers\tunicorn\tsuspicious\t\t🛠️
require-number-to-fixed-digits-argument\tunicorn\tpedantic\t\t🛠️
require-param\tjsdoc\tpedantic\t\t🚧
require-param-description\tjsdoc\tpedantic\t\t🚧
require-param-name\tjsdoc\tpedantic\t\t
require-param-type\tjsdoc\tpedantic\t\t🚧
require-post-message-target-origin\tunicorn\tsuspicious\t\t💡
require-property\tjsdoc\tcorrectness\t\t🚧
require-property-description\tjsdoc\tcorrectness\t\t
require-property-name\tjsdoc\tcorrectness\t\t
require-property-type\tjsdoc\tcorrectness\t\t
require-render-return\treact\tnursery\t\t
require-returns\tjsdoc\tpedantic\t\t🚧
require-returns-description\tjsdoc\tpedantic\t\t
require-returns-type\tjsdoc\tpedantic\t\t
require-test-timeout\tvitest\trestriction\t\t
require-to-throw-message\tjest\tcorrectness\t\t
require-to-throw-message\tvitest\tcorrectness\t\t
require-top-level-describe\tjest\tstyle\t\t
require-top-level-describe\tvitest\tstyle\t\t
require-typed-ref\tvue\tstyle\t\t
require-unicode-regexp\teslint\tpedantic\t\t🚧
require-yield\teslint\tcorrectness\t✅\t
require-yields\tjsdoc\tcorrectness\t\t
restrict-plus-operands💭\ttypescript\tpedantic\t\t
restrict-template-expressions💭\ttypescript\tcorrectness\t✅\t
return-await💭\ttypescript\tpedantic\t\t🛠️ 💡
return-in-computed-property\tvue\tcorrectness\t\t
role-has-required-aria-props\tjsx-a11y\tcorrectness\t\t
role-supports-aria-props\tjsx-a11y\tcorrectness\t\t
rules-of-hooks\treact\tpedantic\t\t
scope\tjsx-a11y\tcorrectness\t\t🛠️
self-closing-comp\treact\tstyle\t\t🛠️
sort-imports\teslint\tstyle\t\t🛠️
sort-keys\teslint\tstyle\t\t🛠️
sort-vars\teslint\tpedantic\t\t🚧
spec-only\tpromise\trestriction\t\t
state-in-constructor\treact\tstyle\t\t
strict-boolean-expressions💭\ttypescript\tpedantic\t\t🚧
strict-void-return💭\ttypescript\tpedantic\t\t
style-prop-object\treact\tsuspicious\t\t
switch-case-braces\tunicorn\tstyle\t\t🛠️
switch-case-break-position\tunicorn\tstyle\t\t🚧
switch-exhaustiveness-check💭\ttypescript\tpedantic\t\t💡
symbol-description\teslint\tpedantic\t\t
tabindex-no-positive\tjsx-a11y\tcorrectness\t\t⚠️ 💡
text-encoding-identifier-case\tunicorn\tstyle\t\t🛠️
throw-new-error\tunicorn\tstyle\t\t🛠️
triple-slash-reference\ttypescript\tcorrectness\t✅\t
unambiguous\timport\trestriction\t\t
unbound-method💭\ttypescript\tcorrectness\t✅\t
unicode-bom\teslint\trestriction\t\t🛠️
unified-signatures\ttypescript\tstyle\t\t
uninvoked-array-callback\toxc\tcorrectness\t✅\t
use-isnan\teslint\tcorrectness\t✅\t🛠️
use-unknown-in-catch-callback-variable💭\ttypescript\trestriction\t\t💡
valid-define-emits\tvue\tcorrectness\t\t🚧
valid-define-props\tvue\tcorrectness\t\t🚧
valid-describe-callback\tjest\tcorrectness\t\t
valid-describe-callback\tvitest\tcorrectness\t\t
valid-expect\tjest\tcorrectness\t\t💡
valid-expect\tvitest\tcorrectness\t\t💡
valid-expect-in-promise\tjest\tcorrectness\t\t
valid-expect-in-promise\tvitest\tcorrectness\t\t
valid-params\tpromise\tcorrectness\t\t
valid-title\tjest\tcorrectness\t\t🛠️
valid-title\tvitest\tcorrectness\t\t🛠️
valid-typeof\teslint\tcorrectness\t✅\t🛠️
vars-on-top\teslint\tstyle\t\t
void-dom-elements-no-children\treact\tcorrectness\t\t
warn-todo\tvitest\tcorrectness\t\t
yoda\teslint\tstyle\t\t🛠️
`

export function oxlintOfficialRuleset(): Set<string> {
	return new Set(
		RAW_OXLINT_RULE_TABLE.trim()
			.split("\n")
			.filter((line) => line.trim() !== "")
			.map((line) => line.split("\t"))
			.map(([cell1, cell2]) => `${cell2}/${cell1}`)
			.map(normaliseOxlintRule)
			.filter(isAcceptedOxlintRule),
	)
}
