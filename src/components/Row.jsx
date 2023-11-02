/* eslint-disable react/display-name */
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { colors } from '../utils/variables';
import React, { useContext } from 'react';
import InitiativeContext from '../context/InitiativeContext';
import { keyframes } from 'styled-components';
import IconButton from './IconButton';

const Flex = styled.div`
  display: grid;
  grid-template-columns: 5em 1fr 5em 5em 8em;
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

const RemoveActive = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Active = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.pure_white};
  animation-name: ${blinkAnim};
  animation-duration: 1s;
  animation-iteration-count: infinite;
  span {
    font-size: 2.5rem;
  }
`;

const Div = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Action = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Dying = styled.div`
  display: flex;
  gap: 0.25rem;
  align-items: center;
`;

const Row = React.forwardRef(
  ({ children, status, name, action, dragging, index, type }, ref) => {
    const { initValues, setInitValues } = useContext(InitiativeContext);
    const { participants, active, round } = initValues;

    // reset the action status to normal
    const handleClear = () => {
      const updatedValues = participants.map((part) => {
        if (part.name === name) {
          return { ...part, action: 'normal' };
        }
        return part;
      });
      setInitValues({
        ...initValues,
        participants: updatedValues,
      });
    };

    // the participant delays their action
    const handleDelay = () => {
      const updatedValues = participants.map((part) => {
        if (part.name === name) {
          return { ...part, action: 'delay' };
        }
        return part;
      });
      setInitValues({
        ...initValues,
        participants: updatedValues,
      });
    };

    // the participant readies an action
    const handleReady = () => {
      const updatedValues = participants.map((part) => {
        if (part.name === name) {
          return { ...part, action: 'ready' };
        }
        return part;
      });
      setInitValues({
        ...initValues,
        participants: updatedValues,
      });
    };

    // check if the skulls should be marked as filled or not when dying
    const checkFilled = (value) => {
      let filled = false;
      if (value === 'dying1') {
        if (status === 'dying1' || status === 'dying2' || status === 'dying3') {
          filled = true;
        }
      } else if (value === 'dying2') {
        if (status === 'dying2' || status === 'dying3') {
          filled = true;
        }
      } else if (value === 'dying3') {
        if (status === 'dying3') {
          filled = true;
        }
      }
      return filled;
    };

    // handle clicking of skulls for managing dying status
    const handleDying = (status) => {
      const updatedValues = participants.map((part) => {
        if (part.name === name) {
          if (part.status === status) {
            switch (part.status) {
              case 'dying1':
                return { ...part, status: 'alive' };
              case 'dying2':
                return { ...part, status: 'dying1' };
              case 'dying3':
                return { ...part, status: 'dying2' };
            }
          } else {
            return { ...part, status: status };
          }
        }
        return part;
      });
      setInitValues({
        ...initValues,
        participants: updatedValues,
      });
    };

    // remove a participant
    const handleRemove = () => {
      const toRemove = index;
      setInitValues((prevInit) => ({
        ...prevInit,
        participants: prevInit.participants.filter(
          (_, index) => index !== toRemove,
        ),
      }));
    };
    return (
      <Flex $dragging={dragging} $index={index} ref={ref}>
        <RemoveActive>
          <IconButton
            icon="delete"
            onClick={handleRemove}
            $subtle
            tabIndex={round === undefined ? -1 : null}
          />
          <Active>
            {active === index && (
              <span className="material-symbols-outlined">arrow_right</span>
            )}
          </Active>
        </RemoveActive>
        <Div>
          {action !== 'normal' && (
            <IconButton
              onClick={handleClear}
              icon={'arrow_left_alt'}
              style={{ position: 'absolute' }}
              tabIndex={round === undefined ? -1 : null}
            />
          )}
          {children}
        </Div>
        <Action>
          {action === 'normal' && (
            <IconButton
              icon={'chevron_right'}
              onClick={handleDelay}
              $subtle
              tabIndex={round === undefined ? -1 : null}
            />
          )}
        </Action>
        <Action>
          {(action === 'normal' || action === 'delay') && (
            <IconButton
              onClick={handleReady}
              icon={'keyboard_double_arrow_right'}
              $subtle
              tabIndex={round === undefined ? -1 : null}
            />
          )}
        </Action>
        <Dying>
          {type !== 'hazard' && (
            <>
              <IconButton
                icon="skull"
                onClick={() => handleDying('dying1')}
                tabIndex={round === undefined ? -1 : null}
                filled={checkFilled('dying1')}
                $subtle={status === 'alive'}
              />
              <IconButton
                icon="skull"
                onClick={() => handleDying('dying2')}
                tabIndex={round === undefined ? -1 : null}
                filled={checkFilled('dying2')}
                $subtle={status === 'alive'}
              />
              <IconButton
                icon="skull"
                onClick={() => handleDying('dying3')}
                tabIndex={round === undefined ? -1 : null}
                filled={checkFilled('dying3')}
                $subtle={status === 'alive'}
              />
            </>
          )}
        </Dying>
      </Flex>
    );
  },
);

export default Row;

Row.propTypes = {
  children: PropTypes.node.isRequired,
  status: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  dragging: PropTypes.number,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};
