import styled from 'styled-components';
import { colors } from '../utils/variables';
import { useContext } from 'react';
import InitiativeContext from '../context/InitiativeContext';
import {
  Button,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  useTheme,
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
import { PART_TEMPLATE } from '../utils/constants';
import { saveParty } from '../utils/storage';

const Nav = styled.nav`
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 500;
  border-top: solid 1px ${(props) => props.theme.palette.divider};
`;

const Left = styled.div`
  height: 40px;
  display: flex;
  align-items: flex-end;
  gap: 2em;
`;

const StyledSpeedDial = styled(SpeedDial)`
  width: 40px;
`;

const Right = styled.div`
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ActionBar = () => {
  const { initValues, setInitValues } = useContext(InitiativeContext);
  const { round, participants, reorder } = initValues;
  const theme = useTheme();

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
    const id = crypto.randomUUID?.();
    const base =
      type === 'pc'
        ? 'PLAYER CHARACTER'
        : type === 'ally'
        ? 'NPC'
        : type === 'foe'
        ? 'MONSTER'
        : 'HAZARD';

    const name = `${base} ${countType(type)}`;

    const participant = {
      ...structuredClone(PART_TEMPLATE), // deep copy avoids shared refs
      id,
      type,
      name,
    };

    setInitValues((prev) => ({
      ...prev,
      participants: [...prev.participants, participant],
    }));
  };

  // start a combat
  const handleStart = () => {
    saveParty(initValues.participants);
    setInitValues((prevInit) => {
      // sort participants by initiative value
      const updatedParticipants = [...prevInit.participants];
      const sortedParticipants = _.orderBy(
        updatedParticipants,
        [(p) => Number(p.initiative)],
        ['desc'],
      );
      return {
        ...prevInit,
        participants: sortedParticipants,
        round: 1,
        active: sortedParticipants[0].id,
      };
    });
  };

  // end an encounter
  const handleEnd = () => {
    // keep the PCs
    const onlyPCs = initValues.participants
      .filter((participant) => participant.type === 'pc')
      .map((participant) => ({
        ...participant,
        initiative: 0,
        conditions: [],
      }));
    saveParty(onlyPCs);
    setInitValues({
      round: undefined,
      active: undefined,
      participants: onlyPCs,
    });
  };

  return (
    <Nav theme={theme}>
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
            disabled={reorder}
          >
            Fight!
          </Button>
        )}
        {participants.length > 0 && round > 0 && (
          <Button
            variant="contained"
            onClick={handleEnd}
            endIcon={<StopCircleOutlined />}
            disabled={reorder}
          >
            End Encounter
          </Button>
        )}
      </Right>
    </Nav>
  );
};

export default ActionBar;
