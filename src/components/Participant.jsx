import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { colors, fonts } from '../utils/variables';
import TypeIcon from './TypeIcon';
import { transparentize } from 'polished';
import DragButton from './DragButton';
import { useContext } from 'react';
import InitiativeContext from '../context/InitiativeContext';
import _ from 'lodash';
import DragContext from '../context/DragContext';

const Div = styled.div`
  display: flex;
  flex: 1;
  border-radius: 0.25rem;
  transition: transform 0.6s;
  transition-timing-function: ease-in-out;
  cursor: default;
  ${(props) => {
    switch (props.action) {
      case 'normal':
        return css``;
      case 'delay':
        return css`
          transform: translateX(2.5em);
        `;
      case 'ready':
        return css`
          transform: translateX(7.5em);
        `;
      default:
        return css``;
    }
  }}
  border: solid 3px;
  align-items: center;
  justify-content: space-between;
  box-shadow: 4px 4px 0.5rem ${transparentize(0.5, colors.black)};
  touch-action: ${(props) => (props.$dragging ? 'none' : null)};
  ${(props) => {
    switch (props.type) {
      case 'pc':
        return css`
          border-color: ${colors.theme.blue};
          background-color: ${colors.theme.blue};
        `;
      case 'ally':
        return css`
          border-color: ${colors.theme.green};
          background-color: ${colors.theme.green};
        `;
      case 'foe':
        return css`
          border-color: ${colors.theme.red};
          background-color: ${colors.theme.red};
        `;
      case 'hazard':
        return css`
          border-color: ${colors.theme.orange};
          background-color: ${colors.theme.orange};
        `;
      default:
        return css`
          border-color: ${colors.theme.light_gray};
          background-color: ${colors.theme.light_gray};
        `;
    }
  }}
`;

const NameAndType = styled.span`
  display: flex;
  align-items: center;
  flex: 1;
  gap: 3px;
`;

const Input = styled.input`
  background-color: ${colors.gray600};
  border-radius: 0.25rem;
  height: 2.5rem;
  border: none;
  font-family: ${fonts.body};
  font-size: 1rem;
  flex: 1;
  padding-left: 0.5rem;

  &:focus {
    outline: none;
    background-color: ${colors.white};
  }
`;

const Initiative = styled.input`
  border-radius: 0.25rem;
  padding: 0.5rem;
  height: 2.5rem;
  width: 2.5rem;
  text-align: right;
  font-size: 1rem;
  font-family: ${fonts.mono};
  font-weight: 800;
  background-color: transparent;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    appearance: none;
    -webkit-appearance: none;
    margin: 0;
  }
  &[type='number'] {
    appearance: textfield;
    -moz-appearance: textfield;
  }
  border: none;
  margin-left: 0.25rem;
  ${(props) => {
    switch (props.$type) {
      case 'pc':
        return css`
          color: ${transparentize(0.15, colors.white)};
        `;
      case 'ally':
        return css`
          color: ${transparentize(0.15, colors.white)};
        `;
      case 'foe':
        return css`
          color: ${transparentize(0.15, colors.white)};
        `;
      case 'hazard':
        return css`
          color: ${transparentize(0.15, colors.black)};
        `;
      default:
        return css``;
    }
  }}

  &:hover {
    cursor: pointer;
    background-color: ${transparentize(0.9, colors.black)};
  }

  &:focus {
    outline: none;
    background-color: ${transparentize(0.75, colors.black)};
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  height: 2.5rem;
  padding: 0 0.5rem;
  align-items: center;
`;

const Participant = ({
  name,
  type = 'pc',
  initiative,
  action = 'normal',
  index,
  startDrag,
}) => {
  const { setInitValues } = useContext(InitiativeContext);
  const { isDragging } = useContext(DragContext);

  const handleName = (e) => {
    setInitValues((prevInit) => {
      const updatedParticipants = [...prevInit.participants];
      updatedParticipants[index] = {
        ...updatedParticipants[index],
        name: e.target.value,
      };
      return { ...prevInit, participants: updatedParticipants };
    });
  };

  const handleInit = (e) => {
    setInitValues((prevInit) => {
      const updatedParticipants = [...prevInit.participants];
      updatedParticipants[index] = {
        ...updatedParticipants[index],
        initiative: Number(e.target.value),
      };
      return { ...prevInit, participants: updatedParticipants };
    });
  };

  const handleReSort = () => {
    setInitValues((prevInit) => {
      const updatedParticipants = [...prevInit.participants];
      const sortedParticipants = _.orderBy(
        updatedParticipants,
        'initiative',
        'desc',
      );
      return { ...prevInit, participants: sortedParticipants };
    });
  };

  const handleSelect = (e) => {
    e.target.select();
  };
  return (
    <Div type={type} action={action} $dragging={isDragging}>
      <Actions>
        <DragButton
          icon="drag_indicator"
          onPointerDown={startDrag}
          index={index}
          tabIndex={-1}
        />
      </Actions>
      <NameAndType>
        <TypeIcon type={type} />
        <Input
          type="text"
          placeholder="Name this Participant"
          value={name}
          name="Participant"
          onChange={(e) => handleName(e)}
          onClick={handleSelect}
        />
      </NameAndType>
      <Initiative
        $type={type}
        type="number"
        value={initiative}
        name="Initiative"
        onChange={(e) => handleInit(e)}
        onClick={handleSelect}
        onBlur={handleReSort}
      />
    </Div>
  );
};

export default Participant;

Participant.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['pc', 'ally', 'foe', 'hazard']).isRequired,
  initiative: PropTypes.number.isRequired,
  action: PropTypes.oneOf(['normal', 'ready', 'delay']).isRequired,
  index: PropTypes.number.isRequired,
  startDrag: PropTypes.func.isRequired,
};
