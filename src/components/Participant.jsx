import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { colors } from '../utils/variables';

const Div = styled.div`
  display: flex;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: solid 3px;
  background-color: ${colors.gray600};
  ${(props) => {
    switch (props.type) {
      case 'pc':
        return css`
          border-color: ${colors.theme.green};
        `;
      case 'ally':
        return css`
          border-color: ${colors.theme.light_gray};
        `;
      case 'foe':
        return css`
          border-color: ${colors.theme.red};
        `;
      case 'hazard':
        return css`
          border-color: ${colors.theme.orange};
        `;
      default:
        return css`
          border-color: ${colors.theme.light_gray};
        `;
    }
  }}
`;

const Participant = ({
  name,
  type = 'pc',
  initiative,
  action = 'normal',
  status = 'alive',
  conditions = [],
}) => {
  return (
    <Div type={type}>
      {name}
      {type}
      {initiative}
      {action}
      {status}
      {conditions.length > 0 && <span>{conditions[0]}</span>}
    </Div>
  );
};

export default Participant;

Participant.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['pc', 'ally', 'foe', 'hazard']).isRequired,
  initiative: PropTypes.number.isRequired,
  action: PropTypes.oneOf(['normal', 'ready', 'delay']).isRequired,
  status: PropTypes.oneOf(['alive', 'dying1', 'dying2', 'dying3']).isRequired,
  conditions: PropTypes.array,
};
