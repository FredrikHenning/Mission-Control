import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Popover, Select, Stack, Switch } from '@mui/material';
import { useState } from 'react';

const SensorDetails = (props) => {


    const [x, setX] = useState(props.sensID.x)
    const [y, setY] = useState(props.sensID.y)
    const [sensor, setSensor] = useState(props.sensID.id)
    const [commandP, setCommandP] = useState("sensor-pickup")
    const [commandDrop, setCommandDrop] = useState("sensor-drop")
    const [commandPic, setCommandPic] = useState("take-picture")
    const [colorPic, setColorPic] = useState("red")
    const [colorP, setColorP] = useState("purple")
    const [colorDrop, setColorDrop] = useState("blue")
    const [show, setShow] = useState(props.sensID.x ? true:false);

    const handlePickUp = () => {
        var command = commandP
        var color = colorP
        var point = { command, x, y, color, sensor }
        // console.log(point)

        fetch('http://localhost:8000/points', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(point)
        })
    }
    const handleDrop = () => {
        var command = commandDrop
        var color = colorDrop
        var point = { command, x, y, color, sensor }
        // console.log(point)

        fetch('http://localhost:8000/points', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(point)
        })
    }

    const handlePicture = () => {
        var command = commandPic
        var color = colorPic
        var point = { command, x, y, color, sensor }
        // console.log(point)

        fetch('http://localhost:8000/points', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(point)
        })
    }

    const checkMission = () => {
        
    }

    const toggle = () => {
        setShow(false);  
      }
    const toggleDrop = () => {
        setShow(true);
    }
    

    return ( 
        <div>
            {/* {console.log(props.sensID)} */}
            <Stack>
                <p>Position: [{props.sensID.x.toFixed(2)}, {props.sensID.y.toFixed(2)}]</p>
                {show ? <Button id="button" type="button" onClick={() => { handlePickUp(); toggle() }}> Pick-up Sensor </Button> : null}                
                {!show ? <Button id="button" type="button" onClick={() => { handleDrop(); toggleDrop() }}> Drop Sensor </Button> : null}                

                <Button onClick={handlePicture}> Take Picture </Button>
            </Stack>
        </div>
     );
}
 
export default SensorDetails;