import { resolve } from "path";
import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";

const sourceDirectory = resolve(__dirname, "src");

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: sourceDirectory,
      reloadOnPartialChange: false,
    }),
  ],
});
