import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import daisy from "daisyui";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [daisy],
  daisyui: {
    themes: ["lofi"],
  },
} satisfies Config;
