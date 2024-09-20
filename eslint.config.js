// @ts-check

import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh";
import { fixupPluginRules } from "@eslint/compat";
import tseslint from "typescript-eslint";

// Flat Config (ESLint v9+)
export default tseslint.config(
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}"],
  },
  {
    ignores: ["dist", ".eslintrc.cjs"],
  },
  {
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      react: pluginReact,
      "react-hooks": fixupPluginRules(pluginReactHooks),
      "react-refresh": pluginReactRefresh,
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser, // globalThis, window, console, alert, ...
        ...globals.node, // global, process, ...
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
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
  }
);
