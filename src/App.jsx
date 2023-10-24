import styled from 'styled-components';
import Header from './components/Header';
import List from './components/List';
import Initiative from './components/Initiative';
import InitiativeContext from './context/InitiativeContext';
import { useEffect, useState } from 'react';
import { addTouchClass } from './utils/helpers';
import Notes from './components/Notes';
import { breakpoints } from './utils/variables';
import Empty from './components/Empty';

const INIT = {
  active: undefined,
  round: undefined,
  participants: [],
};

const Main = styled.main`
  padding: 0 1rem 1rem;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 1rem;

  @media only screen and (max-width: ${breakpoints.lg}) {
    grid-template-columns: 3fr 1fr;
  }

  @media only screen and (max-width: ${breakpoints.md}) {
    grid-template-columns: auto;
    grid-template-rows: 4fr 1fr;
  }
`;

function App() {
  const [initValues, setInitValues] = useState(INIT);

  useEffect(() => {
    addTouchClass();
  }, []);
  return (
    <InitiativeContext.Provider value={{ initValues, setInitValues }}>
      <Header />
      <Main>
        <Initiative>
          {initValues.participants.length > 0 ? <List /> : <Empty />}
        </Initiative>
        <Notes />
      </Main>
    </InitiativeContext.Provider>
  );
}

export default App;
