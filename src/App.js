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
import Console2 from './components/Console2';
import MapImage from './components/MapImage';
import PlanningComponent from './components/Planning';
import './app.css';
import React, { useState, useEffect } from 'react';
import SensorList from './components/SensorList';
import { parseJSON } from 'date-fns';
import Photo from './components/photo';
import { Grid } from '@mui/material';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';


const theme = createTheme({

})

function App() {
  var startPos ={"position": {
    "x": 0,
    "y": 0
                    }};

  //const [position, setPosition] = useState(startPos);



  const [manualcontrol, setManualcontrol] = useState(0);


  const [imageEncoded, setImage] = useState("");
  const [landscapeEncoded, setLandscape] = useState("");

  const [update, setUpdate] = useState({Plans: [], Status: {}, Rotation: "", Battery:"", Velocity:{}, Routen:[], Message: "", Sensors: [], Position: startPos});
  var count1;

useEffect(() => {
  fetch('https://localhost:7071/todo/satellite')
  .then(res => {
  return res.json();
})
.then(data => {
  setImage(data)
  //console.log(data)
})
fetch('https://localhost:7071/todo/landscape')
  .then(res => {
  return res.json();
})
.then(data => {
  setLandscape(data)
  console.log(data)
})

}, [count1]);


  useEffect(() => {
   

    const interval = setInterval(() => {
      fetch('https://localhost:7071/todo/update')
      .then(res => {
      return res.json();
    })
    .then(data => {
        //console.log(data)
        //console.log(JSON.parse(data.position))
        let position;
        if(data.position == null){
          position = update.Position;
          console.log("NULLILIIL")
        }
        else{
          position = JSON.parse(data.position)

        }
        
        const sensorList = [];
        const sensorListPlaced = [];

        for (let i = 0; i < data.sensors.length; i++) {
           sensorList[i] = JSON.parse(data.sensors[i]);
          //if(sensorList[i].is_placed == true){
            //sensorListPlaced.push(sensorList[i]) 
          }
           
        
        //setSensors(sensorList); 
        let plans = JSON.parse(data.plans).plan;
        let status = JSON.parse(data.status)

        let rotation;
        if(data.rotation == null){
          rotation = update.Rotation;
          console.log("NULLILIIL")
        }
        else{
         rotation = JSON.parse(data.rotation)
        }
        let battery = JSON.parse(data.battery)
        let velocity = JSON.parse(data.velocity)
        console.log(data.route)
        let routen = JSON.parse(data.route).path
        let message = data.message;
        var alldata = {Plans: plans, Status: status, Rotation: rotation, Battery:battery, Velocity:velocity, Routen:routen, Message: message, Sensors: sensorList, Position: position}
        setUpdate(alldata)
      
    })}, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ButtonAppBar sensors={update.Sensors} battery={update.Battery} velocity={update.Velocity}></ButtonAppBar>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <Map position={update.Position} sensors={update.Sensors} rotation={update.Rotation} routen={update.Routen} satellite ={imageEncoded} /> 
          </Grid>
          <Grid item md={3}>
            <Photo landscape = {landscapeEncoded}/ >
          </Grid>
          <Grid item md={3}>
            <SendPoints/>
          </Grid>
          <Grid item md={6}>
            <PlanningComponent plans={update.Plans} status={update.pStatus}/>
          </Grid>
          <Grid item md={6}>
            <Console2 message={update.Message}/>
          </Grid>
        </Grid>
    </ThemeProvider>
  );
}

export default App;
