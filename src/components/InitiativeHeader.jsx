import styled from 'styled-components';
import { colors } from '../utils/variables';

const Div = styled.div`
  display: grid;
  grid-template-columns: 4em 1fr 4em 4em 7em 2.75em;
  border-bottom: solid 1px ${colors.theme.light_gray};
`;

const Span = styled.span`
  display: flex;
  padding: 0.5rem;
  color: ${colors.white};
  align-items: center;
  justify-content: space-between;
  user-select: none;

  &:not(:last-of-type) {
    border-right: solid 1px ${colors.theme.light_gray};
  }
`;

const InitiativeHeader = () => {
  return (
    <Div>
      <Span></Span>
      <Span>
        Initiative
        <span className="material-symbols-outlined">timer</span>
      </Span>
      <Span>Delay</Span>
      <Span>Ready</Span>
      <Span>Dying</Span>
    </Div>
  );
};

export default InitiativeHeader;
