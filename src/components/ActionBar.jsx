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

const Nav = styled.nav`
  padding: 0;
  background-color: ${colors.gray200};
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  width: calc(100% - 7rem);
`;

const StyledSpeedDial = styled(SpeedDial)`
  position: absolute;
  bottom: 0;
  left: 0;
`;

const Right = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const ActionBar = () => {
  const { initValues, setInitValues } = useContext(InitiativeContext);
  const { round, participants } = initValues;

  const TEMPLATE = {
    name: `UNKNOWN ${
      initValues.participants ? initValues.participants.length + 1 : 1
    }`,
    type: '',
    initiative: 0,
    action: 'normal',
    status: 'alive',
    conditions: [],
  };

  const types = [
    {
      icon: <Person />,
      name: 'Player Character',
      type: 'pc',
    },
    {
      icon: <Colorize />,
      name: 'Monster',
      type: 'foe',
    },
    {
      icon: <GroupOutlined />,
      name: 'NPC',
      type: 'ally',
    },
    {
      icon: <LocalFireDepartment />,
      name: 'Hazard',
      type: 'hazard',
    },
  ];

  const addParticipant = (type) => {
    const PC = { ...TEMPLATE, type: type };
    let newUnassigned = [...initValues.participants];
    newUnassigned.push(PC);
    setInitValues({
      ...initValues,
      participants: newUnassigned,
    });
  };

  const handleStart = () => {
    setInitValues({
      ...initValues,
      round: 1,
      active: 0,
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
      <StyledSpeedDial
        ariaLabel="Add a Participant"
        icon={<SpeedDialIcon />}
        direction="up"
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
      <Right>
        {participants.length > 0 && round === undefined && (
          <Button
            size="large"
            variant="contained"
            onClick={handleStart}
            endIcon={<PlayCircleOutline />}
          >
            Fight!
          </Button>
        )}
        {participants.length > 0 && round > 0 && (
          <Button
            size="large"
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
