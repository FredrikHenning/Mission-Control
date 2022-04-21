import { useEffect, useState } from "react";
import * as React from 'react'

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';


const SensorList = () => {
    const [sensorList, setSensorList] = useState();
    const[nodes, setNodes] = useState('');

    const [open, setOpen] = React.useState(true);
    const [high, setHigh] = useState(250);


    const handleOpen = () => {
      setOpen(!open);
      setHigh(high + 50);
    };

    const handleClose = () => {
       setOpen(!open);
        setHigh(high - 50);
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

    return ( 
        <List
        sx={{ width: '50%', maxWidth: 180, maxHeight: high, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Nested List Items
          </ListSubheader>
        }
      >
          {sensorList && sensorList.map((sensor) => {
              return(
                  <div>
                <ListItemButton onClick={handleOpen}>
                <ListItemIcon>
                  <InboxIcon ></InboxIcon>
                </ListItemIcon>
                <ListItemText primary={"Sensor: " + sensor.sensor} />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
               <Collapse in={open} timeout="auto" unmountOnExit onClick={handleClose}>
               <List component="div" disablePadding>
                 <ListItemButton sx={{ pl: 4 }}>
                   <ListItemIcon>
                     <StarBorder />
                   </ListItemIcon>
                   <ListItemText primary={"Position:" + "[" + sensor.position.x + ", " + sensor.position.y + "]"} />
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