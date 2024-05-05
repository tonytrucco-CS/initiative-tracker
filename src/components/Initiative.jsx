import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useContext, useState } from 'react';
import InitiativeContext from '../context/InitiativeContext';
import DragContext from '../context/DragContext';
import { colors } from '../utils/variables';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: space-between;
  height: 100%;
  border-bottom: solid 1px ${colors.theme.light_gray};
`;

const Assigned = styled.div`
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
