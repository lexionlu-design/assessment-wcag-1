module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      white: 'white',
      black: 'black',
      blue: {
        lighter: '#67A9FF',
        light: '#0F3244',
        default: '#0F2D3C',
        dark: '#08202D',
      },
      brown: {
        lighter: '#7C716A',
        light: '#7E7267',
        default: '#4E463F',
        dark: '#413B37',
        darker: '#794425',
        darkest: '#372828',
      },
      gray: {
        light: '#87969D',
        default: '#767676',
        dark: '#6E7378',
      },
      green: {
        light: '#A1FF3D',
        default: '#2D7A00',
        dark: '#5A7775',
      },
      orange: {
        default: '#936934',
        dark: '#A0614C',
        darker: '#B3A05F'
      },
      purple: {
        light: '#FDEFFF',
        default: '#48324F',
        dark: '#3B2641',
      },
      red: {
        light: '#FF6565',
        default: '#E02020',
        dark: '#AD0020',
        darker: '#9F554C',
        darkest: '#BB2F2F',
      },
      yellow: {
        lightest: '#FFF8F2',
        lighter: '#F7EAE1',
        light: '#E1D3CA',
        default: '#F9C78B',
        dark: '#B08061',
        darkest: '#FFB554'
      },
      transparent: 'transparent',
      current: 'currentColor'
    },
    fontFamily: {
      'montserrat': ['Montserrat', 'Noto Sans TC', 'Microsoft JhengHei', 'SF Pro TC', 'sans-serif']
    },
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-10deg)' },
          '50%': { transform: 'rotate(50deg)' },
        }
      },
      animation: {
        'wiggle': 'wiggle 2s linear infinite',
      },
      transitionDelay: {
        '3000': '3000ms',
      },
      listStyleType: {
        alpha: "upper-alpha",
      },
      boxShadow: {
        'outline': '0 0 0 2px rgba(0,122,255,1)'
      },
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      container: {
        center: true,
        padding: {
          default: '0.75rem',
          lg: '1.5rem',
        },
      },
      inset: {
        full: '100%',
        '-full': '-100%',
        '1/2': `${100 * (1 / 2)}%`,
        '1/3': `${100 * (1 / 3)}%`,
        '1/4': `${100 * (1 / 4)}%`,
        '1/5': `${100 * (1 / 5)}%`,
        '1/6': `${100 * (1 / 6)}%`,
        '1/10': `${100 * (1 / 10)}%`,
      },
      maxHeight: {
        '3/4': '75%',
      },
      maxWidth: {
        'hd': '1920px',
      },
      minWidth: {
        '10': '2.5rem',
      },
      opacity: {
        '80': '0.8',
        '90': '0.9',
      },
      rotate: {
        '-30': '-30deg',
        '30': '30deg',
      },
      screens: {
        '2xl': '1366px',
      },
      scale: {
        '-1': '-1'
      },
      height: {
        'screen-9/10': '90vh',
        'screen-1/2': '50vh',
        'screen-1/3': `${100 * (1 / 3)}vh`,
        'screen-2/3': `${100 * (2 / 3)}vh`,
      },
      width: {
        '3xfull': '300%'
      },
      zIndex: {
        '-1': '-1',
        '100': '100'
      },
      spacing: {
        '2px': '2px',
        '1/2': '50%',
        '1/3': `${100 * (1 / 3)}%`,
        '1/4': `${100 * (1 / 4)}%`,
        '1/6': `${100 * (1 / 6)}%`,
        '3/4': `${100 * (3 / 4)}%`,
        '14': '3.5rem',
        '72': '18rem',
        '80': '20rem',
        '96': '24rem',
        '104': '26rem',
      },
      letterSpacing: {
        'widest-2': '0.2rem',
        'widest-3': '0.3rem',
        'widest-4': '0.4rem',
        'widest-6': '0.6rem',
      },
      translate: {
        '-1/4': `${-100 * (1 / 4)}%`,
        '-2/4': `${-100 * (2 / 4)}%`,
        '-3/4': `${-100 * (3 / 4)}%`,
        '1/4': `${100 * (1 / 4)}%`,
        '2/4': `${100 * (2 / 4)}%`,
        '3/4': `${100 * (3 / 4)}%`,
      },
    }
  },
  variants: {
    display: ['responsive', 'hover', 'focus', 'group-hover', 'group-focus', 'focus-within'],
    borderColor: ['responsive', 'hover', 'focus', 'group-hover', 'group-focus', 'focus-within'],
    textColor: ['responsive', 'hover', 'focus', 'group-hover', 'group-focus', 'focus-within'],
    backgroundColor: ['responsive', 'hover', 'focus', 'group-hover', 'group-focus', 'focus-within'],
    width: ['responsive', 'focus'],
    textDecoration: ['hover', 'focus', 'group-hover', 'group-focus', 'focus-within'],
    scale: ['group-hover'],
    opacity: ['responsive', 'group-hover'],
    borderRadius: ['first', 'last', 'responsive']
  },
  plugins: [],
}
