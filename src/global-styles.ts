import { createGlobalStyle } from 'styled-components';

interface ThemeInterface {
  theme: {
    body: string;
    text: string;
    primaryColor: string;
    secondaryColor: string;
    toggleBackground: string;
    gnbBar: string;
    gnbIconDefault: string;
    gnbIconAcive: string;
  };
}

export const GlobalStyle = createGlobalStyle<ThemeInterface>`
    * {
        box-sizing: border-box;
    }
    body {
        font-family: 'NanumSquare', sans-serif;
        background: ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.text};
        transition: all 0.5s ease-in-out;
    }
    button {
        background: none;
        cursor: pointer;
        border: none;
        outline: none;
        transition: all 0.5s ease-in-out;
    }
    ol, ul, li {
        list-style: none;
    }
    a {
        text-decoration: none;
        cursor: pointer;
    }
    img {
        width: 100%;
        height: 100%;
    }
`;