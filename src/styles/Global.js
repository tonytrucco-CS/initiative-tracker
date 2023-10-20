import { css } from 'styled-components';
import { colors } from '../utils/variables';

export const globalCSS = css`
  body,
  html {
    margin: 0;
    height: 100%;
    font-size: 1rem;
    background-color: ${colors.white};
  }

  #root {
    height: 100%;
  }

  *,
  ::before,
  ::after {
    box-sizing: border-box;
  }

  hr {
    border-top: solid 1px ${colors.gray600};
    margin: 2rem 0;
  }

  a {
    &:hover {
      cursor: pointer;
    }
  }
`;
