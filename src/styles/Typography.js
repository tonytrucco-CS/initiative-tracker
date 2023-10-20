import { css } from 'styled-components';
import { fonts } from '../utils/variables';

export const typographyCSS = css`
  body {
    font-family: ${fonts.body};
  }

  h1,
  h2,
  h3 {
    font-family: ${fonts.heading};
  }
`;
