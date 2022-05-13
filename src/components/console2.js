
import {Component} from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { ConstructionOutlined, DriveEtaOutlined } from '@mui/icons-material';
import { positions } from '@mui/system';
import SmartToySharpIcon from '@mui/icons-material/SmartToySharp';
import './console.css'
import Collapse from '@mui/material/Collapse';
import { TransitionGroup } from 'react-transition-group';
import React, { useState, useEffect } from 'react';

export default function Console2(props) {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
    //   this.setState({x: props.position.position.x});
    //   this.setState({y: props.position.position.y});
    var message = props.message;
    console.log(props.message)
      //var message = "Position of the robot: x: "+ props.position.position.x.toFixed(2)+ " y: " + props.position.position.y.toFixed(2);
      if(message != alerts[0]){
        if(alerts.length < 7){
      setAlerts([message]
      )}
      else{
        setAlerts([message]);
        }
    }});

    // const listItems = alerts.map((number) =>
    //   <div key={number}
    //     style = {{
    //       position: "absolute",
    //       left: `${1 + props.position.position.x}px`,
    //       top: `${107 + 356 - props.position.position.y}px`
    //     }}
    //   >
    //   <SmartToySharpIcon/>
    //   {/* <Alert severity="error" >
    //        {number} 
    //     </Alert> */}        
    //     </div>);

const listItems2 = alerts.map((number) =>
<div key={number}>
<Collapse in={true}>
<Alert severity="error" >
     {number} 
</Alert>
</Collapse>        
  </div>);


    return(
        <div className='console-root'>
      
      {/* {listItems} */}
      <TransitionGroup>
      <Stack sx={{ width: '100%' }} spacing={2}>
      {listItems2}
      </Stack>
      </TransitionGroup>
      </div>
    );
}