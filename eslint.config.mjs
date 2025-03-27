import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import('eslint').Linter.FlatConfig[]} */
const eslintConfig = [
  js.configs.recommended,
  ...compat.extends(
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:tailwindcss/recommended",
    "prettier"
  ),
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: compat.config.parser["@typescript-eslint/parser"],
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      // React rules
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-curly-brace-presence": ["error", { props: "never", children: "never" }],
      
      // TypeScript rules
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      
      // Import rules
      "import/prefer-default-export": "off",
      
      // General rules
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-unused-vars": "off",
      "prefer-const": "error",
      "no-duplicate-imports": "error",
      
      // Tailwind rules
      "tailwindcss/no-custom-classname": "warn",
      "tailwindcss/enforces-negative-arbitrary-values": "warn",
      
      // Next.js rules
      "@next/next/no-html-link-for-pages": "error",
    },
  },
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/out/**",
      "**/public/**",
      "**/*.config.js",
      "**/*.config.mjs",
    ],
  },
];

export default eslintConfig;
