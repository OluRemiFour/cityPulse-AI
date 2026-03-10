import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");

  // In production, point to the deployed backend URL
  // Set VITE_API_URL in your hosting platform env vars
  const backendTarget = env.VITE_API_URL || "http://localhost:4000";

  return {
    plugins: [react(), tailwindcss()],
    define: {
      "process.env.GEMINI_API_KEY": JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
    server: {
      proxy: {
        "/api": {
          target: backendTarget,
          changeOrigin: true,
          // Helpful for debugging proxy issues:
          configure: (proxy) => {
            proxy.on("error", (err) => {
              console.error("[vite proxy error]", err.message);
            });
          },
        },
      },
      hmr: process.env.DISABLE_HMR !== "true",
    },
    build: {
      outDir: "dist",
      sourcemap: true,
    },
  };
});
