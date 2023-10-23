import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { colors } from '../utils/variables';
import { transparentize } from 'polished';

const Span = styled.span`
  padding: 0.5rem;
  ${(props) => {
    switch (props.type) {
      case 'pc':
        return css`
          color: ${transparentize(0.5, colors.white)};
        `;
      case 'ally':
        return css`
          color: ${transparentize(0.5, colors.white)};
        `;
      case 'foe':
        return css`
          color: ${transparentize(0.5, colors.white)};
        `;
      case 'hazard':
        return css`
          color: ${transparentize(0.5, colors.black)};
        `;
      default:
        return css``;
    }
  }}
`;

const TypeIcon = ({ type }) => {
  return (
    <Span className="material-symbols-outlined" type={type}>
      {type === 'pc' && 'person'}
      {type === 'ally' && 'group'}
      {type === 'foe' && 'sentiment_extremely_dissatisfied'}
      {type === 'hazard' && 'local_fire_department'}
    </Span>
  );
};

export default TypeIcon;

TypeIcon.propTypes = {
  type: PropTypes.string.isRequired,
};
