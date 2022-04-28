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
import pin from "./pin.png";

export default function Photo() {
  return (
    <Box sx={{ width: '400px', textAlign: 'center' }}>
      <Paper elevation={2} sx={{ padding: '20px' }}>
        <Box>
        <Typography variant="h6">
          Last image taken
        </Typography>
        <Box>
        <img style={{padding: "10px"}} src={pin} alt="pin" width="300px"/>
        </Box>
        </Box>
        <Button color="primary" variant="contained" startIcon={<PhotoCamera />}>
          Take photo
        </Button>
        </Paper>
    </Box>
  )
}