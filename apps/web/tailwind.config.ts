import type { Config } from "tailwindcss";
import sharedConfig from "@travel/tailwind-config";

const config: Config = {
  // All files that contain Tailwind classes across the monorepo
  content: [
    "./src/**/*.{ts,tsx}",
    // Include the UI package so purging works correctly
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  // Merge the shared preset — all tokens, animations, and plugins are inherited
  presets: [sharedConfig],
};

export default config;
