import styled from 'styled-components';
import { colors } from '../utils/variables';
import Button from './Button';
import { useContext } from 'react';
import InitiativeContext from '../context/InitiativeContext';

const Nav = styled.nav`
  padding: 0;
  background-color: ${colors.gray200};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
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

  const addPC = () => {
    const PC = { ...TEMPLATE, type: 'pc' };
    let newUnassigned = [...initValues.participants];
    newUnassigned.push(PC);
    setInitValues({
      ...initValues,
      participants: newUnassigned,
    });
  };

  const addNPC = () => {
    const PC = { ...TEMPLATE, type: 'ally' };
    let newUnassigned = [...initValues.participants];
    newUnassigned.push(PC);
    setInitValues({
      ...initValues,
      participants: newUnassigned,
    });
  };

  const addMonster = () => {
    const PC = { ...TEMPLATE, type: 'foe' };
    let newUnassigned = [...initValues.participants];
    newUnassigned.push(PC);
    setInitValues({
      ...initValues,
      participants: newUnassigned,
    });
  };

  const addHazard = () => {
    const PC = { ...TEMPLATE, type: 'hazard' };
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

  const handleEnd = () => {
    setInitValues({
      round: undefined,
      active: undefined,
      participants: [],
    });
  };

  return (
    <Nav>
      <Left>
        <Button
          size="xs"
          outline
          unrounded
          disabled={participants.length > 10}
          onClick={addPC}
        >
          Player&nbsp;
          <span className="material-symbols-outlined">person</span>
        </Button>
        <Button
          size="xs"
          outline
          unrounded
          disabled={participants.length > 10}
          onClick={addMonster}
        >
          Monster&nbsp;
          <span className="material-symbols-outlined">
            sentiment_extremely_dissatisfied
          </span>
        </Button>
        <Button
          size="xs"
          outline
          unrounded
          disabled={participants.length > 10}
          onClick={addNPC}
        >
          NPC&nbsp;
          <span className="material-symbols-outlined">group</span>
        </Button>
        <Button
          size="xs"
          outline
          unrounded
          disabled={participants.length > 10}
          onClick={addHazard}
        >
          Hazard&nbsp;
          <span className="material-symbols-outlined">
            local_fire_department
          </span>
        </Button>
      </Left>
      <Right>
        {participants.length > 0 && round === undefined && (
          <Button size="xs" outline unrounded onClick={handleStart}>
            Fight!&nbsp;
            <span className="material-symbols-outlined">play_circle</span>
          </Button>
        )}
        {participants.length > 0 && round > 0 && (
          <Button size="xs" outline unrounded onClick={handleEnd}>
            End Encounter&nbsp;
            <span className="material-symbols-outlined">stop_circle</span>
          </Button>
        )}
      </Right>
    </Nav>
  );
};

export default ActionBar;
