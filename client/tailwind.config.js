/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        fontFamily: { poppins: ['Poppins', 'ui-sans-serif'] },
        extend: {
            width: {},
            backgroundColor: {},
            colors: {
                linearBG: 'hsla(11, 82%, 87%, 1)',
            },
            keyframes: {
                'scale-up-center': {
                    '0%': {
                        '-webkit-transform': 'scale(0.5)',
                        transform: 'scale(0.5)',
                    },
                    '100%': {
                        '-webkit-transform': 'scale(1)',
                        transform: 'scale(1)',
                    },
                },
            },
            animation: {
                'scale-up-center': 'scale-up-center 0.3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;',
            },
        },
    },
    plugins: [],
};
