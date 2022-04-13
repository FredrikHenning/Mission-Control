import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Popover, Select, Stack, Switch } from '@mui/material';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { CardMedia } from "@mui/material";
import { makeStyles } from '@mui/styles';
// import { blue, cyan, red } from '@mui/material/colors';
import { SettingsInputAntennaTwoTone, ThreeSixty} from '@mui/icons-material';
import RoomSharpIcon from '@mui/icons-material/RoomTwoTone';
import { useState } from 'react';
import { width, height, maxHeight } from '@mui/system';
import useMouse from '@react-hook/mouse-position';
import * as React from 'react'
import { useEffect } from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import './Map.css';

// Styles in height and width for the card/picture
const mapSizeX = 767;
const mapSizeY =432;
const useStyles = makeStyles({
    root: {
        maxWidth: 767,
        maxHeight: 600,
    },
    media: {
        // scale: 50,
        height: mapSizeY,
        width: mapSizeX
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
    const[nodes, setNodes] = useState('');
    // const {data: points1} = useFetch('http://localhost:8000/points')

    const [points, setPoints] = useState(null);
    const [oldPoints, setOldPoints] = useState(null);
    
    const handleZoomPlus = () =>{
        if(zomvar < 6)
            setZomvar(zomvar + 0.5)
        else
            console.log("Max Zoom")
    }
    const handleZoomNegative = () =>{
        if(zomvar > 1)
            setZomvar(zomvar - 0.5)
        else
            console.log("Min Zoom")
    }

    useEffect(() => {
        
        console.log("hej");
        
        fetch('http://localhost:8000/points')
        .then(res => {
            return res.json();
        })
        // .then( ()=> {
        //     
        // })
        .then(data => {
            setPoints(data);
        })
        console.log(points);
        console.log(oldPoints);
    },[nodes]);

    //Open control window for that point and sets the coordniates
    const handleClickOpen = () => {
        setX(mouse.x )
        setY((mapSizeY - mouse.y))
        setOpenOne(true);
        setNodes('Working on Point');
        setOldPoints(points);
      };
    
      const handleClose = () => {
        setOpenOne(false);
      };
    
      //Sets what kin of intell that point is

    const handleMaxWidthChange = (event) => {

            setCommand(event.target.value)
            if(event.target.value === "goto")
                setColor("black")
            else if(event.target.value === "sensor-drop")
                setColor("blue")
            else if (event.target.value === "sensor-pickup")
                setColor("purple")
            else if (event.target.value === "take-picture")
                setColor("red")
            else
                setColor("white")
        
    };

      //For the mouse clicker event
    const ref = React.useRef(null)
    const mouse = useMouse(ref, {
        enterDelay: 100,
        leaveDelay: 100,
    });

    const [command, setCommand] = useState('goto');
    const [x, setX] = useState(mouse.x);
    const [y, setY] = useState(mouse.y);
    const [isPending, setIsPending] = useState(false);
    const [zomvar, setZomvar] = useState(1);
    const [color, setColor] = useState("black")

    // Create the given point and posts it in the json file
    const createPoint = () => {

        console.log(x, y)
        const point = {command, x, y, color};
        
        setIsPending(true);
        fetch('http://localhost:8000/points', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(point)
        }).then(() => {
            console.log('Point is added')
            setIsPending(false);
        }).then(() => {
            setNodes('New point')
        })
        
        setOpenOne(false);
    }

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
    const [anchorElP, setAnchorElP] = useState(null);
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(-mapSizeY);
    const [offsetScale, setOffsetScale] = useState(1);

    const handlerandom = (offX, offY, offScale) => {
        console.log("It worked")
        // setOffsetX(offX);
        // setOffsetY(offY);
        // setOffsetScale(offScale);
        console.log(offX, offY, offScale)
    }

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    const handlePointPopoverOpen = (event) =>{
        setAnchorElP(event.currentTarget);
    };
    const handlePointPopoverClose = () => {
        setAnchorElP(null);
    };

    const openPoint = Boolean(anchorElP);
    const open = Boolean(anchorEl);

    
    
    // DbConnection()
    const handleMouse=() =>{
        const x_cord = mouse.x
        const y_cord = mouse.y
        console.log(x_cord, y_cord)
    }

    const classes = useStyles()
    return ( 
        
        <CardContent>
            <Card className={classes.root}>    
                <CardHeader
                    className={classes.headerHeight}
                     // sx={{ bgcolor: blue[700] }}

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
                    
                <div>
                    <TransformWrapper
                        initialScale={1}
                        initialPositionX={0}
                        initialPositionY={0}
                    >

                        {({ zoomIn, zoomOut, resetTransform, setTransform, ...rest }) => (
                            <React.Fragment>
                                <Stack spacing={2} direction="row">
                                    <Box sx={{ '& button': { m: 1 } }}>
                                        <div>
                                            <Button variant="contained" size="small" onClick={() => { zoomIn(); handleZoomPlus() }}>+</Button>
                                            <Button variant="contained" size="small" onClick={() => { zoomOut(); handleZoomNegative() }}>-</Button>
                                            <Button variant="contained" size="small" onClick={() => { resetTransform(); setZomvar(1) }}>x</Button>
                                        </div>
                                        <div> Quadrant:
                                            <Button variant='contained' size="small" onClick={() => { setTransform(0, -mapSizeY, 2, 300, "easeOut"); handlerandom(0, -mapSizeY, 2) }}>2.1.1</Button>
                                            <Button variant='contained' size="small" onClick={() => { setTransform(0, 0, 2, 300, "easeOut"); handlerandom(0, -mapSizeY / 2, 2) }}>2.1.2</Button>
                                            <Button variant='contained' size="small" onClick={() => { setTransform(-mapSizeX, -mapSizeY, 2, 300, "easeOut"); handlerandom(mapSizeX / 2, -mapSizeY, 2) }}>2.2.1</Button>
                                            <Button variant='contained' size="small" onClick={() => { setTransform(-mapSizeX, 0, 2, 300, "easeOut"); handlerandom(mapSizeX / 2, -mapSizeY / 2, 2) }}>2.2.2</Button>
                                        </div>
                                    </Box>
                                </Stack>
                                {/* {console.log(zomvar)} */}


                                <div ref={ref} onClick={handleClickOpen}>
                                    <TransformComponent>
                                        <img src={map} alt="test" onDrag={(offset) => {console.log(offset)}}/>
                                        {points && points.map((point) => {
                                            //  console.log(oldPoints.filter(point => point.id.includes(point.id)))

                                            return (
                                                // <div className="point-marker" key = {point.id}>
                                                //     {oldPoints && oldPoints.map((oldpoint) => {
                                                //         <div className="oldPoit-markers" key = {oldpoint.id}>
                                                //             {/* {console.log(point.id)}{ console.log(oldpoint.id) } */}
                                                //             {console.log(point.id===oldpoint.id)}
                                                //             {console.log(oldPoints[1])}


                                                //         </div>
                                                //     })}
                                                //     </div>
                                                //console.log(oldPoints && oldPoints.map.filter(p => p.includes(point.id))),
                                                <div className="point-marker" key={point.id}
                                                    style=
                                                    {{
                                                        position: "absolute",
                                                        left: `${point.x - 19}px`,
                                                        top: `${-30 + mapSizeY - point.y}px`,
                                                        

                                                    }}
                                                >
                                                    <IconButton aria-owns={openPoint ? 'mouse-over-popover' : undefined}
                                                        onMouseEnter={handlePointPopoverOpen}
                                                        onMouseLeave={handlePointPopoverClose}

                                                    >
                                                        {/* <Popover
                                                            id="mouse-over-popover"
                                                            sx={{
                                                                pointerEvents: 'none',
                                                            }}
                                                            open={openPoint}
                                                            anchorEl={anchorElP}
                                                            anchorOrigin={{
                                                                vertical: 'bottom',
                                                                horizontal: 'center',
                                                            }}
                                                            transformOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'center',
                                                            }}
                                                            onClose={handlePointPopoverClose}
                                                            disableRestoreFocus

                                                        >
                                                            <div>
                                                                {"(" + point.x.toFixed(2) + ", "}
                                                                {point.y.toFixed(2) + ")"}

                                                            </div>
                                                        </Popover> */}
                                                        <RoomSharpIcon style={{ color: point.color }} />
                                                    </IconButton>
                                                    {/* {console.log(points)} */}

                                                </div>
                                            )
                                        })}
                                    </TransformComponent>
                                </div>
                            </React.Fragment>
                        )}

                    </TransformWrapper>
                     
                     {/* <CardMedia
                        className={classes.media}
                        scale = {100}
                        component="img"
                        height="194"
                        image={map}
                        alt="Mars1"     
                    >
                        </CardMedia>  */}
                                           
                      
                    
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