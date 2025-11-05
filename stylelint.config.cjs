module.exports = {
  extends: ["stylelint-config-standard", "stylelint-prettier/recommended"],
  rules: {
    "at-rule-no-unknown": [true, { "ignoreAtRules": [] }],
    "no-descending-specificity": null,
    "selector-class-pattern": "^[a-z0-9]+([_-]{1,2}[a-z0-9]+)*$"
  }
};
