
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#4A9DD6',
					foreground: '#FFFFFF',
					50: '#EFF8FF',
					100: '#D6EBFA',
					200: '#A8D7F5',
					300: '#7ABFEF',
					400: '#4CA6E8',
					500: '#4A9DD6',
					600: '#3B7AB0',
					700: '#2D5884',
					800: '#1F3A59',
					900: '#101D2D'
				},
				secondary: {
					DEFAULT: '#5ECDB6',
					foreground: '#FFFFFF',
					50: '#EEFBF8',
					100: '#D4F5ED',
					200: '#A9EBDC',
					300: '#7EE0CB',
					400: '#5ECDB6',
					500: '#3CAE99',
					600: '#2E8C7A',
					700: '#21695C',
					800: '#15473D',
					900: '#08231F'
				},
				accent: {
					DEFAULT: '#FF9D6E',
					foreground: '#FFFFFF',
					50: '#FFF5F0',
					100: '#FFEADC',
					200: '#FFD5B8',
					300: '#FFBF95',
					400: '#FFAA71',
					500: '#FF9D6E',
					600: '#FF7A35',
					700: '#FF570D',
					800: '#E34400',
					900: '#AA3300'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'bounce-slow': {
					'0%, 100%': {
						transform: 'translateY(0)',
					},
					'50%': {
						transform: 'translateY(-5px)',
					},
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'bounce-slow': 'bounce-slow 3s ease-in-out infinite',
				'fade-in': 'fade-in 0.5s ease-out'
			},
			fontFamily: {
				sans: ['Nunito', 'sans-serif'],
				display: ['Montserrat', 'sans-serif']
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
