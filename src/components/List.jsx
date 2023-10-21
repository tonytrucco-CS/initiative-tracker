import styled from 'styled-components';
import Participant from './Participant';
import Row from './Row';
import { useContext } from 'react';
import ParticipantContext from '../context/ParticipantContext';

const Flex = styled.div`
  display: flex;
  gap: 0.25rem;
  flex-direction: column;
`;

const List = () => {
  const { partValues } = useContext(ParticipantContext);
  return (
    <Flex>
      {partValues.map((part) => {
        const { name, type, initiative, action, status } = part;
        return (
          <Row key={name} status={status} name={name} action={action}>
            <Participant
              name={name}
              type={type}
              initiative={initiative}
              action={action}
            />
          </Row>
        );
      })}
    </Flex>
  );
};

export default List;
