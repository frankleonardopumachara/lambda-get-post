const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./src/index.ts", // Punto de entrada de tu función
  target: "node", // Compila para Node.js
  externals: [nodeExternals()], // Excluye node_modules
  module: {
    rules: [
      {
        test: /\.ts$/, // Compila archivos TypeScript
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"], // Resuelve extensiones .ts y .js
  },
  output: {
    filename: "index.js", // Nombre del archivo de salida
    path: path.resolve(__dirname, "dist"), // Carpeta de salida
    libraryTarget: "commonjs2", // Formato del módulo
  },
};
