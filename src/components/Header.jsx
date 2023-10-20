import styled from 'styled-components';
import { colors } from '../utils/variables';
import Button from './Button';

const StyledHeader = styled.header`
  margin: 0;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const H1 = styled.h1`
  color: ${colors.theme.light_gray};
  padding: 0;
  margin: 0;
`;

const Actions = styled.nav`
  display: flex;
  gap: 1rem;
`;

const Header = () => {
  const handleClick = () => {
    console.log('click');
  };

  return (
    <StyledHeader>
      <H1>Initiative Tracker</H1>
      <Actions>
        <Button size="sm" outline unrounded onClick={handleClick}>
          Clear
        </Button>
        <Button size="sm" outline unrounded onClick={handleClick}>
          New
        </Button>
      </Actions>
    </StyledHeader>
  );
};

export default Header;
