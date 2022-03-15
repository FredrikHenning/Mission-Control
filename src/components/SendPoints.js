import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import useFetch from "./useFetch";
import { Box, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Popover, Select, Switch } from '@mui/material';




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
        setSent('Use Points')
        fetch('http://localhost:8001/points',
        {method: 'POST',
        body: JSON.stringify(points),
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
                
                    <p>Command: {point.command}</p>
                    <p>ID: { point.id}</p> 
            </div>
        ))}
        </div>
        
     );
}
 
export default SendPoints;