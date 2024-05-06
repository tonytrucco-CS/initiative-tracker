import styled from 'styled-components';
import { colors } from '../utils/variables';
import { useContext } from 'react';
import InitiativeContext from '../context/InitiativeContext';
import {
  Button,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from '@mui/material';
import {
  Colorize,
  GroupOutlined,
  LocalFireDepartment,
  Person,
  PlayCircleOutline,
  StopCircleOutlined,
} from '@mui/icons-material';
import _ from 'lodash';

const Nav = styled.nav`
  padding: 0 0.5rem 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const Left = styled.div`
  height: 40px;
  display: flex;
  align-items: flex-end;
`;

const StyledSpeedDial = styled(SpeedDial)``;

const Right = styled.div`
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ActionBar = () => {
  const { initValues, setInitValues } = useContext(InitiativeContext);
  const { round, participants } = initValues;

  const TEMPLATE = {
    name: 'UNKNOWN',
    type: '',
    initiative: 0,
    action: 'normal',
    status: 'alive',
    conditions: [],
  };

  const types = [
    {
      icon: <Person sx={{ color: colors.theme.blue }} />,
      name: 'Player Character',
      type: 'pc',
    },
    {
      icon: <Colorize sx={{ color: colors.theme.red }} />,
      name: 'Monster',
      type: 'foe',
    },
    {
      icon: <GroupOutlined sx={{ color: colors.theme.green }} />,
      name: 'NPC',
      type: 'ally',
    },
    {
      icon: <LocalFireDepartment sx={{ color: colors.theme.orange }} />,
      name: 'Hazard',
      type: 'hazard',
    },
  ];

  // count each type of participant
  const countType = (type) => {
    const matchingTypes = participants.filter((part) => part.type === type);
    return matchingTypes.length + 1;
  };

  // add a specific type of participant
  const addParticipant = (type) => {
    let name = '';
    switch (type) {
      case 'pc':
        name = 'PLAYER CHARACTER';
        break;
      case 'ally':
        name = 'NPC';
        break;
      case 'foe':
        name = 'MONSTER';
        break;

      case 'hazard':
        name = 'HAZARD';
        break;
    }
    name += ` ${countType(type)}`;
    const Participant = { ...TEMPLATE, type: type, name: name };
    let newUnassigned = [...initValues.participants];
    newUnassigned.push(Participant);
    setInitValues({
      ...initValues,
      participants: newUnassigned,
    });
  };

  // start a combat
  const handleStart = () => {
    setInitValues((prevInit) => {
      // sort participants by initiative value
      const updatedParticipants = [...prevInit.participants];
      const sortedParticipants = _.orderBy(
        updatedParticipants,
        'initiative',
        'desc',
      );
      return {
        ...prevInit,
        participants: sortedParticipants,
        round: 1,
        active: 0,
      };
    });
  };

  // end an encounter
  const handleEnd = () => {
    // keep the PCs
    const onlyPCs = initValues.participants
      .filter((participant) => participant.type === 'pc')
      .map((participant) => ({ ...participant, initiative: 0 }));
    setInitValues({
      round: undefined,
      active: undefined,
      participants: onlyPCs,
    });
  };

  return (
    <Nav>
      <Left>
        <StyledSpeedDial
          ariaLabel="Add a Participant"
          icon={<SpeedDialIcon />}
          direction="up"
          FabProps={{ size: 'small' }}
        >
          {types.map((participant) => (
            <SpeedDialAction
              key={participant.name}
              icon={participant.icon}
              tooltipTitle={participant.name}
              tooltipOpen
              tooltipPlacement="right"
              onClick={() => addParticipant(participant.type)}
            />
          ))}
        </StyledSpeedDial>
      </Left>
      <Right>
        {participants.length > 0 && round === undefined && (
          <Button
            variant="contained"
            onClick={handleStart}
            endIcon={<PlayCircleOutline />}
          >
            Fight!
          </Button>
        )}
        {participants.length > 0 && round > 0 && (
          <Button
            variant="contained"
            onClick={handleEnd}
            endIcon={<StopCircleOutlined />}
          >
            End Encounter
          </Button>
        )}
      </Right>
    </Nav>
  );
};

export default ActionBar;
