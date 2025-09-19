import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import InitiativeContext from '../context/InitiativeContext';
import DragContext from '../context/DragContext';
import { useTheme } from '@mui/material';
import List from './List';
import { loadParty } from '../utils/storage';
import Empty from './Empty';
import Loading from './Loading';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: space-between;
  height: 100%;
`;

const Assigned = styled.div`
  flex: 1;
`;

const Initiative = () => {
  const { initValues, setInitValues } = useContext(InitiativeContext);
  const [isDragging, setNoActions] = useState(false);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  // check for a party to load
  useEffect(() => {
    const party = loadParty();
    if (party.length > 0) {
      setInitValues({
        ...initValues,
        participants: party,
      });
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Div theme={theme}>
      <DragContext.Provider value={{ isDragging, setNoActions }}>
        <Assigned
          $isDragging={isDragging}
          $hasParticipants={initValues.participants.length > 0}
        >
          {loading ? (
            <Loading />
          ) : initValues.participants.length > 0 ? (
            <List />
          ) : (
            <Empty />
          )}
        </Assigned>
      </DragContext.Provider>
    </Div>
  );
};

export default Initiative;
