import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fade, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Paper, Popover, Popper, Select, Stack, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { makeStyles } from '@mui/styles';
import RoomSharpIcon from '@mui/icons-material/RoomTwoTone';
import { useState } from 'react';
import useMouse from '@react-hook/mouse-position';
import * as React from 'react'
import { useEffect } from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import './Map.css';
import Robot from './components/Robot';
import LineTo from 'react-lineto';
import SensorsSharpIcon from '@mui/icons-material/SensorsSharp';
import { width } from '@mui/system';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import { motion } from 'framer-motion';

// Styles in height and width for the card/picture
// const mapSizeX = 767;
// const mapSizeY =432;


const Map = (props) => {

//    console.log(props)
            //Mapsize we want to show
    const [mapSizeX, setMapSizeX] = useState(767.00);
    const [mapSizeY, setMapSizeY] = useState(432.00);
            //Scale from pixel to meter
    console.log(props.satellite.scale)
    const [scale, setScale] = useState(0.08);
    const [style, setStyle] = useState({visibility: 'hidden'});

    var data = props.satellite.data;
    const [manual, setManual] = useState(false);

    function updateManual(value){
        setManual(value)
        fetch('https://localhost:7071/todo/mc/manualcontrol',
        {method: 'POST',
        body: value,
        headers: {
        'Content-Type': 'application/json',
        }})
    }

    function sendManual(x, y){
        var points = {"x": x, "y": y}

        fetch('https://localhost:7071/todo/mc/manualpoints',
        {method: 'POST',
        body: points,
        headers: {
        'Content-Type': 'application/json',
        }})

        console.log(points)
    }

    // setMapSizeX(props.position.sizeX);
    // setMapSizeX(props.position.sizeY);
    const useStyles = makeStyles({
        root: {
            maxWidth: 767,
            maxHeight: 600,
            width: 767
        },
        media: {
            // scale: 50,
            //height: mapSizeY,
            //width: mapSizeX
        },
        popMap: {
            height: 40,
            width: 60
        },
        headerHeight: {
            height: 20
        },
    });

    const [openOne, setOpenOne] = useState(false);
    const [fullWidth, setFullWidth] = useState(true);
    const [takeControl, setTakeControl] = useState(false);
    const[nodes, setNodes] = useState('');
    const [points, setPoints] = useState(null);
    const [oldPoints, setOldPoints] = useState(null);

    useEffect(() => {
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
    },[nodes]);
// Skalan 123: 0.132
    //Open control window for that point and sets the coordniates
    const handleClickOpen = () => {
        // setX(mouse.x )
        // setY((mapSizeY - mouse.y))
        var bx = ((mouse.x)/offsetScale + (offsetX))/mxs
        var by =((mapSizeY - mouse.y)/offsetScale + offsetY)/mys
        setX(parseFloat((bx*scale).toFixed(3)));
        setY(parseFloat((by*scale).toFixed(3)));

        if (takeControl != true && !manual){
            setOpenOne(true)
        }
        else if (manual == true){
            sendManual(x, y)
        }
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
    const [sensor, setSensor] = useState(0)
    const [isPending, setIsPending] = useState(false);
    const [zomvar, setZomvar] = useState(1);
    const [color, setColor] = useState("black")

    // Create the given point and posts it in the json file
    const createPoint = () => {

        // console.log(x, y)
        const point = {command, x, y, color, sensor};
        
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

    // const [map, setMap] = useState("/final_demo2.png")
    const [mapData, setMapData] = useState(`data:image/jpeg;base64,${data}`)
    const [mapTwo, setMapTwo] = useState("/mars2.png")
    const [map, setMap] = useState(mapData)
    const [obsCheck, setObsCheck] = useState(0)
    // Function for toggling the maps
    const handleClick=() =>{
        setObsCheck = !obsCheck;
        if(obsCheck){
            setMap(mapData)
        }
        else{
            setMap(mapTwo)
        }
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElP, setAnchorElP] = useState(null);
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    const [offsetScale, setOffsetScale] = useState(1);

    const handleOffset = (offX, offY, offScale) => {
        // console.log("It worked")
        setOffsetX(offX);
        setOffsetY(offY);
        setOffsetScale(offScale);
        // console.log(offsetX, offsetY, offScale);
    }

    const handleReset = () => {
        setOffsetX(0);
        setOffsetY(0);
        setOffsetScale(1);
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
    const [zoomOpen, setZoomOpen] = useState(false)
    const [achorZoom, setAchorZoom] = useState(null)

    const openZoomGridHandler = (event) => {
        setAchorZoom(event.currentTarget)
        setZoomOpen(!zoomOpen)
    }
    
    const openPoint = Boolean(anchorElP);
    const openppp = [Boolean(anchorElP), Boolean(anchorElP)];
    //console.log(openppp);
    const open = Boolean(anchorEl);

    const [stuff, setStuff] = useState([
        { nr: "1",  id: 1 },
        { nr: "2",  id: 2 },
        { nr: "3",  id: 3 },
        { nr: "10",  id: 10 },
      ]);
    //console.log(props.sensors)
    const handleDropSensor = () => {
        return (
            <div>
                {props.allSensors && props.allSensors.map((sens) => {
                    if(sens.is_placed !== true){
                        return (
                            <div>
                                <FormControlLabel
                                    control={
                                        
                                        <Checkbox 
                                            disabled={!(command==="sensor-drop")} 
                                            onClick={() => {
                                                console.log("Click button");
                                                setSensor(sens.id)
                                                setCommand("sensor-drop")
                                                setColor("blue")
                                            }} 
                                            name={sens.id}
                                        >
                                        </Checkbox>
                                        
                                    }
                                    label={sens.id}
                                />
                            </div>
                        )
                    }
                    else
                        return(<div>Sensor: {sens.id} is not Available</div>)
                })}
            </div>
        )
    }
    const [scaleW, setScaleW] = useState(767.00/1100.00);
    const [scaleH, setScaleH] = useState(432.00/700.00);
    var [pixSizeX, setPixSizeX] = useState(null);
    var [pixSizeY, setPixSizeY] = useState(null);
    var mxs = mapSizeX / pixSizeX;
    var mys = mapSizeY / pixSizeY;

    const onImgLoad = ({ target: img }) => {
        const { offsetHeight, offsetWidth } = img;
        //console.log({offsetHeight, offsetWidth});
        //console.log(typeof(mapSizeX))

        var msxf = parseFloat(mapSizeX).toFixed(3);
        var msyf = parseFloat(mapSizeY).toFixed(3);
        var owf = parseFloat(offsetWidth).toFixed(3);
        var ohf = parseFloat(offsetHeight).toFixed(3);
        var scx = 767.00/offsetWidth;
        var scy = msyf/ohf;
        //console.log({scx, scy});
        // setMapSizeX(offsetWidth);
        // setMapSizeY(offsetHeight);
        if(pixSizeX === null && pixSizeY === null){
            setPixSizeX(offsetWidth);
            setPixSizeY(offsetHeight)
        }
        // setScaleH(scy);
        // setScaleW(scx);
      };


      let pos= {
        x: props.position.position.x,
        y: props.position.position.y,
        map_size_x: mapSizeX,
        map_size_y: mapSizeY,
        pix_size_y: pixSizeY,
        pix_scale_y: mys,
        pix_scale_x: mxs,
        robotScale: scale
        }

    const getRobot = () => {
       return(
           <div>
            <Robot rotation={props.rotation} pos={pos}/>
        </div>
       )  
    }

    
    
    //console.log({scaleH, scaleW})
    //console.log({pixSizeX, pixSizeY, mxs, mys})
    const classes = useStyles()
    return ( 
        <div>
            <div>
            
                <TransformWrapper
                    initialScale={1}
                    initialPositionX={0}
                    initialPositionY={0}
                    wheel={{ activationKeys: ['z'] }}
                    panning={{ activationKeys: ['p'] }}
                    className="react-transform-element"
                >
                
                    {({ zoomIn, zoomOut, resetTransform, setTransform, ...rest }) => (
                        <React.Fragment key="wheelDisabled">
                            
                            <Stack spacing={1} direction="row">
                            
                                <Box sx={{ '& button': { m: 0.5 } }}>
                                
                            <Box sx={{padding: '10px', position: "absolute", zIndex: 2}}>
                            
                            <motion.div 
                                initial={{ opacity: 0}}
                                whileHover={{ opacity: 1}}
                            >  
                            
                            <Box>
                            
                            <Paper>
                                <Stack spacing={1} direction="row">
                                    <Box>
                                        {/* <div style={{top: -50}}>
                                            <Button variant="contained" size="small" style={{top: -50}}
                                            onClick={() => { zoomIn(); handleZoomPlus() }}>+</Button>
                                            <Button variant="contained" size="small" style={{top: -50}} onClick={() => { zoomOut(); handleZoomNegative() }}>-</Button>
                                            <Button variant="contained" size="small" style={{top: -50}} onClick={() => { resetTransform(); setZomvar(1); handleReset() }}>x</Button>
                                        </div> */}
                                        <div>
                                             <Box sx={{textAlign: "center"}}>
                                            <Button variant="contained"  onClick={() => { resetTransform(); setZomvar(1); handleReset() }}>Reset</Button>
                                            <Button onClick={handleClick}>Obs Map</Button>
                                            </Box>
                                            <div>
                                                <IconButton variant='contained' onClick={() => { setTransform(0, 0, 2, 300, "easeOut"); handleOffset(0, mapSizeY / 2, 2) }}>
                                                    <ArrowBackIosIcon  sx={{transform: "rotate(45deg)"}}/>
                                                </IconButton>
                                                <IconButton variant='contained' onClick={() => { setTransform(-mapSizeX / 2, 0, 2, 300, "easeOut"); handleOffset(mapSizeX / 4, mapSizeY / 2, 2) }}>
                                                    <ArrowBackIosIcon  sx={{transform: "rotate(90deg)"}}/>
                                                </IconButton>
                                                <IconButton variant='contained' onClick={() => { setTransform(-mapSizeX, 0, 2, 300, "easeOut"); handleOffset(mapSizeX / 2, mapSizeY / 2, 2) }}>
                                                    <ArrowBackIosIcon sx={{transform: "rotate(135deg)"}} />
                                                </IconButton>
                                            </div>
                                            <div>
                                                <IconButton variant='contained' onClick={() => { setTransform(0, -mapSizeY / 2, 2, 300, "easeOut"); handleOffset(0, mapSizeY / 4, 2) }}>
                                                    <ArrowBackIosIcon  />
                                                </IconButton>
                                                <IconButton variant='contained' onClick={() => { setTransform(-mapSizeX / 2, -mapSizeY / 2, 2, 300, "easeOut"); handleOffset(mapSizeX / 4, mapSizeY / 4, 2) }}>
                                                    <CenterFocusStrongIcon size='large'/>
                                                </IconButton>
                                                <IconButton variant='contained' onClick={() => { setTransform(-mapSizeX, -mapSizeY / 2, 2, 300, "easeOut"); handleOffset(mapSizeX / 2, mapSizeY / 4, 2) }}>
                                                    <ArrowBackIosIcon sx={{transform: "rotate(180deg)"}} />
                                                </IconButton>
                                            </div>
                                            <div>
                                                <IconButton variant='contained' onClick={() => { setTransform(0, -mapSizeY, 2, 300, "easeOut"); handleOffset(0, 0, 2) }}>
                                                    <ArrowBackIosIcon sx={{transform: "rotate(315deg)"}} />
                                                </IconButton>
                                                <IconButton variant='contained' onClick={() => { setTransform(-mapSizeX / 2, -mapSizeY, 2, 300, "easeOut"); handleOffset(mapSizeX / 4, 0, 2) }}>
                                                    <ArrowBackIosIcon sx={{transform: "rotate(270deg)"}} />
                                                </IconButton>
                                                <IconButton variant='contained' onClick={() => { setTransform(-mapSizeX, -mapSizeY, 2, 300, "easeOut"); handleOffset(mapSizeX / 2, 0, 2) }}>
                                                    <ArrowBackIosIcon sx={{transform: "rotate(225deg)"}} />
                                                </IconButton>
                                            </div>
                                            
                                        </div>
                                    </Box>
                                </Stack>
                                </Paper>
                                </Box>
                            </motion.div>
                            </Box>
                            <div>
                            <div ref={ref} onClick={handleClickOpen}>
                            
                                <TransformComponent className="react-transform-component">
                                    <Paper >
                                        <img src={map} alt="test" onLoad={onImgLoad} style={pixSizeX ? {width: mapSizeX, height: mapSizeY} : {width: undefined, height: undefined}}/>                                 
                                        {/* <img src={`data:image/jpeg;base64,${data}`} alt="test" onLoad={onImgLoad} style={{}}/>                                  */}
                                        
                                        {/* <img src={map} alt="test" onLoad={onImgLoad} style={pixSizeX ? {width: mapSizeX, height: mapSizeY} : {width: undefined, height: undefined}}/>                                  */}
                                        {/* <img src={map} alt="test" onLoad={onImgLoad} style={{}}/>                                  */}

                                        {/* <img src={map} alt="test" /> */}

                                    {getRobot()}

                                    {props.routen && props.routen.map((point, index) => {
                                        var current = "pointMarker" + index;
                                        var nextindex = index + 1;
                                        var next = "pointMarker" + nextindex;
                                        return (
                                            <div className={current} key={index}
                                                style={{
                                                    position: 'absolute',
                                                    left: `${point[0] * mxs}px`,
                                                    top: `${(pixSizeY - point[1]) * mys}px`,
                                                }}
                                            >
                                                <LineTo from={current} to={next} borderColor="black" borderStyle="dotted" borderWidth="3" />
                                            </div>
                                        )
                                    })}

                                    {props.sensors && props.sensors.map((sensor) => {
                                        if(sensor.is_placed === true){
                                            return (
                                                <div key={sensor.id}
                                                    style={{
                                                        position: "absolute",
                                                        left: `${((sensor.position.x /  scale))*mxs - 19}px`,
                                                        top: `${( -30 + pixSizeY - sensor.position.y / scale)*mys }px`,
                                                        // left: `${(sensor.position.x /  scale) - 19}px`,
                                                        // top: `${-30 + mapSizeY - sensor.position.y / scale}px`,
                                                    }}
                                                >
                                                    <IconButton>
                                                        <SensorsSharpIcon style={{ color: "red" }} />
                                                    </IconButton>
                                                </div>
                                            )
                                        }
                                    })}

                                    {points && points.map((point) => {
                                        return (
                                            <div className="point-marker" key={point.id}
                                                style=
                                                {{
                                                    position: "absolute",
                                                    left: `${(point.x * mxs) / scale - 23}px`,
                                                    top: `${-35 + mapSizeY - (point.y * mys) / scale}px`,
                                                }}
                                            >
                                                <IconButton aria-owns={openppp[point.id - 1] ? 'mouse-over-popover' : undefined}
                                                    onMouseEnter={handlePointPopoverOpen}
                                                    onMouseLeave={handlePointPopoverClose}

                                                >
                                                    <RoomSharpIcon style={{ color: point.color }} />
                                                </IconButton>
                                            </div>
                                        )
                                    })}
                                    </Paper>
                                    <Box sx={{position: "absolute", right: 0, bottom: 0, zIndex: 3, opacity: 0.7, padding: "10px" }}>
                                        <Paper sx={{padding: "3px"}}>
                                            <Typography variant="caption">
                                                x: {props.position.position.x.toFixed(2)}, y: {props.position.position.y.toFixed(2)}
                                            </Typography>
                                        </Paper>
                                    </Box>
                                </TransformComponent>
                                
                            </div>
                            
                            </div> 
                            
                            </Box>
                            
                            </Stack>
                        </React.Fragment>
                    )}
                </TransformWrapper>
            </div>

            {/* Dialog field for choosing points and sensors */}
            <Dialog
                // fullWidth={fullWidth}
                // maxWidth={'sm'}
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
                            Sensors Available
                            {handleDropSensor()}
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
        </div>
     );
}
 
export default Map;