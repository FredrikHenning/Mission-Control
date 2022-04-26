import { useEffect, useState } from "react";
import * as React from 'react'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import RoomSharpIcon from '@mui/icons-material/RoomSharp';
import SensorsSharpIcon from '@mui/icons-material/SensorsSharp';
import SensorDetails from "./SensorDetails";


const SensorList = () => {
    const [sensorList, setSensorList] = useState();
    const[nodes, setNodes] = useState('');

    const [open, setOpen] = React.useState(false);
    const [high, setHigh] = useState(700);


    const handleOpen = () => {
      setOpen(!open);

    };
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
      setAnchorEl(anchorEl ? null : event.currentTarget.className[68]);
      console.log(event.currentTarget.className[68])
    }
    const openIn = Boolean(anchorEl);

    const handleClose = () => {
       setOpen(!open);
        
      };

    useEffect(() => {
        
        console.log("hej");
        
        fetch('http://localhost:8000/sensors')
        .then(res => {
            return res.json();
        })
        // .then( ()=> {
        //     
        // })
        .then(data => {
            setSensorList(data);
            console.log(data);
        })
        console.log(sensorList);
    },[nodes]);

    const handleSensor = (id) => {
      console.log(id)
    }

    // const createPoint = () => {
    //   // var point = {command, x, y, color, sensor}

    //   fetch('http://localhost:8000/points', {
    //     method: 'POST',
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(point)
    //   })
    // }

    return ( 
        <List
        sx={{ width: '100%', maxWidth: 250, maxHeight: high, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"

      >
          {sensorList && sensorList.map((sensor) => {
            let sensID = {
              id: sensor.sensor,
              x: sensor.position.x,
              y: sensor.position.y,

            }
              return(
                  <div key={sensor.sensor}>
                <ListItemButton className={sensor.sensor} onClick={handleClick}>
                <ListItemIcon>
                  <SensorsSharpIcon/>
                </ListItemIcon>
                <ListItemText primary={"Sensor: " + sensor.sensor} />
                {openIn ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
               <Collapse in={openIn} timeout="auto" unmountOnExit >
               <List component="div" disablePadding>
                 <ListItemButton sx={{ pl: 3, maxWidth: 250 }}>
                   <ListItemIcon>
                     
                     <RoomSharpIcon/>
                     <SensorDetails sensID = {sensID}/>
                   </ListItemIcon>
                   {/* <Button onClick={handleSensor(sensor.sensor)}>Go to</Button> <Button> Pick up</Button> */}
                 </ListItemButton>
               </List>
             </Collapse>

             </div>
              )
          })}
        
      </List>

     );
}
 
export default SensorList;