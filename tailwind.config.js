const { max } = require("d3");

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			cyan1: '#18CCFC',
  			blue1: '#6344F5',
  			color1: '#A9C9FF',
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
  			}
  		},
  		backgroundImage: {
  			'profile-gradient': 'linear-gradient(120deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));',
  			gradient2: 'linear-gradient(120deg, #FC466B 0%, #3F5EFB 100%);'
  		},
  		keyframes: {
  			'rotate-x': {
  				'0%': {
  					transform: 'rotateX(0deg)'
  				},
  				'100%': {
  					transform: 'rotateX(360deg)'
  				}
  			},
  			blink: {
  				'0%, 100%': {
  					opacity: 1
  				},
  				'50%': {
  					opacity: 0.75
  				}
  			}
  		},
  		animation: {
  			'rotate-x': 'rotate-x 2s linear infinite',
  			blink: 'blink 1s ease-in-out infinite'
  		},
  		fontFamily: {
  			serif: [
  				'Crimson Text',
  				'serif'
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	},
  	screens: {
  		sm: {
  			min: '300px',
  			max: '767px'
  		},
  		md: {
  			min: '768px',
  			max: '1279px'
  		},
  		lg: {
  			min: '1280px',
  			max: '1680px'
  		},
  		xl: {
  			min: '1681px',
  			max: '2800px'
  		},
  		xxl: {
  			min: '3000px'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
