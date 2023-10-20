import { css } from 'styled-components';
import { colors } from '../utils/variables';

export const globalCSS = css`
  body,
  html {
    margin: 0;
    height: 100vh;
    font-size: 1rem;
    background-color: ${colors.theme.gray};
  }

  #root {
    height: 100vh;
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
