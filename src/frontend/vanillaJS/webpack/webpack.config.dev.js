module.exports = {
  mode: "development",
  entry: "./src/frontend/vanillaJS/scripts/index.js",
  output: {
    path: `${process.cwd()}/public`,
    filename: 'dist.js',
  },
};