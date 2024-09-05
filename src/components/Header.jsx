import styled, { css } from 'styled-components';
import { colors, fonts } from '../utils/variables';
import { useContext, useEffect, useState } from 'react';
import InitiativeContext from '../context/InitiativeContext';
import PropTypes from 'prop-types';
import { IconButton, Tooltip, useTheme } from '@mui/material';
import {
  ArrowLeft,
  ArrowRight,
  DescriptionOutlined,
} from '@mui/icons-material';

const StyledHeader = styled.header`
  margin: 0;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4rem;
  width: 100%;
  border-bottom: solid 1px ${(props) => props.theme.palette.divider};
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  flex: 1;
`;

const NoteAction = styled.div``;

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const H1 = styled.h1`
  padding: 0;
  font-size: 1.5rem;
  margin: 0;
  display: flex;
  align-items: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  gap: 0.5rem;
  border-radius: 0.25rem;
  user-select: none;
  ${(props) => {
    switch (props.type) {
      case 'pc':
        return css`
          color: ${colors.white};
          background-color: ${colors.theme.blue};
          padding: 0 0.5rem;
        `;
      case 'ally':
        return css`
          color: ${colors.white};
          background-color: ${colors.theme.green};
          padding: 0 0.5rem;
        `;
      case 'foe':
        return css`
          color: ${colors.white};
          background-color: ${colors.theme.red};
          padding: 0 0.5rem;
        `;
      case 'hazard':
        return css`
          color: ${colors.black};
          background-color: ${colors.theme.orange};
          padding: 0 0.5rem;
        `;
      default:
        return css`
          color: ${colors.theme.light_gray};
        `;
    }
  }}
`;

const Img = styled.img`
  width: 2rem;
  height: 2rem;
`;

const H2 = styled.h2`
  color: ${colors.theme.light_gray};
  border-radius: 0.25rem;
  padding: 0 0.5rem;
  margin: 0;
  user-select: none;
  background-color: ${colors.gray200};

  span {
    font-family: ${fonts.mono};
  }
`;

const Header = ({ toggleDrawer }) => {
  const { initValues, setInitValues } = useContext(InitiativeContext);
  const { round, active, participants } = initValues;
  const theme = useTheme();
  const [activeParticipant, setActive] = useState(
    participants.filter((_, index) => index === active)[0],
  );

  useEffect(() => {
    setActive(participants.filter((_, index) => index === active)[0]);
  }, [active, participants]);

  // move to the previous round
  const handlePrev = () => {
    setInitValues((prevInit) => ({
      ...prevInit,
      round: prevInit.round - 1,
    }));
  };

  // move to the next round
  const handleNext = () => {
    setInitValues((prevInit) => ({
      ...prevInit,
      round: prevInit.round + 1,
    }));
  };

  // move to the next participant and possibly next round
  const nextTurn = () => {
    if (active !== participants.length - 1) {
      setInitValues((prevInit) => ({
        ...prevInit,
        active: prevInit.active + 1,
      }));
    } else {
      setInitValues((prevInit) => ({
        ...prevInit,
        active: 0,
        round: prevInit.round + 1,
      }));
    }
  };

  // move to previous participant
  const prevTurn = () => {
    if (active === 0) {
      setInitValues((prevInit) => ({
        ...prevInit,
        active: prevInit.participants.length - 1,
      }));
    } else {
      setInitValues((prevInit) => ({
        ...prevInit,
        active: prevInit.active - 1,
      }));
    }
  };

  return (
    <StyledHeader theme={theme}>
      <ActionContainer>
        {round !== undefined ? (
          <>
            <Flex>
              <IconButton
                onClick={handlePrev}
                disabled={round === 1}
                aria-label="Previous"
              >
                <ArrowLeft />
              </IconButton>
              <H2>
                Round <span>{round}</span>
              </H2>
              <IconButton onClick={handleNext} aria-label="Next">
                <ArrowRight />
              </IconButton>
            </Flex>
            <Flex>
              <IconButton onClick={prevTurn} aria-label="Previous">
                <ArrowLeft />
              </IconButton>
              {activeParticipant ? (
                <H1 type={activeParticipant.type}>{activeParticipant.name}</H1>
              ) : (
                <H1>Selecting...</H1>
              )}
              <IconButton onClick={nextTurn} aria-label="Next">
                <ArrowRight />
              </IconButton>
            </Flex>
          </>
        ) : (
          <H1>
            <Img src="/logo.png" alt="" />
            Pathfinder 2e Initiative Tracker
          </H1>
        )}
      </ActionContainer>
      <NoteAction>
        <Tooltip title="Open Notes" enterDelay={750}>
          <IconButton
            aria-label="Toggle Notes"
            onClick={() => toggleDrawer(true)}
          >
            <DescriptionOutlined />
          </IconButton>
        </Tooltip>
      </NoteAction>
    </StyledHeader>
  );
};

export default Header;

Header.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
};
