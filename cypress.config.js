import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173", // Ensure this matches your Vite dev server
    setupNodeEvents(on, config) {
      // Implement node event listeners here (optional)
    },
    chromeWebSecurity: false, // Allows non-secure connections (optional)
  },

  component: {
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
  },
});