import { Add } from '@mui/icons-material';
import {
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
} from '@mui/material';
import InitiativeContext from '../context/InitiativeContext';
import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { colors } from '../utils/variables';

const ACTION_CONS = ['delay', 'ready'];

const BAD_CONS = [
  'slowed',
  'stunned',
  'grabbed',
  'pinned',
  'wounded',
  'doomed',
  'clumsy',
  'drained',
  'enfeebled',
  'stupified',
  'blinded',
  'dazzled',
  'deafened',
  'confused',
  'silenced',
  'controlled',
  'fascinated',
  'fatigued',
  'off-guard',
  'fleeing',
  'frightened',
  'persistent damage',
  'prone',
  'petrified',
  'sickened',
  'paralyzed',
  'restrained',
];

const GOOD_CONS = [
  'hastened',
  'invisible',
  'hidden',
  'concealed',
  'undetected',
  'unnoticed',
];

const MERGED = _.concat(BAD_CONS, GOOD_CONS);

const Conditions = ({ conditions, index, type }) => {
  const { initValues, setInitValues } = useContext(InitiativeContext);
  const { round, participants } = initValues;
  const participant = participants[index];
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const addCondition = (condition) => {
    let newConditions = [...participant.conditions];
    newConditions.push(condition);

    setInitValues((prevInit) => {
      const updatedParticipants = [...prevInit.participants];
      updatedParticipants[index] = {
        ...updatedParticipants[index],
        conditions: newConditions,
      };
      return { ...prevInit, participants: updatedParticipants };
    });
    handleClose();
  };

  const removeCondition = (condition) => {
    let newConditions = [...participant.conditions];
    _.remove(newConditions, (con) => con === condition);

    setInitValues((prevInit) => {
      const updatedParticipants = [...prevInit.participants];
      updatedParticipants[index] = {
        ...updatedParticipants[index],
        conditions: newConditions,
      };
      return { ...prevInit, participants: updatedParticipants };
    });
  };

  const checkConType = (condition) => {
    if (_.includes(ACTION_CONS, condition)) {
      return 'default';
    }
    if (_.includes(BAD_CONS, condition)) {
      return 'error';
    }
    if (_.includes(GOOD_CONS, condition)) {
      return 'success';
    }
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
        {conditions.map((condition) => {
          const color = checkConType(condition);
          return (
            <Chip
              size="small"
              color={color}
              key={condition}
              label={_.capitalize(condition)}
              onDelete={() => removeCondition(condition)}
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
        {_.sortBy(MERGED).map((con) => (
          <MenuItem
            key={con}
            onClick={() => addCondition(con)}
            disabled={_.includes(conditions, con)}
          >
            {_.capitalize(con)}
          </MenuItem>
        ))}
      </Menu>
    </Stack>
  );
};

export default Conditions;

Conditions.propTypes = {
  conditions: PropTypes.array.isRequired,
  type: PropTypes.oneOf(['pc', 'ally', 'hazard', 'foe']),
  index: PropTypes.number.isRequired,
};
