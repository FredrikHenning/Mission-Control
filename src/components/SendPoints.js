import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import useFetch from "./useFetch";
import { Box, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Popover, Select, Switch } from '@mui/material';
<<<<<<< Updated upstream

=======
import MissionDetails from "./MissionDetails";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import CommentIcon from '@mui/icons-material/Comment';
import { generatePath } from "react-router-dom";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
>>>>>>> Stashed changes



const SendPoints = () => {
    const [openOne, setOpenOne] = useState(false);
    const [points, setPoints] = useState(null);
    const [sent, setSent] = useState('Use Points');
    const [fullWidth, setFullWidth] = useState(true);
    const [pointList, setPointList] = useState(true)

    const handleClose = () => {
        setOpenOne(false);
      };

    useEffect(() => {
        
        console.log("hej");
        fetch('http://localhost:8000/points')
        .then(res => {
            return res.json();
        })
        .then(data => {
            setPoints(data);
        })
        console.log(points);
    },[sent, pointList]);
    
    const DeleteClickHandel=(url) =>{
        fetch(url, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json"
              }
        })
    }
    
    const SendClickHandel=() =>{
        var payload = {
            "position": {
                "x": 11,
                "y": 15
            }
          }
        ;
        console.log(points)
        var pointsObj = {"points":points}
        var data = JSON.stringify(pointsObj);
        var payload2 = JSON.stringify(payload);
        setSent('Use Points')
        fetch('https://localhost:7071/todo/mcpoints',
        {method: 'POST',
        body: JSON.stringify(data),
        headers: {
        'Content-Type': 'application/json',
        }})
        setOpenOne(false)
        points.map((point) => (
        
            DeleteClickHandel('http://localhost:8000/points/' + point.id)
        ))   
    }
    const handlePointList=() => {
        if(pointList)
            setPointList(false) 
        else  
            setPointList(true)
    }
    return ( 
        <div>
            {/* <Button variant="contained" onClick={SendClickHandel}>Send</Button> */}
            <Button onClick={() => 
                {
                    if(sent==='Use Points'){
                        setSent('New points waiting to be sent')
                        setOpenOne(true);
                    }
                    else{
                        setSent('Use Points')
                    }
                }}>{sent}
            </Button>

                <Dialog
                    fullWidth={fullWidth}
                    maxWidth={'sm'}
                    open={openOne}
                    onClose={handleClose}
                >
                    
                    <DialogTitle>Point</DialogTitle>
                        <DialogContent>
                            <DialogContentText >
                                {"Do you want to use these points: " }
                                
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
                                
                                
                            </Box>
                        </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button onClick={SendClickHandel} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            <Button onClick={handlePointList} > See Point List</Button>
        {points && points.map((point) => (
            <div className="blog-preview" key={point.id}>
                
                    <p>ID: {point.id} Command: {point.command} x: { point.x } y: { point.y }</p>
                    <p></p> 
            </div>
        ))}
        </div>
        
     );
}
 
export default SendPoints;