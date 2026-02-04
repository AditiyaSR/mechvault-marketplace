import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
    darkMode: "class",
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
        extend: {
                colors: {
                        background: 'hsl(var(--background))',
                        foreground: 'hsl(var(--foreground))',
                        card: {
                                DEFAULT: 'hsl(var(--card))',
                                foreground: 'hsl(var(--card-foreground))'
                        },
                        popover: {
                                DEFAULT: 'hsl(var(--popover))',
                                foreground: 'hsl(var(--popover-foreground))'
                        },
                        primary: {
                                DEFAULT: 'hsl(var(--primary))',
                                foreground: 'hsl(var(--primary-foreground))'
                        },
                        secondary: {
                                DEFAULT: 'hsl(var(--secondary))',
                                foreground: 'hsl(var(--secondary-foreground))'
                        },
                        muted: {
                                DEFAULT: 'hsl(var(--muted))',
                                foreground: 'hsl(var(--muted-foreground))'
                        },
                        accent: {
                                DEFAULT: 'hsl(var(--accent))',
                                foreground: 'hsl(var(--accent-foreground))'
                        },
                        destructive: {
                                DEFAULT: 'hsl(var(--destructive))',
                                foreground: 'hsl(var(--destructive-foreground))'
                        },
                        border: 'hsl(var(--border))',
                        input: 'hsl(var(--input))',
                        ring: 'hsl(var(--ring))',
                        chart: {
                                '1': 'hsl(var(--chart-1))',
                                '2': 'hsl(var(--chart-2))',
                                '3': 'hsl(var(--chart-3))',
                                '4': 'hsl(var(--chart-4))',
                                '5': 'hsl(var(--chart-5))'
                        },
                        brand: {
                                industrial: '#0F172A',
                                'industrial-light': '#1E293B',
                                'industrial-lighter': '#334155',
                                orange: '#F97316',
                                'orange-light': '#FB923C',
                                'orange-dark': '#EA580C',
                                'orange-darker': '#C2410C',
                                blue: '#0284C7',
                                'blue-light': '#38BDF8',
                                'blue-dark': '#0369A1',
                                gradient: {
                                        start: '#0F172A',
                                        mid: '#0F4C81',
                                        end: '#F97316'
                                }
                        },
                        gradients: {
                                'brand-blue': 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 50%, #0284C7 100%)',
                                'brand-orange': 'linear-gradient(135deg, #F97316 0%, #FB923C 50%, #FDBA74 100%)',
                                'brand-mix': 'linear-gradient(135deg, #0F172A 0%, #0F4C81 40%, #F97316 100%)',
                                'premium-blue': 'linear-gradient(180deg, #0F172A 0%, #1E293B 100%)',
                                'premium-orange': 'linear-gradient(180deg, #F97316 0%, #EA580C 100%)'
                        }
                },
                borderRadius: {
                        lg: 'var(--radius)',
                        md: 'calc(var(--radius) - 2px)',
                        sm: 'calc(var(--radius) - 4px)'
                }
        }
  },
  plugins: [tailwindcssAnimate],
};
export default config;
