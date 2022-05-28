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
import { parseJSON } from 'date-fns';
import Photo from './components/photo';
import { Grid } from '@mui/material';
import AlienCounter from './components/alienCounter';
//import GridList from '@material-ui/core/GridList';
//import GridListTile from '@material-ui/core/GridListTile';
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';


const theme = createTheme({
  
})

var mqtt    = require('precompiled-mqtt');
var options = {
  clean: true,
  connectTimeout: 4000,
  //protocol: "ws",
  // Auth
  clientId: 'mission-control',
	// clientId uniquely identifies client
	// choose any string you wish
	
  username: "mission-control",
  password: "upon map citadel overstep" 	
};




// preciouschicken.com is the MQTT topic

function App() {
  var startPos ={"position": {
    "x": 0,
    "y": 0
    },
  "rotation": 0};

  //const [position, setPosition] = useState(startPos);


  const [posrot, setPosrot] = useState(startPos);
  //console.log(posrot.position)
  const [manualcontrol, setManualcontrol] = useState(0);
  const [cmessage, setCmessage] = useState("");
  //const [pos, setPos] = useState(startPos);
  const [imageEncoded, setImage] = useState("");
  const [landscapeEncoded, setLandscape] = useState("");

  const [update, setUpdate] = useState({Plans: [], Status: {}, Rotation: "", Battery:"", Velocity:{}, Routen:[], Message: "", Sensors: [], Position: startPos});
  var count1;


//MQTTT


const [client, setClient] = useState(null);
const [connectStatus, setConnectStatus] = useState("");
const [payload, setPayload] = useState("");
const mqttConnect = () => {
  setConnectStatus('Connecting');
  //setClient(mqtt.connect('wss://tharsis.oru.se:8884', options));
};

function routemessage(topic, message){
  if(topic == "simulation/robot/position_and_rotation"){
    //console.log(JSON.parse(message))
    setPosrot(JSON.parse(message))
  }

}





useEffect(()=>{
  setClient(mqtt.connect('wss://tharsis.oru.se:8884', options));
},[])


useEffect(() => {
  //console.log("Inne här-----------------------------------")
  //console.log(client)
  if (client) {
   // console.log("client funkar tror jag")
    //console.log(client)
    client.on('connect', () => {
      setConnectStatus('Connected');
     // console.log("connected")
    });
    client.on('error', (err) => {
      console.error('Connection error: ', err);
      client.end();
    });
    client.on('reconnect', () => {
      setConnectStatus('Reconnecting');
    });
    client.on('message', (topic, message) => {
      const payload = { topic, message: message.toString() };
      //console.log("MEDDELANDE_________________________")
      //console.log(payload)
      routemessage(payload.topic, payload.message)
      //setPayload(payload);
    });
  }
}, [client]);



//MQTTSLUT







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
  //console.log(data)
  console.log("VIIIIIIIIIIIII är i lanscape")
  console.log(data)
  if(data.imageBroken == 0){
  setLandscape(data.image)
  if(data.sensorinimage == 1){
    setCmessage("Sensor in image!")
    if(data.sensorbroken == 1){
      setCmessage("Sensor broken!")
    }
  }
  else{setCmessage("Sensor not in image!")}
  }
  else
  {
    setCmessage("Image broken! Type of damage: " + data.typeOfNoise)
  }
  
})

}, [count1]);

useEffect (()=> {
  var startPos ={"position": {
    "x": 0,
    "y": 0
                    }};
    let countX = 0;
    let countY = 0;
  const interval = setInterval(()=> {
    countX = countX +0.05;
    countY = countX + 0.05;
    //console.log(countX);
    /**setPos({"position": {
      "x": countX,
      "y": countY
                      }
                    
                    })**/

  }, 1);
    return () => clearInterval(interval);
  }, [])


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
          //console.log("NULLILIIL")
        }
        else{
          position = JSON.parse(data.position)

        }
        const sensorList = [];
        const sensorListPlaced = [];

        for (let i = 0; i < data.sensors.length; i++) {
          //console.log(data.sensors[i])
           sensorList[i] = JSON.parse(data.sensors[i]);
          if(sensorList[i].is_placed == true){
            sensorListPlaced.push(sensorList[i]) 
            
          }
        
        }
        
        //setSensors(sensorList); 
        let plans = JSON.parse(data.plans).plan;

        let status = JSON.parse(data.status)
      if (status.id == update.Status.id) {
        if (status.status != "OK") {
          setCmessage("Error from task planning: " + status.comment)
          
        }
        else {
          setCmessage("Task " + status.id + " is finished")
          console.log("I if satsen---------------------------------------")
        }
      }

  

        let rotation;
        if(data.rotation == null){
          rotation = update.Rotation;
         // console.log("NULLILIIL")
        }
        else{
         rotation = JSON.parse(data.rotation)
        }
        //console.log(data.velocity)
        let battery = JSON.parse(data.battery)
        let velocity = JSON.parse(data.velocity)
        
        let routen = JSON.parse(data.route).path
        let message = data.message;

        var alldata = {Plans: plans, Status: status, Rotation: rotation, Battery:battery, Velocity:velocity, Routen:routen, Message: message, Sensors: sensorListPlaced, Position: position, AllSensors: sensorList}
        setUpdate(alldata)
        if(cmessage != message){
        setCmessage(message)}
      
    })}, 1000);
    return () => clearInterval(interval);
  }, []);

  const [lidar, setLidar] = useState([
    { "segments": [-1, -1, -1, -1, -1]},
  ]);

  return (
    
    <ThemeProvider theme={theme}>
      <ButtonAppBar sensors={update.Sensors} battery={update.Battery} velocity={update.Velocity} sub={client}></ButtonAppBar>
      <Box sx={{p:"20px"}}>
        <Grid container>
          <Grid item xs={5}>
            <Map position={posrot} sensors={update.Sensors} rotation={posrot} routen={update.Routen} satellite ={imageEncoded} allSensors={update.AllSensors}/> 
          </Grid>   
          <Grid item xs={7}>
            <Masonry columns={3} spacing={2}>
              <PlanningComponent plans={update.Plans} status={update.pStatus}/>
                <Photo landscape = {landscapeEncoded}/>
                <SendPoints/>
                <AlienCounter lidar={lidar}></AlienCounter>
                <Console2 message={cmessage}/>
            </Masonry>
            </Grid>
        </Grid>
      </Box>
    </ThemeProvider>

  );
}

export default App;
