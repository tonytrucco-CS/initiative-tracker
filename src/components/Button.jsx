import { darken, transparentize } from 'polished';
import styled, { css } from 'styled-components';
import { colors, fonts } from '../utils/variables';
import PropTypes from 'prop-types';

const StyledButton = styled.button`
  ${(props) => {
    switch (props.$outline) {
      case true:
        return css`
          background-color: ${(props) =>
            props.$active
              ? darken(0.15, colors.white)
              : transparentize(0.5, colors.black)};
          color: ${(props) => (props.color ? props.color : colors.white)};
          border: ${(props) =>
            props.color
              ? `solid 1px ${props.color}`
              : `solid 1px ${colors.white}`};
          &:hover:not([disabled]) {
            cursor: pointer;
            background-color: ${(props) =>
              props.$active
                ? darken(0.1, colors.white)
                : transparentize(0.25, colors.black)};
          }

          svg {
            fill: ${colors.white};
          }
        `;
      default:
        return css`
          background-color: ${darken(0.15, colors.white)};
          border: solid 1px ${darken(0.15, colors.white)};
          color: ${colors.white};
          &:hover:not([disabled]) {
            cursor: pointer;
            background-color: ${darken(0.25, colors.white)};
          }

          svg {
            fill: ${colors.white};
          }
        `;
    }
  }};
  ${(props) => {
    switch (props.size) {
      case 'xs':
        return css`
          padding: ${props.$square ? '0.25rem' : '0.25rem 0.5rem'};
          font-size: 1rem;
        `;
      case 'sm':
        return css`
          padding: ${props.$square ? '0.5rem' : '0.5rem 1rem'};
          font-size: 1.25rem;
        `;
      default:
        return css`
          padding: ${props.$square ? '1.5rem' : '1rem 1.5rem'};
          font-size: 1.5rem;
        `;
    }
  }}
  ${(props) => {
    switch (props.$unrounded) {
      case true:
        return css`
          border-radius: 0;
        `;
      default:
        return css`
          border-radius: 0.25rem;
        `;
    }
  }}
  display: flex;
  font-family: ${fonts.button};
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  width: auto;
  transition:
    background-color 0.3s,
    box-shadow 0.3s;

  &:disabled {
    opacity: 0.5;
  }

  &:focus {
    outline: none;
    box-shadow: ${(props) =>
      props.color
        ? `0 0 0 3px ${transparentize(0.5, props.color)}`
        : `0 0 0 3px ${transparentize(0.5, colors.white)}`};
  }
`;

const Button = ({
  children,
  onClick,
  disabled = false,
  autoFocus = null,
  outline = false,
  active = false,
  size,
  square = false,
  unrounded = false,
  color = null,
  ...props
}) => {
  return (
    <StyledButton
      disabled={disabled}
      onClick={onClick}
      autoFocus={autoFocus}
      $outline={outline}
      $active={active}
      size={size}
      $square={square}
      $unrounded={unrounded}
      color={color}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  outline: PropTypes.bool,
  active: PropTypes.bool,
  square: PropTypes.bool,
  unrounded: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  size: PropTypes.string,
  color: PropTypes.string,
};

export default Button;
