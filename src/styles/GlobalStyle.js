import { createGlobalStyle } from 'styled-components';

import { globalCSS } from './Global';
import { typographyCSS } from './Typography';

export const GlobalStyle = createGlobalStyle`
  ${() => globalCSS}
  ${() => typographyCSS}
`;
