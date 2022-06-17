import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    html,
    body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
            Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;

        color: #F2F3D9;
        background: black;
    }

    a {
        text-decoration: none;
        color: #45e5b7;
        font-weight: 500;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-family: 'Poiret One', cursive;
        font-weight: 600;
        color: #D58936;
    }

    p {
        line-height: 1.5rem;
        font-family: inherit;
    }

    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        scroll-behavior: smooth;
    }
`;

export const theme = {
    russianViolet: '#190E4F',
    oxfordBlue: '#03012C',
    rust: '#A44200',
    bronze: '#D58936',
    bloodRed: '#69140E',
    beige: '#F2F3D9',
    silverMetallic: '#9DA2AB',
    rose: '#F92A82',
    lightGreen: '#45e5b7',

    mediumAquamarine: '#47E5BC',
    blackChocolate: '#131200',
    royalPurple: '#7D5BA6',
    outrageousOrange: '#FC7753',
    ghostWhite: '#E8E9F3',

    dimensions: {
        maxWidth: '1024px',
    },

    gutter: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '2rem',
        xl: '4rem',
        xxl: '8rem',
    },

    radii: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '2rem',
        xl: '4rem',
        full: '9999px',
    },
};

export type Theme = typeof theme;
