import styled from 'styled-components';
import { colors } from '../utils/variables';
import { transparentize } from 'polished';
import PropTypes from 'prop-types';

const Button = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background-color: ${transparentize(0.75, colors.black)};
  color: ${colors.theme.orange};
  border-radius: 0.25rem;
  min-height: 2rem;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  opacity: ${(props) => (props.hidden ? 0 : null)};
  transition: opacity 0.3s;

  &:hover {
    opacity: ${(props) => (props.hidden ? 1 : null)};
  }
`;

const RowButton = ({ children, onClick, ...props }) => {
  return (
    <Button onClick={onClick} {...props}>
      {children}
    </Button>
  );
};

export default RowButton;

RowButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};
