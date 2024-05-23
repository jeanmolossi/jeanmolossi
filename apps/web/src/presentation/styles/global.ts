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

    // v2 theme
    aqueBlue: '#04b4e0',
    lightGray: '#aaabab',
    gray: '#454445',
    darkGray: '#222323',
    grafitiWhite: '#f5f5f5',

    dimensions: {
        maxWidth: '1024px',

        smartphone: '430px',
        landscape: '768px',
        tablet: '1024px',
        desktop: '1440px'
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

export const socialColors = {
    github: '#000000',
    twitter: '#348bc4',
    linkedin: '#0b66c3',
    youtube: '#fe0001',
    telegram: '#2da5df',
    instagram: '#d73161',
} as const;
