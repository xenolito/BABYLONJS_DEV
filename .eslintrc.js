module.exports = {
  parser: "babel-eslint", // Specifies the ESLint parser
  extends: ["plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
  },
};
