import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Nunito&family=Roboto:wght@500;700&display=swap');

    :root{
        --black-100: #161616;
        --gray-100: #ccc;
        --yellow-100: #FFD166;
        --yellow-200: #FDE1A0;
        --red-100: #EF476F;
        --green-100: #06D6A0;

        /* 14.00px → 16.00px */
        --fs-100: clamp(0.875rem, 0.8315rem + 0.2174vw, 1rem);
        /* 16.00px → 18.00px */
        --fs-200: clamp(1rem, 0.9565rem + 0.2174vw, 1.125rem);
        /* 18.00px → 24.00px */
        --fs-300: clamp(1.125rem, 0.9946rem + 0.6522vw, 1.5rem);
        /* 24.00px → 32.00px */
        --fs-400: clamp(1.5rem, 1.3261rem + 0.8696vw, 2rem);
    }

    *,*::before,*::after{
        box-sizing: border-box;
    }

    body{
        font-family: 'Nunito', 'Arial',sans-serif;
        background: var(--yellow-200);
        margin: 0;
    }

    h1,
    h2,
    h3{
        font-family: 'Roboto','Arial',sans-serif;
    }

    h1{
        font-size: var(--fs-300);
        text-transform: uppercase;
        letter-spacing: 2px;
        margin: 0;
    }

    h2{
        font-size: var(--fs-300);
        font-weight: 700;
    }

    h3{
        font-size: var(--fs-200);
        font-weight: 500;
    }

    a{
        display: block;
        text-decoration: none;
        color: var(--black-100);
    }

    button{
        background: transparent;
        border: none;
    }
`;

export default GlobalStyles;
