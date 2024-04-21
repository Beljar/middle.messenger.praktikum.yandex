import { resolve } from 'path';
import { defineConfig } from 'vite';

//import handlebars from "vite-plugin-handlebars";
import handlebars from './src/vite-plugin-handlebars-precompile';

export default defineConfig({
  root: resolve(__dirname),
  base: './assets',
  server: {
    port: 3000,
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      pages: resolve(__dirname, './src/pages'),
      partials: resolve(__dirname, './src/partials'),
      stores: resolve(__dirname, './src/stores'),
      shared: resolve(__dirname, './src/shared'),
      constants: resolve(__dirname, './src/constants'),
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
