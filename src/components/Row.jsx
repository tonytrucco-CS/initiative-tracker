import styled from 'styled-components';
import PropTypes from 'prop-types';
import { colors } from '../utils/variables';
import _ from 'lodash';
import { useContext } from 'react';
import ParticipantContext from '../context/ParticipantContext';
import RowButton from './RowButton';
import { transparentize } from 'polished';

const Flex = styled.div`
  display: grid;
  grid-template-columns: 5em 1fr 5em 5em 8em;
`;

const Active = styled.div``;

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

const SkullButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) =>
    _.includes(props.$status, 'dying')
      ? colors.white
      : transparentize(0.75, colors.white)};
  border: none;
  cursor: pointer;
  border-radius: 50%;
  width: 2.25rem;
  height: 2.25rem;
  background-color: ${transparentize(1, colors.black)};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${transparentize(0.5, colors.black)};
  }
`;

const Row = ({ children, status, name, action }) => {
  const { partValues, setPartValues } = useContext(ParticipantContext);

  const handleClear = () => {
    const updatedValues = partValues.map((part) => {
      if (part.name === name) {
        return { ...part, action: 'normal' };
      }
      return part;
    });
    setPartValues(updatedValues);
  };

  const handleDelay = () => {
    const updatedValues = partValues.map((part) => {
      if (part.name === name) {
        return { ...part, action: 'delay' };
      }
      return part;
    });
    setPartValues(updatedValues);
  };

  const handleReady = () => {
    const updatedValues = partValues.map((part) => {
      if (part.name === name) {
        return { ...part, action: 'ready' };
      }
      return part;
    });
    setPartValues(updatedValues);
  };

  const handleDying = (status) => {
    const updatedValues = partValues.map((part) => {
      if (part.name === name) {
        if (part.status === status) {
          switch (part.status) {
            case 'dying1':
              return { ...part, status: 'normal' };
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
    setPartValues(updatedValues);
  };

  return (
    <Flex>
      <Active></Active>
      <Div>
        {action !== 'normal' && (
          <RowButton onClick={handleClear} style={{ position: 'absolute' }}>
            <span className="material-symbols-outlined">arrow_left_alt</span>
            Reset
          </RowButton>
        )}
        {children}
      </Div>
      <Action>
        {action === 'normal' && (
          <RowButton onClick={handleDelay} hidden>
            Delay
          </RowButton>
        )}
      </Action>
      <Action>
        {(action === 'normal' || action === 'delay') && (
          <RowButton onClick={handleReady} hidden>
            Ready
          </RowButton>
        )}
      </Action>
      <Dying>
        <SkullButton onClick={() => handleDying('dying1')} $status={status}>
          <span
            className="material-symbols-outlined"
            style={{
              fontVariationSettings:
                status === 'dying1' ||
                status === 'dying2' ||
                status === 'dying3'
                  ? "'FILL' 1"
                  : null,
            }}
          >
            skull
          </span>
        </SkullButton>
        <SkullButton onClick={() => handleDying('dying2')} $status={status}>
          <span
            className="material-symbols-outlined"
            style={{
              fontVariationSettings:
                status === 'dying2' || status === 'dying3' ? "'FILL' 1" : null,
            }}
          >
            skull
          </span>
        </SkullButton>
        <SkullButton onClick={() => handleDying('dying3')} $status={status}>
          <span
            className="material-symbols-outlined"
            style={{
              fontVariationSettings: status === 'dying3' ? "'FILL' 1" : null,
            }}
          >
            skull
          </span>
        </SkullButton>
      </Dying>
    </Flex>
  );
};

export default Row;

Row.propTypes = {
  children: PropTypes.node.isRequired,
  status: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
};
