import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Popover, Select, Switch } from '@mui/material';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { CardMedia } from "@mui/material";
import { makeStyles } from '@mui/styles';
// import { blue, cyan, red } from '@mui/material/colors';
import { ThreeSixty } from '@mui/icons-material';
import { useState } from 'react';
import { width, height, maxHeight } from '@mui/system';
import useMouse from '@react-hook/mouse-position';
import * as React from 'react'
import ImageMarker from "react-image-marker";
import SendPoints from './components/SendPoints';

// Styles in height and width for the card/picture
const useStyles = makeStyles({
    root: {
        maxWidth: 600,
        maxHeight: 600,
    },
    media: {
        height: 400
    },
    popMap: {
        height: 40,
        width: 60
    },
    headerHeight: {
        height: 20
    },
});

const Map = () => {

    const [openOne, setOpenOne] = useState(false);
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState('');

    //Open control window for that point and sets the coordniates
    const handleClickOpen = () => {
        setX(mouse.x)
        setY(341 - mouse.y)
        setOpenOne(true);
      };
    
      const handleClose = () => {
        setOpenOne(false);
      };
    
      //Sets what kin of intell that point is
      const handleMaxWidthChange = (event) => {
        setMaxWidth(
          // @ts-expect-error autofill of arbitrary value is not handled.
          event.target.value,
        setCommand(event.target.value),
        );
      };

      //For the mouse clicker event
    const ref = React.useRef(null)
    const mouse = useMouse(ref, {
        enterDelay: 100,
        leaveDelay: 100,
    });

    const [command, setCommand] = useState('Goal State');
    const [x, setX] = useState(mouse.x);
    const [y, setY] = useState(mouse.y);
    const [isPending, setIsPending] = useState(false);

    // Create the given point and posts it in the json file
    const createPoint = () => {

        console.log(x, y)
        const point = {command, x, y};

        setIsPending(true);

        fetch('http://localhost:8000/points', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(point)
        }).then(() => {
            console.log('Point is added')
            setIsPending(false);
        })
        setOpenOne(false);
    }


    let [markers, setMarkers] = useState([]);

    const [map, setMap] = useState("/mars1.png")
    const [mapTwo, setMapTwo] = useState("/mars2.png")
    // Function for toggling the maps
    const handleClick=() =>{
        if (map === "/mars1.png")( 
            setMap("/mars2.png")
            )
        else( 
            setMap("/mars1.png")
            )
        if (map === "/mars1.png")( 
            setMapTwo("/mars1.png")
            )
        else( 
            setMapTwo("/mars2.png")
            )
    }  

    const [anchorEl, setAnchorEl] = useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    
    
    // DbConnection()
    const handleMouse=() =>{
        const x_cord = mouse.x
        const y_cord = mouse.y
        console.log(x_cord, y_cord)
        

        // var newImage = document.createElement("img");
        // newImage.setAttribute('src', "/pin.png");
        // newImage.setAttribute('class', 'overlays');
        // newImage.style.left = 100 + "px";
        // newImage.style.top = 50 + "px";
        // newImage.style.height= "20px";
        // newImage.style.width= "20px";
        // document.body.appendChild(newImage);
        // Lägg till en pop upp som frågar om det är rätt coordinater
    }
    // Function for the marker (Might be taken away)
    var itemnumber = 0;
    const CustomMarker = () => {
        return (
            <div>
                <p className="image-marker__marker image-marker__marker--default" data-testid="marker">
                    {itemnumber+=0.5}
                </p> 
                
            </div>
        );
      };
      

    const classes = useStyles()
    return ( 
        
        <CardContent>
            <Card className={classes.root}>
                
                <CardHeader
                    className={classes.headerHeight}
                    // sx={{ bgcolor: cyan[700] }}

                    // Here is where the button for toggle the maps come to play
                    action={
                        
                        <IconButton aria-owns={open ? 'mouse-over-popover' : undefined} 
                            onMouseEnter={handlePopoverOpen}
                            onMouseLeave={handlePopoverClose} 
                            onClick = {handleClick}
                            
                            // edge = 'false' 
                            // size='small'
                            >
                            <Popover
                                    id="mouse-over-popover"
                                    sx={{
                                    pointerEvents: 'none',
                                    }}
                                    open={open}
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                    }}
                                    onClose={handlePopoverClose}
                                    disableRestoreFocus
                                >
                                    <CardMedia
                                        onClick = {handleClick}
                                        className={classes.popMap}
                                        component="img"
                                        height="40"
                                        image={mapTwo}
                                        alt="Mars2"
                                    />
                            </Popover>
                           {/* <ThreeSixty sx={{ fontSize: 30}}/> */}
                           <Chip icon={<ThreeSixty sx={{ fontSize: 30}}/>} label="Change map" />
                        </IconButton>
                    }   
                />
                    
                <div ref={ref} onClick={handleClickOpen} >
                    {/* <CardMedia
                        className={classes.media}
                        component="img"
                        height="194"
                        image={map}
                        alt="Mars1"     
                    >
                        </CardMedia> */}
                    <ImageMarker
                        className={classes.media}
                        src={map}
                        scale = {100}
                        
                        markers={markers}
                        onAddMarker={(marker) => setMarkers((prev) => [...prev, marker])}
                        markerComponent={CustomMarker}            
                    />
                </div>
                
                <Dialog
                    fullWidth={fullWidth}
                    maxWidth={'sm'}
                    open={openOne}
                    onClose={handleClose}
                >
                    
                    <DialogTitle>Point</DialogTitle>
                        <DialogContent>
                            <DialogContentText >
                                {"Do you want to use this point: (" + x + ", " + y + ")"}
                                
                            </DialogContentText>
                        
                            <Box
                                noValidate
                                component="form"
                                sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                m: 'auto',
                                width: 'fit-content',
                                }}
                            >
                                
                                <FormControl sx={{ mt: 2, minWidth: 120 }}>
                                    <InputLabel htmlFor="max-width">Misson</InputLabel>
                                    <Select
                                        autoFocus
                                        value={command}
                                        
                                        onChange={handleMaxWidthChange}
                                        label="Misson"
                                        inputProps={{
                                        //name: 'intell',
                                        //id: 'Misson',
                                        }}
                                    >
                                        <MenuItem value="sensor-drop">sensor-drop</MenuItem>
                                        <MenuItem value="goto">goto</MenuItem>
                                        <MenuItem value="sensor-pickup">sensor-pickup</MenuItem>
                                        <MenuItem value="take-picture">take-picture</MenuItem>
                                        
                                    </Select>
                                </FormControl>
                            </Box>
                        </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button onClick={createPoint} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>                         
            </Card>      
      </CardContent>
      
     );
}
 
export default Map;