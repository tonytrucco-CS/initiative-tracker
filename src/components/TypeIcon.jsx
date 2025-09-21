import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { colors } from '../utils/variables';
import { transparentize } from 'polished';
import {
  Colorize,
  GroupOutlined,
  LocalFireDepartment,
  Person,
} from '@mui/icons-material';

const Span = styled.span`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  width: 2.5rem;
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
    <Span type={type}>
      {type === 'pc' && <Person />}
      {type === 'ally' && <GroupOutlined />}
      {type === 'foe' && <Colorize />}
      {type === 'hazard' && <LocalFireDepartment />}
    </Span>
  );
};

export default TypeIcon;

TypeIcon.propTypes = {
  type: PropTypes.string.isRequired,
};
