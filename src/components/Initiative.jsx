import PropTypes from 'prop-types';
import styled from 'styled-components';
import { breakpoints, colors } from '../utils/variables';
import InitiativeHeader from './InitiativeHeader';
import ActionBar from './ActionBar';
import { useContext } from 'react';
import InitiativeContext from '../context/InitiativeContext';

const Div = styled.div`
  background-color: ${colors.gray200};
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: calc(100vh - 4.75em);
  justify-content: space-between;

  @media only screen and (max-width: ${breakpoints.md}) {
    height: 71.5vh;
  }
`;

const Assigned = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: auto;
  flex: 1;
`;

const Initiative = ({ children }) => {
  const { initValues } = useContext(InitiativeContext);
  return (
    <Div>
      <Assigned>
        {initValues.participants.length > 0 && <InitiativeHeader />}
        {children}
      </Assigned>
      <ActionBar />
    </Div>
  );
};

export default Initiative;

Initiative.propTypes = {
  children: PropTypes.node.isRequired,
};
