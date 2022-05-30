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

  //Start variables --------------------------------------------------------
  var startPos ={"position": {
    "x": 5,
    "y": 5
    },
  "rotation": 0};

  let startBattery = {"battery_level":0, "charging":"false", "voltage": 0}
  let startVelocity = {"left":0, "right":0}
  let startLidar = {"segments":[-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0]}
  let startPlan = {"plan": [] }
  let startPath = {"path":[] }  


//Global variables----------------------------------------------------------------
 const [posrot, setPosrot] = useState(startPos);
 const [battery, setBattery] = useState(startBattery);
 const [velocity, setVelocity] = useState(startVelocity);
 const [planStatus, setPlanStatus] = useState();
 const [lidar, setLidar] = useState(startLidar);
 const [plan, setPlan] = useState(startPlan);
 const [path, setPath] = useState(startPath);
 const [placedSensors, setPlacedSensors] = useState([])
 const [allSensors, setAllSensors] = useState([])
  
  const [cmessage, setCmessage] = useState("");
  const [imageEncoded, setImage] = useState("");
  const [landscapeEncoded, setLandscape] = useState("");

  const [update, setUpdate] = useState({Message: "", Sensors: []});
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
    console.log(JSON.parse(message))
    let dat = JSON.parse(message)
    if(dat.position.x.toFixed(4) != posrot.position.x.toFixed(4) || dat.position.y.toFixed(4) != posrot.position.y.toFixed(4)|| dat.rotation.toFixed(2) != posrot.rotation.toFixed(2) ){
    setPosrot(JSON.parse(message))
    console.log("uppdaterar")
  }
    
  }
  else if(topic == "mc/landscape"){
    let data = JSON.parse(message);
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
      
  }
  else if(topic == "tp/status"){
    let status = JSON.parse(message);
    setPlanStatus(status);
      if (status.status != "OK") {
        setCmessage("Error from task planning: " + status.comment)
      }
      else {
        setCmessage("Task " + status.id + " is finished")
      }
  }
  else if(topic == "simulation/lidar"){
    setLidar(JSON.parse(message));
  }

  else if(topic == "simulation/images/satellite"){
   setImage(JSON.parse(message));
  }
  else if(topic == "simulation/robot/battery"){
    setBattery(JSON.parse(message))
  }
  else if(topic == "simulation/robot/velocity"){
    setVelocity(JSON.parse(message))
  }
  else if(topic == "tp/plan"){
    setPlan(JSON.parse(message))
  }
  else if(topic == "simulation/current_path"){
    setPath(JSON.parse(message))
  }
  else if(topic.slice(0, -1) == "simulation/sensor/status/"){
    var id = parseInt(topic.substr(topic.length - 1));
    let dat = JSON.parse(message);

    const newJSON = {...{"id":id}, ...dat}
    console.log(newJSON)
    var fakeList = allSensors;
    for(var i = 0; i<fakeList.length; i++){
      if(fakeList[i].id == newJSON.id){
        fakeList.splice(i,1)
      }  
    }
    fakeList.push(newJSON)
    setAllSensors(fakeList)

    var fakeList2 = placedSensors;
    for(var i = 0; i<fakeList2.length; i++){
      if(fakeList2[i].id == newJSON.id){
        fakeList2.splice(i,1)
      }  
    }
    if(newJSON.is_placed == true)
    {fakeList2.push(newJSON)}
    setPlacedSensors(fakeList2)


  }

}





useEffect(()=>{
  setClient(mqtt.connect('wss://tharsis.oru.se:8884', options));
},[])


useEffect(() => {
  
  if (client) {
   
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
      console.log("MEDDELANDE_________________________")
      //console.log(payload.topic)
      
      routemessage(payload.topic, payload.message)
    });
  }
}, [client]);



//MQTTSLUT-------------------------------------------------------------







useEffect(() => {
  fetch('https://localhost:7071/todo/satellite')
  .then(res => {
  return res.json();
})
.then(data => {
  //setImage(data)
  //console.log(data)
})
fetch('https://localhost:7071/todo/landscape')
  .then(res => {
  return res.json();
})
.then(data => {
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
        
        
        //setSensors(sensorList); 
        
        
        
        
        let message = data.message;

        var alldata = {Message: message, }
        setUpdate(alldata)
        if(cmessage != message){
        setCmessage(message)}
      
    })}, 1000);
    return () => clearInterval(interval);
  }, []);


  return (
    
    <ThemeProvider theme={theme}>
      <ButtonAppBar sensors={placedSensors} battery={battery} velocity={velocity} sub={client}></ButtonAppBar>
      <Box sx={{p:"20px"}}>
        <Grid container>
          <Grid item xs={5}>
            <Map position={posrot} sensors={placedSensors} rotation={posrot} routen={path.path} satellite ={imageEncoded} allSensors={allSensors}/> 
          </Grid>   
          <Grid item xs={7}>
            <Masonry columns={3} spacing={2}>
                <PlanningComponent plans={plan} status={planStatus}/>
                <Photo landscape = {landscapeEncoded}/>
                <SendPoints/>
                <AlienCounter lidar={lidar}></AlienCounter>
                <Console2 message={cmessage}/>
                <Control/>
            </Masonry>
            </Grid>
        </Grid>
      </Box>
    </ThemeProvider>

  );
}

export default App;
