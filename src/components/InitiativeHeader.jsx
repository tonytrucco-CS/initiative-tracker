import styled from 'styled-components';
import { colors } from '../utils/variables';

const Div = styled.div`
  display: grid;
  grid-template-columns: 5em 1fr 5em 5em 8em;
  border-bottom: solid 1px ${colors.theme.light_gray};
`;

const Span = styled.span`
  display: flex;
  padding: 0.5rem;
  color: ${colors.white};
  align-items: center;

  &:not(:last-of-type) {
    border-right: solid 1px ${colors.theme.light_gray};
  }
`;

const InitiativeHeader = () => {
  return (
    <Div>
      <Span></Span>
      <Span>Initiative</Span>
      <Span>Delay</Span>
      <Span>Ready</Span>
      <Span>Dying</Span>
    </Div>
  );
};

export default InitiativeHeader;
