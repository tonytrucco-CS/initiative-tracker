import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { rgba } from 'polished';
import { fonts } from '../utils/variables';
import React, { useEffect, useState } from 'react';
import { Cancel } from '@mui/icons-material';

const Chip = styled(Paper)`
  && {
    align-items: center;
    font-size: 0.8125rem;
    height: 24px;
    padding: 0 3px 0 6px;
    gap: 3px;
    display: flex;
    justify-content: center;
    background-color: ${({ $type }) =>
      $type === 'good'
        ? '#66bb6a'
        : $type === 'bad'
        ? '#f44336'
        : rgba(255, 255, 255, 0.16)};
    color: ${({ $type }) =>
      $type === 'good'
        ? rgba(0, 0, 0, 0.87)
        : $type === 'bad'
        ? '#ffffff'
        : '#ffffff'};
    font-family: ${fonts.button};
  }
`;

const Span = styled.span`
  line-height: 1.5;
  white-space: nowrap;
  display: block;
  font-weight: 800;
  border-radius: 4px;
  padding: 0 3px;
  &:first-child {
    padding-left: 4px;
  }
  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.25);
  }
`;

const Number = styled.button`
  height: 16px;
  width: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.25);
  font-weight: 800;
  border: none;
  color: inherit;
  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const RemoveButton = styled(Cancel)`
  opacity: 0.7;
  &:hover {
    opacity: 0.9;
    cursor: pointer;
  }
`;

const ConditionChip = ({
  type = 'bad',
  label,
  value = null,
  id,
  remove,
  hint,
}) => {
  const [conValue, setConValue] = useState(value);
  const [open, setOpen] = useState(false);

  // open the dialog
  const handleOpen = () => {
    setOpen(true);
  };

  // close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (conValue === 0) {
      // if a condition is ever at 0, it goes away
      handleRemove();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conValue]);

  // increase condition value
  const handleIncrease = () => {
    let oldCon = conValue;
    setConValue(oldCon + 1);
  };

  // decrease condition value
  const handleDecrease = (event) => {
    event.preventDefault();
    let oldCon = conValue;
    setConValue(oldCon - 1);
  };

  const handleRemove = () => {
    remove(id);
  };

  return (
    <React.Fragment>
      <Chip
        elevation={0}
        role="button"
        sx={{ borderRadius: '12px' }}
        $type={type}
      >
        {value !== null && (
          <Tooltip
            title={
              <Typography fontFamily={fonts.button}>
                Click for +1
                <br />
                Right-click for -1
              </Typography>
            }
            enterDelay={1000}
          >
            <Number onClick={handleIncrease} onContextMenu={handleDecrease}>
              <span>{conValue}</span>
            </Number>
          </Tooltip>
        )}
        <Span onClick={handleOpen}>{label}</Span>
        <RemoveButton fontSize="small" onClick={handleRemove} />
      </Chip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-label={label}
        aria-description={hint}
      >
        <DialogTitle>{label}</DialogTitle>
        <DialogContent>
          <DialogContentText>{hint}</DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default ConditionChip;

ConditionChip.propTypes = {
  type: PropTypes.oneOf(['action', 'good', 'bad']).isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
  id: PropTypes.string.isRequired,
  hint: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired,
};
