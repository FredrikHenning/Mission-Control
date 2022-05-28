import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { PortraitSharp } from '@mui/icons-material';


  export default function LoadingButtonsTransition(props) {

    function sendPointPlace() {
      
      console.log("sent");

      var payload = {"control": 1}
      fetch('https://localhost:7071/todo/mc/manualcontrol',
            {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })

      var payload2 = {"position": {
        "x": props.x,
        "y": props.y
                        }}
                        
      fetch('https://localhost:7071/todo/mc/manualpoints',
            {
              method: 'POST',
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload2)
            })
    }

    const [flag, setFlag] = React.useState(true);
  
    const handleClick1 = () => {
      setLoading(false)
      setFlag(!flag);

      if(props.manual == false){
        props.setManual(true);
      }
      else{
        props.setManual(false);
      }

      
    };

    const [loading, setLoading] = React.useState(false);
  
    function handleClick2() {
      setLoading(true)
      setTimeout(() => {  handleClick1(); }, 1000);
    }

  return (
    <Box sx={{ width: '400px', textAlign: 'center' }}>
      <Box sx={{ '& > button': { m: 1 }}}>
        <LoadingButton
          onClick={handleClick2}
          loading={loading}
          loadingPosition="center"
          variant="contained"
          color={flag ? "primary" : "error"}
          children={flag ? "Take control": "Stop"}
        >
        </LoadingButton>
      </Box>

      <Box display={flag ? "none" : "block"} >
      <Paper elevation={2} sx={{ padding: '20px' }}>
        <Box sx={{ '& > button': { m: 0.5 } }}>
        <Typography variant="body2">
          Move the robot by pressing the location on the map you wish to go
        </Typography>
        <Typography variant="body2">
          Moving to location: {props.x} , {props.y}
        </Typography>
        </Box>
        <Grid sx={{ mt: 1 }}container spacing={1}>
          <Grid item xs={6}>
          <Button color="primary" variant="contained" startIcon={<PhotoCamera />}>
            Take photo
          </Button>
          </Grid>
          <Grid item xs={6}>
          <Button color="primary" variant="contained" onClick={sendPointPlace}>
            Place sensor
          </Button>
          </Grid>
        </Grid>
      </Paper>
      </Box>
    </Box>

    
  );
}