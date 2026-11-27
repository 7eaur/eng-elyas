import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync } from "node:fs";

// Serve the same real HTML to visitors and search crawlers; no bot-only rendering.
const staticPortfolio = () => ({
  name: "static-portfolio-html",
  transformIndexHtml: {
    order: "pre",
    handler(html) {
      const page = readFileSync(new URL("./src/home.html", import.meta.url), "utf8");
      return html.replace('<div id="root"></div>', () => `<div id="root"><div>${page}</div></div>`);
    },
  },
});

export default defineConfig({
  build: {
    target: "esnext",
    outDir: "dist",
  },
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
    warmup: {
      clientFiles: ["./src/main.jsx"],
    },
  },
  plugins: [staticPortfolio(), react()],
});
