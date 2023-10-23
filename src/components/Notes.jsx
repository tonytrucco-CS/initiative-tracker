import styled from 'styled-components';
import { breakpoints, colors, fonts } from '../utils/variables';
import { transparentize } from 'polished';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const H2 = styled.h2`
  margin: 0;
  padding: 0;
  color: ${colors.theme.light_gray};
`;

const TextArea = styled.textarea`
  height: calc(100vh - 3.7em);
  line-height: 1.5;
  font-size: 2rem;
  font-family: ${fonts.body};
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${transparentize(0.75, colors.white)};
  color: ${colors.pure_white};
  transition: box-shadow 0.3s;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${transparentize(0.5, colors.white)};
  }

  @media only screen and (max-width: ${breakpoints.md}) {
    height: 15.5vh;
    font-size: 1.5rem;
  }
`;

const Notes = () => {
  return (
    <Div>
      <H2>Notes</H2>
      <TextArea name="Notes" />
    </Div>
  );
};

export default Notes;
