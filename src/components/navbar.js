import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Battery90Icon from '@mui/icons-material/Battery90';
import Battery20Icon from '@mui/icons-material/Battery20';
import Battery30Icon from '@mui/icons-material/Battery30';
import Battery50Icon from '@mui/icons-material/Battery50';
import Battery60Icon from '@mui/icons-material/Battery60';
import Battery80Icon from '@mui/icons-material/Battery80';
import BatteryAlertIcon from '@mui/icons-material/BatteryAlert';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import './navbar.css';
import { useEffect} from "react";

import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import GridOnIcon from '@mui/icons-material/GridOn';


//import MenuIcon from '@mui/icons-material/Menu';
function ShowBattery(props){
        if(props.Battery >= 90)
            return(<Battery90Icon fontSize="large"/>);
        else if(props.Battery >= 80)
            return(<Battery80Icon fontSize="large"/>);
        else if(props.Battery >= 60)
            return(<Battery60Icon fontSize="large"/>);
        else if(props.Battery >= 50)
            return(<Battery50Icon fontSize="large"/>);
        else if(props.Battery >= 30)
            return(<Battery30Icon fontSize="large"/>);
        else if(props.Battery >= 10)
            return(<Battery20Icon fontSize="large"/>);
        else
            return(<BatteryAlertIcon fontSize='large'/>);
        
    //if(this.state.battery > 80)   
    // else       // return <DirectionsRunIcon/>;
}





export default function ButtonAppBar() {
    const [RunColor, setRunColor] = React.useState("default");
    const handleRunClick = () => {
        if(RunColor === "default"){
            setRunColor("inherit")
            setMobilityStatus("Moving")
        }
        else{
            setRunColor("default")
            setMobilityStatus("Idle")
        }}
    const [Battery, setBattery] = React.useState(30);
    
    const handleBattery = () => {
        if(Battery < 10){
            setBattery(99)
        }
        else{
            setBattery(Battery-10)
        }
    }
    
  const [mobilityStatus, setMobilityStatus] = React.useState("Moving");
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState(null);
  const [icon, setIcon] = React.useState(null);

  const hoverInventory = () => {
    setMessage("Inventory")
    setIcon(<GridOnIcon  fontSize="large"/>)
    setOpen(true);}

  const hoverBattery = () => {
    var batteryMessage = "Battery: " + Battery + "%"
    setMessage(batteryMessage)
    setIcon(<ShowBattery Battery={Battery}/>)
    setOpen(true);}
   
  const hoverRun = () => {
    var mobilityMessage = "Mobility status: " + mobilityStatus
    setMessage(mobilityMessage)
    setIcon(<DirectionsRunIcon fontSize="large"/>)
    setOpen(true);}

  const handleClose = (event) => {
      setOpen(false);
    };

  useEffect(() => {
    fetch('http://localhost:8000/navbardata')
      .then(res => {
        return res.json();
      })
      .then(data => {
        setBattery(data.Battery);
        setMobilityStatus(data.MobilityStatus);
        
      })
    }, [])


    
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Mission Control
          </Typography>
          
          <IconButton  color={RunColor} onClick={handleRunClick} onMouseEnter={hoverRun} onMouseLeave={handleClose}>
            <DirectionsRunIcon fontSize="large"/>
          </IconButton>
          
          <IconButton color="inherit" onClick={handleBattery} onMouseEnter={hoverBattery} onMouseLeave={handleClose}>
            <ShowBattery Battery={Battery}/>
          </IconButton>
          <IconButton color="inherit" onMouseEnter={hoverInventory} onMouseLeave={handleClose}>
            <GridOnIcon  fontSize="large"/>
          </IconButton>
          <Button color="inherit">Login</Button>

          

        </Toolbar>
        
      </AppBar>
      <Snackbar open={open} autoHideDuration={10000} onClose={handleClose} 
          anchorOrigin={{horizontal:'right', vertical:'top'}} 
          className="snaapbar">
            <Alert icon={icon} severity="success" sx={{ width: '100%' }} onClose={handleClose}>
            {message}
            </Alert>
        </Snackbar>
    </Box>

    
  );
}