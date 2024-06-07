/* eslint-disable react/display-name */
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { colors } from '../utils/variables';
import React, { useContext, useEffect, useRef } from 'react';
import InitiativeContext from '../context/InitiativeContext';
import { keyframes } from 'styled-components';
import { Stack } from '@mui/material';
import { ArrowRight } from '@mui/icons-material';

const Flex = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.$round !== undefined ? '2em 1fr' : '1fr'};
  grid-column-gap: 0.25rem;
  padding: 0;
  align-items: center;
  ${(props) => {
    if (props.$dragging === props.$index) {
      return css`
        background-color: ${colors.theme.gray};
      `;
    }
  }}
`;

const blinkAnim = keyframes`
  0% {opacity: 1}
  50% {opacity: 0}
  100% {opacity: 1}
`;

const Active = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.pure_white};
  animation-name: ${blinkAnim};
  animation-duration: 1s;
  animation-iteration-count: infinite;
`;

const Div = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Row = React.forwardRef(({ children, dragging, index }, ref) => {
  const { initValues } = useContext(InitiativeContext);
  const { active, round } = initValues;

  const viewRef = useRef();

  // can we scroll the active player into view?
  useEffect(() => {
    if (active === index) {
      viewRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [active, index]);

  return (
    <Flex $dragging={dragging} $index={index} $round={round} ref={ref}>
      <Stack alignItems={'center'}>
        <Active>{active === index && <ArrowRight fontSize="large" />}</Active>
      </Stack>
      <Div ref={active === index ? viewRef : null}>{children}</Div>
    </Flex>
  );
});

export default Row;

Row.propTypes = {
  children: PropTypes.node.isRequired,
  status: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  dragging: PropTypes.number,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};
