import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fade, FormControl, FormControlLabel, FormHelperText, Grid, IconButton, Input, InputAdornment, InputLabel, listClasses, MenuItem, OutlinedInput, Paper, Popover, Popper, Select, Stack, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { keyframes } from '@mui/system';
import { styled } from '@mui/material/styles';
import { purple, red } from '@mui/material/colors';
import Lidar from './Lidar';



const AlienCounter = (props) => {

    const [angle, setAngle] = useState(0);
    const [danger, setDanger] = useState(false);
    const [disp, setDisp] = useState('hidden')
    const CounterMeasure = () => {
        // 'https://localhost:8000/fire'
        console.log(segment)
        var radianer = (segment * 3 + 1.5)* (Math.PI / 180)
        console.log(rad)
        var rad = radianer;
        var pointsObj = { rad }
        var data = JSON.stringify(pointsObj);

        fetch('https://localhost:7071/todo/mcfire',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)

            })
    }

    const Fire = () => {
        var laser = ("fire now")
        var data = JSON.stringify(laser)
        fetch('https://localhost:7071/todo/simulationlaser',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
        })
    }
    // console.log(props.lidar)

    const blink = keyframes`
    from { opacity: 0.3; }
    to { opacity: 1; }
    `;

    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
        // animation: `${blink} 1s linear infinite`,
        '&:hover': {
            backgroundColor: red[700],
        },
    }));

    const enemy = (e) => {
        console.log("Alien detected at segment: " + e)
        setDanger(true)
        setDisp('')
    }
    const notEnemy = () => {
        setDanger(false)
        setDisp('hidden')
    }

    const [segment, setSegment] = useState('')

    const handleSegment = (event) => {
        // setAngle(event.target.value)
        console.log(angle)
    }
    console.log(props.lidar.segments[1])

    const getLidar = () =>{
        return (
            <div>
             <Lidar lid={props.lidar.segments} />
         </div>
        ) 
    }
    return (
        <div>

            <Paper
                sx={{width: 200}}
            >
                <Typography variant="h6" sx= {{padding: "10px"}}>
                    Laser
                </Typography>
                
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-amount">Segment</InputLabel>
                    <Input
                        type="number"
                        required
                        value={segment}
                        onChange={(e) => {setSegment(e.target.value%120)}}
                        sx={{width: 50}}
                    />

                </FormControl>
                
                
                {getLidar()}
                <Box sx={{p: "10px"}}>
                    <Grid spacing={5}>
                        <Grid item xs={"auto"}>
                            <Button variant='contained' onClick={CounterMeasure} sx={{padding: "10px"}}>Rotate</Button>
                        </Grid>
                        <Grid>
                            <ColorButton variant='contained' onClick={Fire} sx={{padding: "10px"}}>Fire</ColorButton>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </div>
    );
}

export default AlienCounter;