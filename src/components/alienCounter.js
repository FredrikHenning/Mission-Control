import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fade, FormControl, FormControlLabel, FormHelperText, IconButton, Input, InputAdornment, InputLabel, listClasses, MenuItem, OutlinedInput, Paper, Popover, Popper, Select, Stack, TextField } from '@mui/material';
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
        var rad = angle * 3 * (Math.PI / 180)
        var mission = { rad };
        console.log(mission)

        fetch('https://localhost:7071/todo/mc/fire',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(mission)

            })
    }

    const Fire = () => {
        fetch('https://localhost:7071/todo/simulation/laser',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify("fire")
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

                <p>Laser</p>

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

                <ColorButton variant='contained' onClick={CounterMeasure}>Rotate</ColorButton>
                <Button onClick={Fire} >Fire</Button>
            </Paper>
        </div>
    );
}

export default AlienCounter;