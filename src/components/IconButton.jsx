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
  color: ${(props) =>
    props.$subtle ? transparentize(0.5, colors.pure_white) : colors.pure_white};
  cursor: pointer;
  opacity: ${(props) => (props.$hidden ? 0 : null)};
  transition:
    opacity 0.3s,
    color 0.3s,
    box-shadow 0.3s;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${transparentize(0.75, colors.white)};
  }

  &:hover {
    opacity: ${(props) => (props.$hidden ? 1 : null)};
    background-color: ${transparentize(0.5, colors.black)};
    color: ${colors.pure_white};
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }
`;

const IconButton = ({
  onClick,
  icon,
  hidden,
  $subtle,
  disabled,
  filled,
  ...props
}) => {
  return (
    <Button
      onClick={onClick}
      {...props}
      $hidden={hidden}
      $subtle={$subtle}
      disabled={disabled}
    >
      <span
        className="material-symbols-outlined"
        style={{
          fontVariationSettings: filled ? "'FILL' 1" : null,
        }}
      >
        {icon}
      </span>
    </Button>
  );
};

export default IconButton;

IconButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  hidden: PropTypes.bool,
  $subtle: PropTypes.bool,
  disabled: PropTypes.bool,
  filled: PropTypes.bool,
};
