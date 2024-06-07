import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useContext, useState } from 'react';
import InitiativeContext from '../context/InitiativeContext';
import DragContext from '../context/DragContext';
import { useTheme } from '@mui/material';

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

const Initiative = ({ children }) => {
  const { initValues } = useContext(InitiativeContext);
  const [isDragging, setNoActions] = useState(false);
  const theme = useTheme();
  return (
    <Div theme={theme}>
      <DragContext.Provider value={{ isDragging, setNoActions }}>
        <Assigned
          $isDragging={isDragging}
          $hasParticipants={initValues.participants.length > 0}
        >
          {children}
        </Assigned>
      </DragContext.Provider>
    </Div>
  );
};

export default Initiative;

Initiative.propTypes = {
  children: PropTypes.node.isRequired,
};
