import styled from 'styled-components';
import Header from './components/Header';
import List from './components/List';
import Initiative from './components/Initiative';
import InitiativeContext from './context/InitiativeContext';
import { useState } from 'react';

const INIT = {
  active: 'Skiski',
  round: 1,
  participants: [
    {
      name: 'Skiski',
      type: 'pc',
      initiative: 25,
      action: 'normal',
      status: 'dying1',
      conditions: [],
    },
    {
      name: 'Red Dragon',
      type: 'foe',
      initiative: 15,
      action: 'delay',
      status: 'alive',
      conditions: [],
    },
    {
      name: 'Denithorne',
      type: 'ally',
      initiative: 31,
      action: 'ready',
      status: 'alive',
      conditions: ['frightened'],
    },
    {
      name: 'Spinning Blades',
      type: 'hazard',
      initiative: 4,
      action: 'normal',
      status: 'alive',
      conditions: [],
    },
  ],
};

const Main = styled.main`
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

function App() {
  const [initValues, setInitValues] = useState(INIT);
  return (
    <InitiativeContext.Provider value={{ initValues, setInitValues }}>
      <Header />
      <Main>
        <Initiative>
          <List />
        </Initiative>
      </Main>
    </InitiativeContext.Provider>
  );
}

export default App;
