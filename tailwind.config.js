const argv = require("yargs-parser")(process.argv.slice(2));
const mode = argv.mode || "development";
const isProd = mode === "production";

module.exports = {
  purge: {
    enabled: isProd,
    content: ["./src/**/*.tsx"]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
