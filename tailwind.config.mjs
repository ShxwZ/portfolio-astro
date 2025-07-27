/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			typography: (theme) => ({
				DEFAULT: {
					css: {
						'--tw-prose-body': 'var(--primary-color)',
						'--tw-prose-headings': 'var(--primary-color)',
						'--tw-prose-links': 'var(--color-violet-one)',
						'--tw-prose-bold': 'var(--primary-color)',
						'--tw-prose-counters': 'var(--primary-color)',
						'--tw-prose-bullets': 'var(--primary-color)',
						'--tw-prose-hr': 'var(--primary-color)',
						'--tw-prose-quotes': 'var(--primary-color)',
						'--tw-prose-quote-borders': 'var(--color-violet-one)',
						'--tw-prose-captions': 'var(--primary-color)',
						'--tw-prose-code': 'var(--primary-color)',
						'--tw-prose-pre-code': 'var(--primary-color)',
						'--tw-prose-pre-bg': 'rgb(31 41 55)',
						'--tw-prose-th-borders': 'var(--primary-color)',
						'--tw-prose-td-borders': 'var(--primary-color)',
						// Asegurar que las listas usen el color primario
						'ol': { color: 'var(--primary-color)' },
						'ul': { color: 'var(--primary-color)' },
						'li': { color: 'var(--primary-color)' },
					},
				},
				violet: {
					css: {
						'--tw-prose-links': 'var(--color-violet-one)',
						'--tw-prose-quote-borders': 'var(--color-violet-one)',
					},
				},
			}),
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
