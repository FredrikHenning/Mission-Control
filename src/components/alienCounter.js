import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fade, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Paper, Popover, Popper, Select, Stack, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { keyframes } from '@mui/system';
import { styled } from '@mui/material/styles';
import { purple, red } from '@mui/material/colors';



const AlienCounter = (props) => {

    const [angle, setAngle] = useState(0);
    const [danger, setDanger] = useState(false);
    const [disp, setDisp] = useState('hidden')
    const CounterMeasure = () => {
        // 'https://localhost:8000/fire'
        //console.log(angle)
        var rad = angle * 3 * (Math.PI / 180)
        var mission = { rad };
        //console.log(mission)

        fetch('https://localhost:7071/todo/mc/fire',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(mission)

            })
    }
    //console.log(props)

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
        //console.log("Alien detected at segment: " + e)
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
        //console.log(angle)
    }

    return (
        <div>
            <Paper>
                <p>Laser</p>
                <TextField
                    id="filled-number"
                    label="Segment"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="filled"
                    value={segment}
                    onChange={handleSegment}
                />

                {props.lidar.map((lid) => {
                    for (let i = 0; i < lid.segments.length; i++) {
                        if (lid.segments[i] !== -1) {
                            return (
                                <div className="lidar" key={lid.id}>
                                    {console.log(lid.segments[i])}
                                    {"Alien detected at segment: " + i}
                                </div>
                            )
                        }
                    }
                    return (
                        <div>
                            {"No enemy detected"}
                        </div>
                    )
                })}
                <ColorButton variant='contained' onClick={CounterMeasure}>Fire</ColorButton>
            </Paper>
        </div>
    );
}

export default AlienCounter;