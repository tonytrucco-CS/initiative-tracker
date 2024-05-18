import { css } from 'styled-components';
import { colors } from '../utils/variables';

export const globalCSS = css`
  body,
  html {
    margin: 0;
    height: 100dvh;
    font-size: 1rem;
    background-color: ${colors.theme.gray};
  }

  #root {
    height: 100dvh;
    display: flex;
    flex-direction: column;
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

  *::-webkit-scrollbar {
    width: 0.5em;
  }

  *::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 0.25em;
    border: solid 2px rgba(0, 0, 0, 0);
  }
`;
