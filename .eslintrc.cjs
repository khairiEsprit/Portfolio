module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: ["next/core-web-vitals"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: { version: "18.2" },
  },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": "warn",
    "react/no-unescaped-entities": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "no-unused-vars": "off",
  },
};
