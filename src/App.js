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
  const [manualcontrol, setManualcontrol] = useState(0);
  const [sensors, setSensors] = useState([]);
  const [Plans, setPlans] = useState([]);
  const [pStatus, setpStatus] = useState();

  const [Battery, setBattery] = useState();
  const [Rotation, setRotation] = useState();
  const [Velocity, setVelocity] = useState();
  const [Routen, setRouten] = useState();
  const [consolemessage, setMessage] = useState();



  useEffect(() => {
    const interval = setInterval(() => {
      fetch('https://localhost:7071/todo/update')
      .then(res => {
      return res.json();
    })
    .then(data => {
        setPosition(JSON.parse(data.position));
        const sensorList = [];
        for (let i = 0; i < data.sensors.length; i++) {
           sensorList[i] = JSON.parse(data.sensors[i]);  
        }
        setSensors(sensorList); 
        setPlans(JSON.parse(data.plans).plan);
        setpStatus(JSON.parse(data.status));

        setRotation(JSON.parse(data.rotation));
        setBattery(JSON.parse(data.battery));
        setVelocity(JSON.parse(data.velocity));
        setRouten(JSON.parse(data.route))
        setMessage(data.message)
      
    })}, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
      <ButtonAppBar sensors={sensors} battery={Battery} velocity={Velocity}>
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
      <Map position={position} sensors={sensors} rotation={Rotation} routen={Routen}/>
      <Console2 position={position} message={consolemessage}/>
      </div>
      <SendPoints/>
      <Control />
      <PlanningComponent plans={Plans} status={pStatus}/>
      
    </ThemeProvider>
  );
}

export default App;
