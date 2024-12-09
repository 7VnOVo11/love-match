import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F46E5',
          light: '#6366f1',
          dark: '#3730a3',
        },
        secondary: {
          DEFAULT: '#fb7185',
          light: '#fda4af',
          dark: '#f43f5e',
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      spacing: {
        'section-sm': '64px',
        'section-md': '96px',
        'section-lg': '128px',
      },
      boxShadow: {
        'apple': '0 4px 12px rgba(0, 0, 0, 0.08), 0 0 2px rgba(0, 0, 0, 0.04)',
        'apple-hover': '0 8px 24px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
} satisfies Config;
