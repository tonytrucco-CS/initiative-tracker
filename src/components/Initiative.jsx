import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../utils/variables';
import InitiativeHeader from './InitiativeHeader';
import ActionBar from './ActionBar';
import { useContext, useState } from 'react';
import InitiativeContext from '../context/InitiativeContext';
import DragContext from '../context/DragContext';

const Div = styled.div`
  background-color: ${colors.gray200};
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: space-between;
  height: 100%;
`;

const Assigned = styled.div`
  display: grid;
  grid-template-rows: ${(props) =>
    props.$hasParticipants ? '2.5em 1fr' : '1fr'};
  flex: 1;
`;

const Initiative = ({ children }) => {
  const { initValues } = useContext(InitiativeContext);
  const [isDragging, setNoActions] = useState(false);
  return (
    <Div>
      <DragContext.Provider value={{ isDragging, setNoActions }}>
        <Assigned
          $isDragging={isDragging}
          $hasParticipants={initValues.participants.length > 0}
        >
          {initValues.participants.length > 0 && <InitiativeHeader />}
          {children}
        </Assigned>
        <ActionBar />
      </DragContext.Provider>
    </Div>
  );
};

export default Initiative;

Initiative.propTypes = {
  children: PropTypes.node.isRequired,
};
