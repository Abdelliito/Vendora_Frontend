/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#2563EB',
                    dark: '#1D4ED8',
                    deep: '#1E3A8A',
                    light: '#DBEAFE',
                },
                accent: {
                    DEFAULT: '#F97316',
                    dark: '#EA580C',
                },
                dark: '#0F172A',
                mid: '#64748B',
                light: '#F1F5F9',
                danger: '#EF4444',
            },
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
                inter: ['DM Sans', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
