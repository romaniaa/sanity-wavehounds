const plugin = require('tailwindcss/plugin')

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./lib/**/*.js"
    ],
    theme: {
        extend: {
            colors: {
                'grey': '#808080',
                'dark-blue': '#1A1A2E',
                'med-blue': '#16213E',
                'blue': '#0F3460',
                'light-blue': '#A5D7E8',
                'red': '#E94560',
                'white': '#e0e7ff'
            },
            spacing: {
                '1/2':'50%',
                '0': '0',
                '1': '1px',
                '2': '2px',
                '3': '3px',
                '4': '4px',
                '5': '5px',
                '6': '6px',
                '7': '7px',
                '8': '8px',
                '9': '9px',
                '10': '10px',
                '12': '12px',
                '15': '15px',
                '16': '16px',
                '20': '20px',
                '24': '24px',
                '25': '25px',
                '30': '30px',
                '32': '32px',
                '35': '35px',
                '40': '40px',
                '45': '45px',
                '50': '50px',
                '55': '55px',
                '60': '60px',
                '64': '64px',
                '65': '65px',
                '70': '70px',
                '75': '75px',
                '80': '80px',
                '85': '85px',
                '90': '90px',
                '95': '95px',
                '100': '100px',
                '110': '110px',
                '120': '120px',
                '130': '130px',
                '140': '140px',
                '150': '150px',
                '155': '155px',
                '160': '160px',
                '170': '170px',
                '180': '180px',
                '190': '190px',
                '200': '200px',
                '230': '230px',
                '250': '250px'
            },
            screens: {
                mobile: '0px',
                tablet: '640px',
                laptop: '1024px',
                desktop: '1366px',
                large: '1920px',
                huge: '2400px'
            },
            borderRadius: {
                none: '0px',
                DEFAULT: '4px',
                full: '9999px',
            },
            fontFamily: {
                sans:'"Manrope", sans-serif;'
            }
        }
    },
    plugins: [
        plugin(function({ addVariant }) {
            addVariant("dark", ".dark &");
            addVariant("light", ".light &");
        })
    ],
}