import { defineConfig } from "vite";
import { resolve } from "path";
//import handlebars from "vite-plugin-handlebars";
import handlebars from "./src/vite-plugin-handlebars-precompile";

export default defineConfig({
  root: resolve(__dirname),
  build: {
    outDir: resolve(__dirname, "dist"),
  },
  resolve: {
    alias: {
      pages: resolve(__dirname, "./src/pages"),
      partials: resolve(__dirname, "./src/partials"),
      stores: resolve(__dirname, "./src/stores"),
      shared: resolve(__dirname, "./src/shared"),
    },
  },
  plugins: [
    handlebars(),
    /*     handlebars({
      partialDirectory: resolve(__dirname, "src/partials"),
      context: {
        username: "test",
      },
    }), */
  ],
});
