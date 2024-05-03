import styled, { css } from 'styled-components';
import { colors, fonts } from '../utils/variables';
import { useContext, useEffect, useState } from 'react';
import InitiativeContext from '../context/InitiativeContext';
import IconButton from './IconButton';
import PropTypes from 'prop-types';

const StyledHeader = styled.header`
  margin: 0;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4rem;
  width: 100%;
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
  margin: 0;
  border-radius: 0.25rem;
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

const H2 = styled.h2`
  color: ${colors.theme.light_gray};
  padding: 0;
  margin: 0;

  span {
    font-family: ${fonts.mono};
  }
`;

const Header = ({ toggleDrawer }) => {
  const { initValues, setInitValues } = useContext(InitiativeContext);
  const { round, active, participants } = initValues;
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
    <StyledHeader>
      <ActionContainer>
        {round !== undefined ? (
          <>
            <Flex>
              <IconButton
                icon="arrow_left"
                onClick={handlePrev}
                disabled={round === 1}
              />
              <H2>
                Round <span>{round}</span>
              </H2>
              <IconButton icon="arrow_right" onClick={handleNext} />
            </Flex>
            <Flex>
              <IconButton icon="arrow_left" onClick={prevTurn} />
              {activeParticipant ? (
                <H1 type={activeParticipant.type}>{activeParticipant.name}</H1>
              ) : (
                <H1>Selecting...</H1>
              )}
              <IconButton icon="arrow_right" onClick={nextTurn} />
            </Flex>
          </>
        ) : (
          <H1>Pathfinder 2e Initiative Tracker</H1>
        )}
      </ActionContainer>
      <NoteAction>
        <IconButton icon="description" onClick={() => toggleDrawer(true)} />
      </NoteAction>
    </StyledHeader>
  );
};

export default Header;

Header.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
};
