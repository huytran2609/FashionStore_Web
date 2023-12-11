/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        fontFamily: { poppins: ['Poppins', 'ui-sans-serif'] },
        extend: {
            width: {},
            backgroundColor: {},
            colors: {
                linearBG: "hsla(11, 82%, 87%, 1)",
            },
        },
    },
    plugins: [],
};
