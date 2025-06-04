import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export const content = [
  "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  "./src/**/*.{js,ts,jsx,tsx}",
];

export const theme = {
  extend: {
    colors: {
      my: {
        purple: "#4b0082",
        cyan: "#00ffff",
        black: "#1c1c1c",
        green: "#00ff88",
      },
      white: "#ffffff",
    },
  },
};

export const darkMode = "class";
export const plugins = [heroui()];
