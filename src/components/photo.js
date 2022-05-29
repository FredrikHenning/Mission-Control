import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';


export default function Photo(props) {
  var data = props.landscape;
  return (
    <Box sx={{textAlign: 'center' }}>
      <Paper elevation={2} sx={{ padding: '20px' }}>
        <Box>
        <Typography variant="h6" sx={{ padding: '10px' }}>
          Last image taken
        </Typography>
        <Box sx={{ padding: '10px' }}>
        <img style={{padding: "10px"}} src={`data:image/jpeg;base64,${data}`} alt="Image broken check console" width="300px"/>
        </Box>
        </Box>
        <Button color="primary" variant="contained" startIcon={<PhotoCamera />} >
          Take photo
        </Button>
        </Paper>
    </Box>
  )
}