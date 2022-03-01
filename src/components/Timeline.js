import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Slider } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const theme = createTheme({

})

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

const lightTheme = createTheme({ palette: { mode: 'light' } });

export default function Timeline() {
  const duration = 200; // seconds

  const [position, setPosition] = React.useState(32);

  const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
  });

  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 9 ? `0${secondLeft}` : secondLeft}`;
  }

  return (
    <Grid item xs={6}>
    <ThemeProvider theme={theme}>
    <Paper variant="outlined" elevation={1}>
    <Box
      sx={{
        p: 2,
        bgcolor: 'background.default',
        display: 'grid'
      }}
    >
    <Slider
          aria-label="time-indicator"
          size="small"
          value={position}
          min={0}
          step={1}
          max={200}
          onChange={(_, value) => setPosition(value)}
        />
     <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: -2,
          }}
        >
          <TinyText>{formatDuration(position)}</TinyText>
          <TinyText>-{formatDuration(duration - position)}</TinyText>
        </Box>   
    </Box>
    </Paper>
    </ThemeProvider>
    </Grid>
  )
}
