import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Notes from './pages/Notes'
import Create from './pages/Create'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple, grey } from '@mui/material/colors';
import ResponsiveAppBar from './components/ResponsiveAppbar';
import ButtonAppBar from './components/navbar';
import Control from './components/Control.js';
import Map from './Map';
import SendPoints from './components/SendPoints';
import Console from './components/console';
import Console2 from './components/console2';
import MapImage from './components/MapImage';
import PlanningComponent from './components/Planning';
import './app.css';
import React, { useState, useEffect } from 'react';
import SensorList from './components/SensorList';



const theme = createTheme({

})

function App() {
  var startPos ={"position": {
    "x": 0,
    "y": 0
                    }};
  const [position, setPosition] = useState(startPos);
  useEffect(() => {
    const interval = setInterval(() => {
      fetch('https://localhost:7071/todo/update')
      .then(res => {
      return res.json();
    })
    .then(data => {
        setPosition(JSON.parse(data.message)); 
      
    })}, 1000);
    return () => clearInterval(interval);
  }, []);

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
      <div class="flexbox-container">
      <Map position={position}/>
      <SensorList/>
      <Console2 position={position}/>
      </div>
      <SendPoints/>
      <Control />
      <PlanningComponent/>
      
    </ThemeProvider>
  );
}

export default App;
