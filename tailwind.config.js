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
        purple: "#7c3aed",
        "purple-light": "#a78bfa",
        cyan: "#22d3ee",
        black: "#16161d",
        green: "#00ff88",
      },
      white: "#ffffff",
    },
  },
};

export const darkMode = "class";
export const plugins = [heroui()];
