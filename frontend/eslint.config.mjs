import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import typeScriptEsLintPlugin from "@typescript-eslint/eslint-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: typeScriptEsLintPlugin.configs["recommended"],
});

const eslintConfig = [
    ...compat.extends(
        "next/core-web-vitals",
        "next/typescript",
        "eslint:recommended",
        "eslint:recommended-requiring-type-checking",
        "plugin:@typescript-eslint/strict",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
    ),
];

export default eslintConfig;
