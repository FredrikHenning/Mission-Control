import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Fab from '@mui/material/Fab';
import { Paper } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';


  export default function LoadingButtonsTransition() {
    const [flag, setFlag] = React.useState(true);
  
    const handleClick1 = () => {
      setLoading(false)
      setFlag(!flag);
    };

    const [loading, setLoading] = React.useState(false);
  
    function handleClick2() {
      setLoading(true)
      setTimeout(() => {  handleClick1(); }, 1000);
    }

  return (
    <Box sx={{ width: '250px', textAlign: 'center' }}>
      <Box sx={{ '& > button': { m: 1 }}}>
        <LoadingButton
          onClick={handleClick2}
          loading={loading}
          loadingPosition="center"
          variant="contained"
          color={flag ? "primary" : "error"}
          children={flag ? "Take control" : "Stop"}
        >
        </LoadingButton>
      </Box>

      <Box display={flag ? "none" : "block"} >
      <Paper elevation={2} sx={{ padding: '20px' }}>
        <Box sx={{ '& > button': { m: 0.5 } }}>
        <Fab size="small" aria-label="add">
          <ArrowUpwardIcon />
        </Fab>
        </Box>
        <Box sx={{ '& > button': { m: 0.5 } }}>
        <Fab size="small" aria-label="add">
          <ArrowBackIcon />
        </Fab>
        <Fab size="small" aria-label="add">
          <ArrowDownwardIcon />
        </Fab>
        <Fab size="small" aria-label="add">
          <ArrowForwardIcon />
        </Fab>
        </Box>
        <Grid sx={{ mt: 1 }}container spacing={1}>
          <Grid item xs={3}>
          <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera/> 
          </IconButton>
          </Grid>
          <Grid item xs={9}>
          <Button variant="outlined">Place sensors</Button>
          </Grid>
        </Grid>
      </Paper>
      </Box>
    </Box>

    
  );
}