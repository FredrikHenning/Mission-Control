import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';

  export default function LoadingButtonsTransition() {

    function sendPointPlace() {
      
      // console.log("sent");

      // var payload = {"control": 1}
      // fetch('https://localhost:7071/todo/mc/manualcontrol',
      //       {
      //           method: 'POST',
      //           headers: { "Content-Type": "application/json" },
      //           body: JSON.stringify(payload)
      //       })

      // var payload2 = {"position": {
      //   "x": props.x,
      //   "y": props.y
      //                   }}
                        
      // fetch('https://localhost:7071/todo/mc/manualpoints',
      //       {
      //         method: 'POST',
      //         headers: { "Content-Type": "application/json" },
      //         body: JSON.stringify(payload2)
      //       })
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
        <Typography variant="body2">
          Input coordinates:
        </Typography>
          <TextField id="outlined-basic" label="x" variant="outlined" disabled={!flag}/>
          <TextField id="outlined-basic" label="y" variant="outlined" disabled={!flag}/>
        </Box>
        <Grid sx={{ mt: 1 }}container spacing={1}>
          <Grid item xs={6}>
          <Button disabled={!flag} color="primary" variant="contained" startIcon={<PhotoCamera />}>
            Take photo
          </Button>
          </Grid>
          <Grid item xs={6}>
          <Button disabled={!flag} color="primary" variant="contained" onClick={sendPointPlace}>
            Place sensor
          </Button>
          </Grid>
        </Grid>
      </Paper>
      </Box>
    </Box>

    
  );
}