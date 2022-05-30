import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

  export default function LoadingButtonsTransition() {

    function sendPointPlace() {
      
      
    }

    const handleClick1 = () => {
      setLoading(false)
      if (flag){
        setFlag(false)
      }
      else{
        setFlag(true)
      }
    };

    const [loading, setLoading] = React.useState(false);
    const [flag, setFlag] = React.useState(false);
    const [x, setX] = useState(null);
    const [y, setY] = useState(null);

    const updateX = (event) => {
      setX(event.target.value)
  }

    const updateY = (event) => {
      setY(event.target.value)
  }

  function sendXY() {
      console.log("sent");

      var payload = {"control": 1}
      var data = JSON.stringify(payload)
      fetch('https://localhost:7071/todo/mcmanualcontrol',
            {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })

      var payload2 = {"position": {
        "x": x,
        "y": y
                        }}
      var data = JSON.stringify(payload2)
      fetch('https://localhost:7071/todo/tp/instructions',
            {
              method: 'POST',
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data)
            })
  }
  
    function handleClick2() {
      setLoading(true)
      setTimeout(() => {  handleClick1(); }, 1000);
      
    }

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box >
      <Paper elevation={2} sx={{ padding: '20px' }} >
      <Typography variant="h6" sx= {{padding: "10px"}}>
                Control of robot
            </Typography>
      <Box sx={{ '& > button': { m: 1 }}}>
        <LoadingButton
          onClick={handleClick2}
          loading={loading}
          loadingPosition="center"
          variant="contained"
          color={!flag ? "primary" : "error"}
          children={!flag ? "Take control": "Stop"}
        >
        </LoadingButton>
      </Box>
        <Box sx={{ '& > button': { m: 0.5 } }}>
        <Typography variant="body2" sx={{padding: "5px"}}>
          Input coordinates:
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: "space-evenly", padding:"10px" }}>
          <TextField onChange={(updateX)} id="outlined-basic" label="x" variant="outlined" disabled={!flag} sx={{padding: "5px"}}/>
          <TextField onChange={(updateY)} id="outlined-basic" label="y" variant="outlined" disabled={!flag } sx={{padding: "5px"}}/>
        </Box>
        </Box>
          <Button onClick={sendXY} disabled={!flag} color="primary" variant="contained">
            Move here
          </Button>
      </Paper>
      </Box>
    </Box>

    
  );
}