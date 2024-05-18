import styled from 'styled-components';
import PropTypes from 'prop-types';
import { transparentize } from 'polished';
import { IconButton } from '@mui/material';
import { DragIndicator } from '@mui/icons-material';
import { colors } from '../utils/variables';

const StyledIconButton = styled(IconButton)`
  && {
    background-color: ${transparentize(0.9, colors.white)};
  }
`;

const DragButton = ({ onPointerDown, type, index, ...props }) => {
  return (
    <StyledIconButton
      onPointerDown={(e) => onPointerDown(e, index)}
      {...props}
      sx={{ cursor: 'grab', color: type === 'hazard' ? colors.black : null }}
      disableRipple
      disableTouchRipple
    >
      <DragIndicator />
    </StyledIconButton>
  );
};

export default DragButton;

DragButton.propTypes = {
  onPointerDown: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['pc', 'ally', 'hazard', 'foe']).isRequired,
};
