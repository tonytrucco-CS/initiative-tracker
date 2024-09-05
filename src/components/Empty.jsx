import styled from 'styled-components';
import { colors, fonts } from '../utils/variables';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  align-items: center;
  justify-content: center;
  padding: 3em;
`;

const Title = styled.span`
  font-size: 3rem;
  color: ${colors.theme.light_gray};
  font-family: ${fonts.heading};
  text-align: center;
`;

const SubTitle = styled.span`
  font-size: 2rem;
  color: ${colors.theme.light_gray};
  font-family: ${fonts.heading};
  text-align: center;
`;

const Empty = () => {
  return (
    <Div>
      <Title>Don&apos;t you have anything to fight?</Title>
      <SubTitle>Use the button below to add something from the list</SubTitle>
    </Div>
  );
};

export default Empty;
