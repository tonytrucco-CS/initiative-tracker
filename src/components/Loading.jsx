import { fonts, colors } from '../utils/variables';
import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  align-items: center;
  justify-content: center;
  padding: 3em;
`;

const LoadText = styled.span`
  font-size: 3rem;
  color: ${colors.theme.light_gray};
  font-family: ${fonts.heading};
  text-align: center;
  justify-content: center;
  height: 100%;
`;

const Loading = () => {
  return (
    <Div>
      <LoadText>Looking for existing party...</LoadText>
    </Div>
  );
};

export default Loading;
