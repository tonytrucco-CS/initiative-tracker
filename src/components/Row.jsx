/* eslint-disable react/display-name */
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { colors, fonts } from '../utils/variables';
import React, { useContext, useEffect, useRef, useState } from 'react';
import InitiativeContext from '../context/InitiativeContext';
import { keyframes } from 'styled-components';
import {
  Badge,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { ArrowBack, ArrowRight } from '@mui/icons-material';
import ActionIcon from './ActionIcon';

const Flex = styled.div`
  display: grid;
  grid-template-columns: 2em 1fr 4em 4em 3em;
  grid-gap: 0.25rem;
  padding: 0 1rem 0 0.5rem;
  align-items: center;
  ${(props) => {
    if (props.$dragging === props.$index) {
      return css`
        background-color: ${colors.theme.gray};
      `;
    }
  }}
`;

// for filling in the skull icon
const Span = styled.span`
  font-variation-settings: 'FILL' ${(props) => (props.$alive ? 0 : 1)};
`;

const blinkAnim = keyframes`
  0% {opacity: 1}
  50% {opacity: 0}
  100% {opacity: 1}
`;

const RemoveActive = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Active = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.pure_white};
  animation-name: ${blinkAnim};
  animation-duration: 1s;
  animation-iteration-count: infinite;
`;

const Div = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Dying = styled.div`
  display: flex;
  gap: 0.25rem;
  align-items: center;
`;

const Row = React.forwardRef(
  ({ children, status, name, dragging, index, type }, ref) => {
    const { initValues, setInitValues } = useContext(InitiativeContext);
    const { participants, active, round } = initValues;
    const [badgeCount, setBadgeCount] = useState(0);

    // get this participant
    const participant = participants[index];

    const viewRef = useRef();

    // reset the action status to normal
    const handleClear = () => {
      const updatedValues = participants.map((part) => {
        if (part.name === name) {
          return { ...part, action: 'normal' };
        }
        return part;
      });
      setInitValues({
        ...initValues,
        participants: updatedValues,
      });
    };

    // the participant delays their action
    const handleDelay = () => {
      const updatedValues = participants.map((part) => {
        if (part.name === name) {
          return { ...part, action: 'delay' };
        }
        return part;
      });
      setInitValues({
        ...initValues,
        participants: updatedValues,
      });
    };

    // the participant readies an action
    const handleReady = () => {
      const updatedValues = participants.map((part) => {
        if (part.name === name) {
          return { ...part, action: 'ready' };
        }
        return part;
      });
      setInitValues({
        ...initValues,
        participants: updatedValues,
      });
    };

    // handle clicking of skulls for managing dying status
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

    // can we scroll the active player into view?
    useEffect(() => {
      if (active === index) {
        viewRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, [active, index]);

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

    return (
      <Flex $dragging={dragging} $index={index} ref={ref}>
        <RemoveActive>
          <Active ref={active === index ? viewRef : null}>
            {active === index && <ArrowRight fontSize="large" />}
          </Active>
        </RemoveActive>
        <Div>
          <Tooltip title="Reset" enterDelay={750}>
            <IconButton
              onClick={handleClear}
              style={{ position: 'absolute' }}
              tabIndex={round === undefined ? -1 : null}
              aria-label="Reset"
            >
              <ArrowBack />
            </IconButton>
          </Tooltip>
          {children}
        </Div>
        <Tooltip
          title={
            <Stack direction={'row'} alignItems={'center'} gap={0.5}>
              <ActionIcon actions={0} />
              <Typography fontFamily={fonts.button}>Delay Turn</Typography>
            </Stack>
          }
        >
          <Chip
            onClick={handleDelay}
            variant="outlined"
            label="Delay"
            disabled={participant.action === 'delay' || !round}
            tabIndex={round === undefined ? -1 : null}
          />
        </Tooltip>
        <Tooltip
          title={
            <Stack direction={'row'} alignItems={'center'} gap={0.5}>
              <ActionIcon actions={2} />
              <Typography fontFamily={fonts.button}>Ready an Action</Typography>
            </Stack>
          }
        >
          <Chip
            onClick={handleReady}
            variant="outlined"
            label="Ready"
            disabled={participant.action === 'ready' || !round}
            tabIndex={round === undefined ? -1 : null}
          />
        </Tooltip>
        <Dying>
          {type !== 'hazard' && (
            <Badge
              badgeContent={badgeCount}
              color={status === 'dying3' ? 'error' : 'warning'}
            >
              <Tooltip title="Set Dying Status" enterDelay={750}>
                <IconButton
                  aria-label="Set Dying Status"
                  onClick={handleDying}
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
          )}
        </Dying>
      </Flex>
    );
  },
);

export default Row;

Row.propTypes = {
  children: PropTypes.node.isRequired,
  status: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  dragging: PropTypes.number,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};
