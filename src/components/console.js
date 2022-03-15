import * as React from 'react';
import {Component} from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { ConstructionOutlined, DriveEtaOutlined } from '@mui/icons-material';
import { positions } from '@mui/system';


class Console extends React.Component {

    constructor(props) {
        super(props);
        this.state = { alerts:  ["Waiting for first message"],
            time: Date.now()};
        
      }
    

      componentWillUnmount() {
        clearInterval(this.interval);
      }
render(){
     var numbers = ["Warning", "hello", "dragon"];
      const listItems = this.state.alerts.map((number) =>
      <div key={number}>
      <Alert severity="error" >
           {number} 
        </Alert>
        
        </div>);
    
    return(
      <Stack sx={{ width: '50%' }} spacing={2}>
      {listItems}
      </Stack>
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
      console.log(position)
      console.log(position.position.x)
      
      message = "x: "+ position.position.x.toFixed(2)+ " y: " + position.position.y.toFixed(2);
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