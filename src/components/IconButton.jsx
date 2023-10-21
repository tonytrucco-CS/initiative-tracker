import styled from 'styled-components';
import PropTypes from 'prop-types';
import { transparentize } from 'polished';
import { colors } from '../utils/variables';

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  border: none;
  background-color: ${transparentize(0.75, colors.black)};
  color: ${colors.pure_white};
`;

const IconButton = ({ onPointerDown, icon, index }) => {
  return (
    <Button onPointerDown={(e) => onPointerDown(e, index)}>
      <span className="material-symbols-outlined">{icon}</span>
    </Button>
  );
};

export default IconButton;

IconButton.propTypes = {
  onPointerDown: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
