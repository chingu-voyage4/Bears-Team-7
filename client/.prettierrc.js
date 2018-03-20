// .prettierrc.js

module.exports = {
  overrides: [
    {
      files: "*.js",
      options: {
        printWidth: 80,
        parser: "flow",
        singleQuote: true,
        trailingComma: "all",
        arrowParens: "always"
      }
    }
  ]
};
