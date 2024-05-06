import styled from 'styled-components';
import Header from './components/Header';
import List from './components/List';
import Initiative from './components/Initiative';
import InitiativeContext from './context/InitiativeContext';
import { useEffect, useState } from 'react';
import { addTouchClass } from './utils/helpers';
import Notes from './components/Notes';
import Empty from './components/Empty';
import { CssBaseline, Drawer, Paper, ThemeProvider } from '@mui/material';
import ActionBar from './components/ActionBar';
import { darkTheme } from './styles/Theme';
import { colors } from './utils/variables';

const INIT = {
  active: undefined,
  round: undefined,
  participants: [],
};

const Main = styled.main`
  margin: 0 1rem 1rem;
  flex: 1;
`;

const Hidden = styled.span`
  opacity: 0;
  position: absolute;
  width: 1px;
  height: 1px;
  user-select: none;
  pointer-events: none;
`;

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
          <Paper
            sx={{
              display: 'grid',
              gridTemplateRows: '1fr 56px',
              position: 'relative',
              height: '100%',
            }}
          >
            <Initiative>
              {initValues.participants.length > 0 ? <List /> : <Empty />}
            </Initiative>
            <ActionBar />
          </Paper>
        </Main>
        <Drawer
          keepMounted
          open={open}
          onClose={() => toggleDrawer(false)}
          anchor="right"
        >
          <Notes toggleDrawer={toggleDrawer} />
        </Drawer>
        <Hidden className="material-symbols-outlined" aria-hidden>
          skull
        </Hidden>
      </ThemeProvider>
    </InitiativeContext.Provider>
  );
}

export default App;
