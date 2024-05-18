import { Badge, IconButton, Tooltip } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import InitiativeContext from '../context/InitiativeContext';
import PropTypes from 'prop-types';

// for filling in the skull icon
const Span = styled.span`
  font-variation-settings: 'FILL' ${(props) => (props.$alive ? 0 : 1)};
`;

const Placeholder = styled.div`
  width: 40px;
  height: 40px;
  opacity: 0;
  pointer-events: none;
`;

const DyingAction = ({ name, status, type }) => {
  const { initValues, setInitValues } = useContext(InitiativeContext);
  const { participants, round } = initValues;
  const [badgeCount, setBadgeCount] = useState(0);

  // handle left-clicking of skulls for managing dying status
  const handleDying = () => {
    const updatedValues = participants.map((part) => {
      if (part.name === name) {
        switch (part.status) {
          case 'dying1':
            return { ...part, status: 'dying2' };
          case 'dying2':
            return { ...part, status: 'dying3' };
          case 'dying3':
            return { ...part, status: 'alive' };
          default:
            return { ...part, status: 'dying1' };
        }
      }
      return part;
    });
    setInitValues({
      ...initValues,
      participants: updatedValues,
    });
  };

  // handle right clicking the skulls to reverse dying
  const handleReverseDying = (event) => {
    event.preventDefault();

    const updatedValues = participants.map((part) => {
      if (part.name === name) {
        switch (part.status) {
          case 'dying1':
            return { ...part, status: 'alive' };
          case 'dying2':
            return { ...part, status: 'dying1' };
          case 'dying3':
            return { ...part, status: 'dying2' };
          default:
            return { ...part, status: 'dying3' };
        }
      }
      return part;
    });
    setInitValues({
      ...initValues,
      participants: updatedValues,
    });
  };

  // set the badge count for dying condition
  useEffect(() => {
    let newBadge = badgeCount;
    switch (status) {
      case 'dying1':
        newBadge = 1;
        break;
      case 'dying2':
        newBadge = 2;
        break;
      case 'dying3':
        newBadge = 3;
        break;
      default:
        newBadge = 0;
    }
    setBadgeCount(newBadge);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (type !== 'hazard') {
    return (
      <Badge
        badgeContent={badgeCount}
        color={status === 'dying3' ? 'error' : 'warning'}
      >
        <Tooltip title={!round ? '' : 'Set Dying Status'} enterDelay={750}>
          <IconButton
            aria-label="Set Dying Status"
            onClick={handleDying}
            onContextMenu={handleReverseDying}
            disabled={!round}
            tabIndex={round === undefined ? -1 : null}
            sx={{ opacity: status === 'alive' ? '0.5' : '1' }}
          >
            <Span
              className="material-symbols-outlined"
              $alive={status === 'alive'}
            >
              skull
            </Span>
          </IconButton>
        </Tooltip>
      </Badge>
    );
  } else {
    return <Placeholder />;
  }
};

export default DyingAction;

DyingAction.propTypes = {
  name: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['alive', 'dying1', 'dying2', 'dying3']).isRequired,
  type: PropTypes.oneOf(['pc', 'ally', 'foe', 'hazard']).isRequired,
};
