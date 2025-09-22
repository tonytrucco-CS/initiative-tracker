import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { colors, fonts } from '../utils/variables';
import TypeIcon from './TypeIcon';
import { transparentize } from 'polished';
import DragButton from './DragButton';
import { useContext, useEffect, useRef } from 'react';
import InitiativeContext from '../context/InitiativeContext';
import { Divider, IconButton, Stack, Tooltip } from '@mui/material';
import Conditions from './Conditions';
import { isLast, neighborId } from '../utils/helpers';

const Div = styled.div`
  flex: 1;
  z-index: 10;
  border-radius: 0.25rem;
  cursor: default;
  box-shadow: 4px 4px 0.5rem ${transparentize(0.5, colors.black)};
  touch-action: ${(props) => (props.$reorder ? 'none' : null)};
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
  background-color: ${transparentize(0.9, colors.black)};
  border-radius: 0.25rem;
  color: ${(props) => (props.$type === 'hazard' ? colors.black : colors.white)};
  height: 2.5rem;
  border: none;
  font-family: ${fonts.body};
  font-size: 1rem;
  flex: 1;
  width: 100%;
  padding-left: 0.5rem;
  &::selection {
    color: ${(props) =>
      props.$type === 'hazard' ? colors.black : colors.white};
    background: ${transparentize(0.8, colors.black)};
  }

  &:focus {
    -webkit-text-fill-color: ${(props) =>
      props.$type === 'hazard' ? colors.black : colors.white};
    caret-color: ${(props) =>
      props.$type === 'hazard' ? colors.black : colors.white};
    outline: none;
    background-color: ${transparentize(0.8, colors.black)};
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

  &::selection {
    color: ${(props) =>
      props.$type === 'hazard' ? colors.black : colors.white};
    background: ${transparentize(0.8, colors.black)};
  }

  &:focus {
    outline: none;
    background-color: ${transparentize(0.75, colors.black)};
    -webkit-text-fill-color: ${(props) =>
      props.$type === 'hazard' ? colors.black : colors.white};
    caret-color: ${(props) =>
      props.$type === 'hazard' ? colors.black : colors.white};
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  height: 2.5rem;
  padding: 0 0.5rem;
  align-items: center;
`;

const Participant = ({ id, index, startDrag, topRef, botRef }) => {
  const { initValues, setInitValues } = useContext(InitiativeContext);
  const { active, round, participants, reorder } = initValues;
  const currentPart = participants.find((p) => p.id === id);

  const partRef = useRef();

  // give participant a name
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

  // set initiative value
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

  const handleSelect = (e) => {
    e.target.select();
  };

  // remove a participant
  const handleRemove = (id) => {
    if (participants.length === 1) {
      // basically we reset the app if all participants are removed
      setInitValues({
        round: undefined,
        active: undefined,
        participants: [],
      });
      return;
    }
    // if it's the last participant in the array being removed
    if (isLast(participants, id)) {
      setInitValues((prevInit) => ({
        ...prevInit,
        active: id === active ? participants[0].id : prevInit.active,
        round:
          id === active && round !== undefined
            ? prevInit.round + 1
            : prevInit.round,
        participants: prevInit.participants.filter((p) => p.id !== id),
      }));
    } else {
      // if the participant being removed is also active
      let newActive = active;
      if (active === id) {
        newActive = neighborId(participants, active);
      }
      setInitValues((prevInit) => ({
        ...prevInit,
        active: newActive,
        participants: prevInit.participants.filter((p) => p.id !== id),
      }));
    }
  };

  // when adding a participant, make sure the view is scrolled to it
  useEffect(() => {
    partRef.current.scrollIntoView({
      behavior: 'smooth',
    });
  }, []);

  const { type, initiative, conditions, name } = currentPart;
  return (
    <Div type={type} $reorder={reorder} ref={partRef}>
      <Stack alignItems={'flex-start'} width={'100%'} gap={0.75} py={0.5}>
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          width={'100%'}
          px={0.5}
        >
          {reorder && (
            <Actions
              ref={
                index === 0
                  ? topRef
                  : index === participants.length - 1
                  ? botRef
                  : null
              }
            >
              <DragButton
                onPointerDown={startDrag}
                index={index}
                type={type}
                tabIndex={-1}
              />
            </Actions>
          )}
          <NameAndType>
            <TypeIcon type={type} />
            <Input
              type="text"
              placeholder="Name this Participant"
              value={name}
              name="Participant"
              onChange={(e) => handleName(e)}
              onClick={handleSelect}
              $type={type}
            />
          </NameAndType>
          <Initiative
            $type={type}
            type="number"
            value={initiative}
            name="Initiative"
            onChange={(e) => handleInit(e)}
            onClick={handleSelect}
          />
          <Tooltip title={`Remove ${name}`} enterDelay={300}>
            <IconButton
              aria-label="Remove Participant"
              onClick={() => handleRemove(id)}
              tabIndex={round === undefined ? -1 : null}
            >
              <span
                className="material-symbols-outlined"
                style={{ color: type === 'hazard' ? colors.black : null }}
              >
                skull
              </span>
            </IconButton>
          </Tooltip>
        </Stack>
        {!reorder && round !== undefined && (
          <>
            <Divider flexItem />
            <Conditions conditions={conditions} id={id} type={type} />
          </>
        )}
      </Stack>
    </Div>
  );
};

export default Participant;

Participant.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  startDrag: PropTypes.func.isRequired,
  topRef: PropTypes.shape({
    current: PropTypes.instanceOf(HTMLDivElement),
  }),
  botRef: PropTypes.shape({
    current: PropTypes.instanceOf(HTMLDivElement),
  }),
};
