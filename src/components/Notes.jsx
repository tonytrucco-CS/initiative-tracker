import styled from 'styled-components';
import { breakpoints, colors, fonts } from '../utils/variables';
import { transparentize } from 'polished';
import PropTypes from 'prop-types';
import { IconButton, Tooltip } from '@mui/material';
import { Close } from '@mui/icons-material';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
  flex: 1;

  @media only screen and (max-width: ${breakpoints.sm}) {
    width: 100%;
    padding: 0.5em;
  }
`;

const H2 = styled.h2`
  margin: 0;
  padding: 0;
  color: ${colors.theme.light_gray};

  @media only screen and (max-width: ${breakpoints.md}) {
    font-size: 1rem;
  }
`;

const TextArea = styled.textarea`
  height: calc(100dvh - 3.7em);
  line-height: 1.5;
  font-size: 1.25rem;
  font-family: ${fonts.body};
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${transparentize(0.75, colors.white)};
  color: ${colors.pure_white};
  transition: box-shadow 0.3s;
  width: 100%;
  min-width: 30em;
  height: 100%;
  resize: none;

  @media only screen and (max-width: ${breakpoints.md}) {
    min-width: 20em;
  }

  @media only screen and (max-width: ${breakpoints.sm}) {
    min-width: auto;
    width: 100%;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${transparentize(0.5, colors.white)};
  }

  @media only screen and (max-width: ${breakpoints.md}) {
    font-size: 1.5rem;
  }
`;

const Flex = styled.div`
  align-items: center;
  justify-content: space-between;
  width: 100%;
  display: flex;
`;

const Notes = ({ toggleDrawer }) => {
  return (
    <Div>
      <Flex>
        <H2>Notes</H2>
        <Tooltip title="Close Notes Drawer" enterDelay={750}>
          <IconButton
            aria-label="Close Notes Drawer"
            onClick={() => toggleDrawer(false)}
          >
            <Close />
          </IconButton>
        </Tooltip>
      </Flex>
      <TextArea name="Notes" />
    </Div>
  );
};

export default Notes;

Notes.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
};
