import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),

  {
    files: ["**/*.{js,jsx}"],

    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],

    languageOptions: {
      globals: globals.browser,

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    rules: {
      /**
       * We intentionally synchronize React state with
       * external systems such as Firebase Auth and
       * Firestore listeners inside useEffect.
       *
       * This rule produces false positives for those
       * valid synchronization patterns.
       */
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);
