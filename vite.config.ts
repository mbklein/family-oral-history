/** @type {import('vite').UserConfig} */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  build: {
    sourcemap: true,
    chunkSizeWarningLimit: 2048
  },
  css: { devSourcemap: true },
  plugins: [react()],
  resolve: {
    alias: {
      "sanitize-html": "dompurify"
    }
  },
  optimizeDeps: {
    exclude: ["@samvera/clover-iiif"],
    include: [
      "debug",
      "extend",
      "node-webvtt",
      "openseadragon",
      "react-lazy-load-image-component",
      "void-elements"
    ]
  }
});
