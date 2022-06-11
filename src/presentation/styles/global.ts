import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    html,
    body {
        padding: 0;
        margin: 0;
        font-family: 'Poiret One', cursive, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
            Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        color: #F2F3D9;
    }

    a {
        color: inherit;
        text-decoration: none;
        color: #F92A82;
    }

    * {
        box-sizing: border-box;
    }
`;

export const theme = {
    russianViolet: "#190E4F",
    oxfordBlue: "#03012C",
    rust: "#A44200",
    bronze: "#D58936",
    bloodRed: "#69140E",
    beige: "#F2F3D9",
    silverMetallic: "#9DA2AB",
    rose: "#F92A82",
    lightGreen: "#45e5b7",
};

export type Theme = typeof theme;
