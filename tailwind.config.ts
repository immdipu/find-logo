import type { Config } from "tailwindcss";

const config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      height: {
        "25": "5.625rem",
      },
      width: {
        "332": "83.125rem",
      },
      maxWidth: {
        "332": "83.125rem",
      },
      textColor: {
        faintblue: "var(--faint-blue)",
        lightblue: "var(--light-blue)",
        blue: "var(--blue)",
        grey: "var(--grey)",
        dogerblue: "var(--dodger-blue)",
      },
      backgroundColor: {
        lightblue: "var(--light-blue)",
        blue: "var(--blue)",
        dodgerblue: "var(--dodger-blue)",
        hardblue: "var(--hard-blue)",
        darkblue: "var(--dark-blue)",
        extradarkblue: "var(--extra-dark-blue)",
        grey: "var(--grey)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
