import { Avatar, avatarClasses, Button, Chip, IconButton, Popover, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';


import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { CardMedia } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { blue, cyan, red } from '@mui/material/colors';
import { ThreeSixty } from '@mui/icons-material';
import { useState } from 'react';
import { width } from '@mui/system';

const useStyles = makeStyles({
    root: {
        maxWidth: 600
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

const MapImage = () => {

    const [map, setMap] = useState("/cuteTurtleAlmostTurquis.png")
    const [mapTwo, setMapTwo] = useState("/mars2.png")
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

    const classes = useStyles()
    return ( 
        <div>
            <Card className={classes.root}>
                 
                <CardHeader
                    className={classes.headerHeight}
                    // sx={{ bgcolor: cyan[700] }}

                    action={
                        <IconButton aria-owns={open ? 'mouse-over-popover' : undefined} 
                            onMouseEnter={handlePopoverOpen}
                            onMouseLeave={handlePopoverClose} 
                            onClick = {handleClick}
                            
                            edge = 'false' 
                            size='small'
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
                <CardMedia
                    className={classes.media}
                    component="img"
                    height="194"
                    image={map}
                    alt="Mars1"
                />
            </Card>
      </div>
     );
}
 
export default MapImage;