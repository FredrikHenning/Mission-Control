import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';


const Image = (props) => {
  var data = props.landscape;

  if (props.image == false){
    return <Typography>No image has been sent or image was broken</Typography>;
    
  }
  else{
      return <img style={{padding: "10px"}} src={`data:image/jpeg;base64,${data}`} width="300px"/>;
      
    }
}

export default function Photo(props) {
  return (
    <Box sx={{textAlign: 'center' }}>
      <Paper elevation={2} sx={{ padding: '20px' }}>
        <Box>
        <Typography variant="h6" sx={{ padding: '10px' }}>
          Last image taken
        </Typography>
        <Box sx={{ padding: '10px', display:"flex", alignItems: "center" }}>
         <Image image={props.image} landscape={props.landscape}/>
        </Box>
        </Box>
        </Paper>
    </Box>
  )
}