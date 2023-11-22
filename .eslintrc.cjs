/** @type import("eslint").Linter.Config */
const config = {
  extends: "@abelflopes/eslint-config-tsr-pro",
  rules: {
    "react/prop-types": 0,
    "react/react-in-jsx-scope": 0,
    "no-null": 0,
  },
};

module.exports = config;
