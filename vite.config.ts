import { resolve } from "path";
import { defineConfig, loadEnv } from "vite";
import handlebars from "vite-plugin-handlebars";
import context from "./context";

const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");

export default ({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd()));

  return defineConfig({
    root,
    build: {
      outDir,
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: resolve(root, "index.html"),
          embed: resolve(root, "embed", "index.html"),
          "embed/minimal": resolve(root, "embed", "minimal", "index.html"),
        },
      },
    },
    plugins: [
      handlebars({
        partialDirectory: root,
        reloadOnPartialChange: false,
        context: {
          VITE_BASE_URL: process.env.VITE_BASE_URL || "/",
          VITE_UMAMI_SRC: process.env.VITE_UMAMI_SRC,
          VITE_UMAMI_DOMAINS: process.env.VITE_UMAMI_DOMAINS,
          VITE_UMAMI_WEBSITE_ID: process.env.VITE_UMAMI_WEBSITE_ID,
          ...context,
        },
      }),
    ],
  });
};
