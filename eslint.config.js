import globals from "globals";
import parser from "@typescript-eslint/parser";
import pluginJs from "@eslint/js";
import pluginTs from "@typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh";

// Flat Config (ESLint v9+)
export default [
  {
    root: true,
    env: { browser: true, es2020: true },
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}"],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
  },
  {
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      "react-refresh": pluginReactRefresh,
    },
  },
  {
    languageOptions: {
      parser,
      globals: {
        ...globals.browser, // globalThis, window, console, alert, ...
        ...globals.node, // global, process, ...
      },
    },
  },
  pluginJs.configs.recommended,
  pluginTs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          args: "after-used",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
];
