/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', "cursive"],
        body: ["VT323", "monospace"],
        orbitron: ["var(--font-orbitron)"],
        "press-start-2p": ["var(--font-press-start-2p)", "cursive"],
      },
      animation: {
        "bounce-slow": "bounce 3s infinite",
        twinkle: "twinkle 4s infinite",
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s infinite alternate",
      },
      keyframes: {
        twinkle: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": {
            boxShadow: "0 0 10px #ff0080, 0 0 20px #ff0080",
          },
          "100%": {
            boxShadow: "0 0 20px #00ffff, 0 0 30px #00ffff",
          },
        },
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        neonPink: "#ff0080",
        neonBlue: "#00ffff",
        neonYellow: "#ffdd00",
        neonGreen: "#00ff00",
        neonPurple: "#ae00ff",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1.5rem",
        "2xl": "2rem",
      },
      boxShadow: {
        neon: "0 0 15px #ff0080, 0 0 30px #00ffff",
        "neon-hover": "0 0 20px #ff0080, 0 0 40px #00ffff",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
