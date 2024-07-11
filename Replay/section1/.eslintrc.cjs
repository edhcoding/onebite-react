module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react/jsx-no-target-blank": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "no-unused-vars": "off", // 코드상에 실제로 사용하지 않는 변수가 있다면 오류로 알려줌
    "react/prop-types": "off", // 안전한 코드를 만들어 줌 (위 아래 둘다 실습할때 불필요한 오류들이 나와서 꺼준거뿐임)
    "react-refresh/only-export-components": "off",
  },
};
