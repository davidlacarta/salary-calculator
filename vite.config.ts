import { resolve } from "path";
import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";

export default defineConfig({
  server: { open: "/" },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, "src", "partials"),
    }),
  ],
});
