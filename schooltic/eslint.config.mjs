import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    rules: {
      // Disable unescaped apostrophe errors
      "react/no-unescaped-entities": "off",

      // Disable unused vars (optional: you can use "warn" instead of "off")
      "@typescript-eslint/no-unused-vars": "off",

      // Disable Next.js <img> warning
      "@next/next/no-img-element": "off",

      // Disable any type
      "@typescript-eslint/no-explicit-any": "off",

      // Disable html link for pages
      "@next/next/no-html-link-for-pages": "off",
    }
  }
];

export default eslintConfig;
