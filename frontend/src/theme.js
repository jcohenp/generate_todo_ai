// frontend/src/theme.js
import { createGlobalStyle } from 'styled-components';

export const darkTheme = {
  body: '#181818',
  text: '#FAFAFA',
  navbarBg: '#333333',
  textHover: '#FFD700',
};

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
  }
`;
