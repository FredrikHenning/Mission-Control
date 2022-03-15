import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Notes from './pages/Notes'
import Create from './pages/Create'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple, grey } from '@mui/material/colors';
import ResponsiveAppBar from './components/ResponsiveAppbar';
import ButtonAppBar from './components/navbar';
import BasicSpeedDial from './components/SpeedDial.js';
import Map from './Map';
import SendPoints from './components/SendPoints';
import Console from './components/console';


const theme = createTheme({

})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
      <ButtonAppBar>
        <Switch>
          <Route exact path="/">
          </Route>
          <Route path="/create">
            <Create />
          </Route>
        </Switch>
      </ButtonAppBar>
      </Router>

      <Map/>
      <SendPoints/>
      <BasicSpeedDial />
      <Console/>
    </ThemeProvider>
  );
}

export default App;
