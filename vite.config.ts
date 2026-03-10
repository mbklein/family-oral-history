/** @type {import('vite').UserConfig} */
import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "node:path";

const LocalCloverAliases = {
  react: path.resolve("./node_modules/react"),
  "react-dom": path.resolve("./node_modules/react-dom")
};

const config: UserConfig = {
  build: {
    sourcemap: true,
    chunkSizeWarningLimit: 2048
  },
  css: { devSourcemap: true },
  plugins: [react()],
  resolve: {
    alias: process.env.USE_LOCAL_CLOVER ? LocalCloverAliases : {}
  },
  optimizeDeps: {
    exclude: ["@samvera/clover-iiif"],
    include: [
      "@samvera/clover-iiif > openseadragon",
      "@samvera/clover-iiif > react-i18next",
      "@samvera/clover-iiif > i18next",
      "@samvera/clover-iiif > i18next-browser-languagedetector"
    ]
  },
  server: {
    allowedHosts: true
  }
};

export default defineConfig(config);
