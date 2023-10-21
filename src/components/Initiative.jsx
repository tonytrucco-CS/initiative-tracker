import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../utils/variables';
import InitiativeHeader from './InitiativeHeader';

const Div = styled.div`
  background-color: ${colors.gray200};
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Initiative = ({ children }) => {
  return (
    <Div>
      <InitiativeHeader />
      {children}
    </Div>
  );
};

export default Initiative;

Initiative.propTypes = {
  children: PropTypes.node.isRequired,
};
