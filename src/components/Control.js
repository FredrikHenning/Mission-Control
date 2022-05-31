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

  function sendXY() {
      if(flag == false){
      console.log("sent");
      var payload = {"control": 1}
      var data = JSON.stringify(payload)
      fetch('https://localhost:7071/todo/mcmanualcontrol',
            {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
          }
        }

    function handleClick2() {
      setLoading(true)
      sendXY()
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
      </Paper>
      </Box>
    </Box>

    
  );
}