import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Notes from './pages/Notes'
import Create from './pages/Create'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple, grey } from '@mui/material/colors';
import ResponsiveAppBar from './components/ResponsiveAppbar';
import BasicSpeedDial from './components/SpeedDial.js';

const theme = createTheme({

})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
      <ResponsiveAppBar>
        <Switch>
          <Route exact path="/">
            <Notes />
          </Route>
          <Route path="/create">
            <Create />
          </Route>
        </Switch>
      </ResponsiveAppBar>
      </Router>
      <BasicSpeedDial />
    </ThemeProvider>
  );
}

export default App;
