import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Popover, Select, Stack, Switch } from '@mui/material';
import { useState } from 'react';

const PointDetails = (props) => {

    const [x, setX] = useState(props.spot.x)
    const [y, setY] = useState(props.spot.y)
    const [sensor, setSensor] = useState(props.spot.id)
    const [commandP, setCommandP] = useState("sensor-pickup")
    const [colorP, setColorP] = useState("purple")

    const handlePickUp = () => {
        var command = commandP
        var color = colorP
        var point = { command, x, y, color, sensor }
        console.log(point)

        fetch('http://localhost:8000/points', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(point)
        })

    }

    const handlePicture = () => {

    }
    return ( 
        <div>
            {console.log(props.spot)}
            <Stack >
                <p>Position: [{props.spot.x}, {props.spot.y}]</p>
                <Button onClick={handlePickUp}> Pick-up Sensor </Button>
                
                <Button onClick={handlePicture}> Take Picture </Button>
            </Stack>
        </div>
     );
}
 
export default PointDetails;