import styled from 'styled-components';
import Header from './components/Header';
import List from './components/List';
import Initiative from './components/Initiative';
import InitiativeContext from './context/InitiativeContext';
import { useEffect, useState } from 'react';
import { addTouchClass } from './utils/helpers';
import Notes from './components/Notes';
import Empty from './components/Empty';
import { CssBaseline, Drawer, ThemeProvider, createTheme } from '@mui/material';
import ActionBar from './components/ActionBar';

const INIT = {
  active: undefined,
  round: undefined,
  participants: [],
};

const Main = styled.main`
  padding: 0 1rem 1rem;
  flex: 1;
  position: relative;
`;

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [initValues, setInitValues] = useState(INIT);
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => {
    setOpen(newOpen);
  };

  useEffect(() => {
    addTouchClass();
  }, []);

  return (
    <InitiativeContext.Provider value={{ initValues, setInitValues }}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header toggleDrawer={toggleDrawer} />
        <Main>
          <Initiative>
            {initValues.participants.length > 0 ? <List /> : <Empty />}
          </Initiative>
          <Drawer
            keepMounted
            open={open}
            onClose={() => toggleDrawer(false)}
            anchor="right"
          >
            <Notes toggleDrawer={toggleDrawer} />
          </Drawer>
          <ActionBar />
        </Main>
      </ThemeProvider>
    </InitiativeContext.Provider>
  );
}

export default App;
