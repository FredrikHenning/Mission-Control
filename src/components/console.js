import * as React from 'react';
import {Component} from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { ConstructionOutlined, DriveEtaOutlined } from '@mui/icons-material';
import { positions } from '@mui/system';
import SmartToySharpIcon from '@mui/icons-material/SmartToySharp';


class Console extends React.Component {

    constructor(props) {
        super(props);
        this.state = { alerts:  ["Waiting for first message"],
            time: Date.now(),
          x: 0,
        y: 0};
        
      }
    

      componentWillUnmount() {
        clearInterval(this.interval);
      }
render(){
     var numbers = ["Warning", "hello", "dragon"];
      const listItems = this.state.alerts.map((number) =>
      <div key={number}
        style = {{
          position: "absolute",
          left: `${1 + this.state.x}px`,
          top: `${107 + 356 - this.state.y}px`
        }}
      >
      <SmartToySharpIcon/>
      {/* <Alert severity="error" >
           {number} 
        </Alert> */}        
        </div>);

const listItems2 = this.state.alerts.map((number) =>
<div key={number}
>
<Alert severity="error" >
     {number} 
</Alert>        
  </div>);
        
        
    
    return(
      <div>
      <Stack sx={{ width: '50%' }} spacing={2}>
      {listItems}
      </Stack>
      <Stack sx={{ width: '50%' }} spacing={2}>
      {listItems2}
      </Stack>
      </div>
      
    );
}
componentDidMount(){
  var position; 
  var message;
    this.interval = setInterval(() => 
    
    
    fetch('https://localhost:7071/todo/update')
    .then(res => {
    return res.json();
  })
  .then(data => {
      
      console.log(data.message)
      console.log(this.state.alerts[this.state.alerts.length-1])
      position = JSON.parse(data.message);
      this.setState({x: position.position.x});
      this.setState({y: position.position.y});
      message = "Position of the robot: x: "+ position.position.x.toFixed(2)+ " y: " + position.position.y.toFixed(2);
      if(message != this.state.alerts[0]){
        if(this.state.alerts.length < 10){
      this.setState(prevState => ({
        alerts: [message,...prevState.alerts]
      }))}
      else{
        this.setState(prevState => ({
          alerts: [message,...prevState.alerts]
        }))
        
      }
    
    }

  }), 1000);
}
}

export default Console;