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

var c = true;

const theme = createTheme({
  
})

const mqtt    = require('precompiled-mqtt');
const options = {
  clean: c,
  //protocol: "ws",
  // Auth
  clientId: 'mission-control2',
  retain: false,
	// clientId uniquely identifies client
	// choose any string you wish
  username: "mission-control",
  password: "upon map citadel overstep",
};






// preciouschicken.com is the MQTT topic

function App() {

  //Start variables --------------------------------------------------------
  var startPos ={"position": {
    "x": 0,
    "y": 0
    },
  "rotation": 0};

  var startPos1 = {"position": {
    "x": 0,
    "y": 0
    }}
    var startrotation1 = {"rotation":0}

  let startBattery = {"battery_level":0, "charging":"false", "voltage": 0}
  let startVelocity = {"left":0, "right":0}
  let startLidar = {"segments":[-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0]}
  let startPlan = {"plan": [] }
  let startPath = {"path":[] }  
  let count;


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
 const [pictureOK, setPictureOK] = useState (false)
  
  const [cmessage, setCmessage] = useState([]);
  const [imageEncoded, setImage] = useState("");
  const [landscapeEncoded, setLandscape] = useState("");

  const [update, setUpdate] = useState({Position: startPos1, Rotation: startrotation1, Lidar: startLidar, Battery: startBattery, Velocity: startVelocity });
  const [count1, setCount1] = useState(0);

//MQTTT


const [client, setClient] = useState(null);
const [connectStatus, setConnectStatus] = useState("");
const [payload, setPayload] = useState("");
var oldmessage;

function handlemessage(message, severity){
  var obj = {"message":message, "severity":severity}
  if(message != oldmessage){
    setCmessage(myArray => [obj, ...myArray])
  }
  oldmessage = message;
}

function routemessage(topic, message){
  if(topic == "simulation/robot/position_and_rotation"){
    //console.log(JSON.parse(message))
    let dat = JSON.parse(message)
    
    setPosrot(JSON.parse(message))
    //console.log("uppdaterar")
  
    
  }
  else if(topic == "mc/landscape"){
    let data = JSON.parse(message);

    if(data.imageBroken == 0){
      setPictureOK(true)
      setLandscape(data.image)

      if(data.sensorInImage == 1){
        handlemessage("Sensor in image!", "success")
        if(data.sensorBroken == 1){
          handlemessage("Sensor broken!", "warning")  
        }
      }
      else{
        handlemessage("Sensor not in image!", "warning")}
    }
    else{
      handlemessage("Image broken! Type of damage: " + data.typeOfNoise, "warning")
      setPictureOK(false)
    }
  }
  else if(topic == "tp/info"){
    let status = JSON.parse(message);
    setPlanStatus(status);
      if (status.status != "OK") {
        handlemessage("Error from task planning: " + status.comment, "error")
      }
      else {
        handlemessage("Task " + status.id + " is finished", "success")
      }
  }
  else if(topic == "simulation/lidar"){
    //setLidar(JSON.parse(message));
  }

  else if(topic == "simulation/images/satellite"){
   setImage(JSON.parse(message));
   console.log("bilden är här")
   //client.unsubscribe("simulation/images/satellite")
   
  }
  else if(topic == "simulation/robot/battery"){
    //client.unsubscribe("simulation/robot/battery")
    //console.log("batteri kom")
    setBattery(JSON.parse(message))
    
    //setTimeout(client.subscribe("simulation/robot/battery"), 10000);
  }
  else if(topic == "simulation/robot/velocity"){
    //client.unsubscribe("simulation/robot/velocity")
    setVelocity(JSON.parse(message))
    //setTimeout(client.subscribe("simulation/robot/velocity"), 5000);
  }
  else if(topic == "tp/plan"){
    setPlan(JSON.parse(message))
    handlemessage("New plan!", "info")
  }
  else if(topic == "simulation/current_path"){
    setPath(JSON.parse(message))
    handlemessage("New path!", "info")
  }
  // else if(topic == "simulation/robot/collision"){
  //   setPath(JSON.parse(message))
  //   handlemessage("Collision detected", "error")
  // }
  else if(topic == "mc/message"){
    handlemessage(message, "info")
  }
  else if(topic.slice(0, -1) == "simulation/sensor/status/"){
    var id = parseInt(topic.substr(topic.length - 1));
    let dat = JSON.parse(message);

    const newJSON = {...{"id":id}, ...dat}
    //console.log(newJSON)
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
    {fakeList2.push(newJSON)
      handlemessage("Sensor " + newJSON.id + " has been placed", "info")
     } 
    else
      {handlemessage("Sensor " + newJSON.id + " is in inventory", "info")}
    setPlacedSensors(fakeList2)


  }

}


useEffect(()=>{
  setClient(mqtt.connect('wss://tharsis.oru.se:8884', options));
},[])


 useEffect(() => {
  
  if (client) {
   
    client.on('connect', () => {
      console.log(options)
      handlemessage("Connected to MQTT Server", "success")
      setConnectStatus('Connected');
      console.log("connected")
    });
    client.on('error', (err) => {
      handlemessage("Connection error to MQTT Server: " + err, "warning")
      console.error('Connection error: ', err);
      client.end();
    });
    client.on('reconnect', () => {
      options.clean = false;
      console.log(options)
      handlemessage("Reconnecting to MQTT Server..", "warning")
      setConnectStatus('Reconnecting');
      console.log("reconnecting")

    });
    client.on('message', (topic, message) => {
      const payload = { topic, message: message.toString() };
      
      //console.log("MEDDELANDE_________________________")
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
  setImage(data)
  //console.log(data)
})}, [])



// fetch('https://localhost:7071/todo/landscape')
//   .then(res => {
//   return res.json();
// })
// .then(data => {
//   if(data.imageBroken == 0){
//   setLandscape(data.image)
//   if(data.sensorinimage == 1){
//     setCmessage("Sensor in image!")
//     if(data.sensorbroken == 1){
//       setCmessage("Sensor broken!")
//     }
//   }
//   else{setCmessage("Sensor not in image!")}
//   }
//   else
//   {
//     setCmessage("Image broken! Type of damage: " + data.typeOfNoise)
//   }
  
// })

// }, [count1]);

// useEffect (()=> {
//   var startPos ={"position": {
//     "x": 0,
//     "y": 0
//                     }};
//     let countX = 0;
//     let countY = 0;
//   const interval = setInterval(()=> {
//     countX = countX +0.05;
//     countY = countX + 0.05;
//     //console.log(countX);
//     /**setPos({"position": {
//       "x": countX,
//       "y": countY
//                       }
                    
//                     })**/

//   }, 1);
//     return () => clearInterval(interval);
//   }, [])


  useEffect(() => {
   

    const interval = setInterval(() => {
      fetch('https://localhost:7071/todo/update2')
      .then(res => {
      return res.json();
    })
    .then(data => {
        //console.log(data)
        //console.log(JSON.parse(data.position))
        
        
        //setSensors(sensorList); 
        let position1 = JSON.parse(data.position)
        if(position1 == null){position1 = startPos}
        let rotation1 = JSON.parse(data.rotation)
        if(rotation1 == null){rotation1 = startrotation1}

        let velocity1 = JSON.parse(data.velocity)
        if(velocity1 == null){velocity1 = startVelocity}
        let lidar1 = JSON.parse(data.lidar)
        if(lidar1 == null){lidar1 = startLidar}
        let battery1 = JSON.parse(data.battery)
        if(battery1 == null){battery1 = startBattery}
        
        var alldata = {Battery: battery1, Rotation: rotation1, Position:position1, Velocity:velocity1, Lidar: lidar1}
        //console.log(alldata)
        setUpdate(alldata)
        startPos = position1
        startrotation1 = rotation1
        startVelocity = velocity1
        startLidar = lidar1
        startBattery = battery1
      
    })}, 200);
    return () => clearInterval(interval);
  }, []);

  // const [lidar, setLidar] = useState([
  //   { "segments": [-1, -1, -1, -1, -1]},
  // ]);

  return (
    
    <ThemeProvider theme={theme}>
      <ButtonAppBar sx={{zIndex:"3"}} sensors={placedSensors} battery={update.Battery} velocity={update.Velocity} sub={client}></ButtonAppBar>
      <Box sx={{p:"20px"}}>
        <Grid container>
          <Grid item xs={"auto"}>
            <Map position={update.Position} sensors={placedSensors} rotation={update.Rotation} routen={path.path} satellite ={imageEncoded} allSensors={allSensors}/>
            <Console2 message={cmessage}/> 
          </Grid>   
          <Grid item xs={"7"} sx={{bgcolor: "white", pl:"20px"}}>
            <Masonry columns={3} spacing={2}>
                <PlanningComponent plans={plan} status={planStatus}/>
                <Photo landscape = {landscapeEncoded}  image = {pictureOK}/>
                <SendPoints sub={client}/>
                <AlienCounter lidar={update.Lidar}></AlienCounter>
                <Control />
            </Masonry>
            </Grid>
        </Grid>
      </Box>
    </ThemeProvider>

  );
}

export default App;
