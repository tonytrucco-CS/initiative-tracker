import { Add } from '@mui/icons-material';
import { IconButton, Menu, MenuItem, Stack, Tooltip } from '@mui/material';
import InitiativeContext from '../context/InitiativeContext';
import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { colors } from '../utils/variables';
import ConditionChip from './ConditionChip';
import { CONDITIONS } from '../utils/constants';
import _ from 'lodash';

const Conditions = ({ conditions, id, type }) => {
  const { initValues, setInitValues } = useContext(InitiativeContext);
  const { round } = initValues;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // add a condition to the participant's array of conditions
  const addCondition = (condition) => {
    let newConditions = conditions;
    conditions.push(condition);

    setInitValues((prevInit) => {
      const updatedParticipants = prevInit.participants.map((p) =>
        p.id === id ? { ...p, conditions: newConditions } : p,
      );
      return { ...prevInit, participants: updatedParticipants };
    });
    handleClose();
  };

  // remove a condition based on its ID
  const removeCon = (conid) => {
    setInitValues((prevInit) => {
      const updatedParticipants = prevInit.participants.map((p) =>
        p.id === id
          ? { ...p, conditions: p.conditions.filter((c) => c.id !== conid) }
          : p,
      );
      return { ...prevInit, participants: updatedParticipants };
    });
  };

  return (
    <Stack ml={0.5} gap={1} direction={'row'}>
      <Tooltip
        title={round === undefined ? '' : 'Add Condition'}
        enterDelay={750}
      >
        <IconButton
          aria-label="Add a Condition"
          id="condition_button"
          aria-controls={open ? 'con_menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          size="small"
          disabled={round === undefined}
          sx={{ color: type === 'hazard' ? colors.black : null }}
        >
          <Add fontSize="small" />
        </IconButton>
      </Tooltip>
      <Stack
        gap={0.5}
        alignItems={'center'}
        direction={'row'}
        flexWrap={'wrap'}
      >
        {conditions.map((con) => {
          return (
            <ConditionChip
              key={con.id}
              label={con.name}
              remove={(id) => removeCon(id)}
              hint={con.hint}
              value={con.value}
              id={con.id}
              type={con.type}
            />
          );
        })}
      </Stack>
      <Menu
        id="con_menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          maxHeight: '30em',
        }}
      >
        {_.sortBy(CONDITIONS, 'name').map((con) => {
          const isDisabled = conditions.some((c) => c.name === con.name);
          return (
            <MenuItem
              key={con.id}
              onClick={() => addCondition(con)}
              disabled={isDisabled}
            >
              {con.name}
            </MenuItem>
          );
        })}
      </Menu>
    </Stack>
  );
};

export default Conditions;

Conditions.propTypes = {
  conditions: PropTypes.array.isRequired,
  type: PropTypes.oneOf(['pc', 'ally', 'hazard', 'foe']),
  id: PropTypes.string.isRequired,
};
