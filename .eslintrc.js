/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:tailwindcss/recommended",
    "prettier", // Must be last to override other configs
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["@typescript-eslint", "react", "tailwindcss"],
  settings: {
    react: {
      version: "detect",
    },
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
    "no-unused-vars": "off", // Using TypeScript's checker instead
    "prefer-const": "error",
    "no-duplicate-imports": "error",
    
    // Tailwind rules
    "tailwindcss/no-custom-classname": "warn",
    "tailwindcss/enforces-negative-arbitrary-values": "warn",
    
    // Next.js rules
    "@next/next/no-html-link-for-pages": "error",
  },
  ignorePatterns: [
    "node_modules/",
    ".next/",
    "out/",
    "public/",
    "**/*.config.js",
    "**/*.config.mjs",
  ],
}
