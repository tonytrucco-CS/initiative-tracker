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
  padding: 0 0.5rem 0.5rem;
  background-color: ${colors.gray200};
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
