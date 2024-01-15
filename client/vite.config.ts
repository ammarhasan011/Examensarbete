// Import necessary modules
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite configuration
// https://vitejs.dev/config/
export default defineConfig({
  // Server configuration
  server: {
    // Proxy configuration for API requests
    proxy: {
      "/api": {
        target: "http://localhost:3000", // Target URL for API
      },
    },
  },
  plugins: [react()],
});
