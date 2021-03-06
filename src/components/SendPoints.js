import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import useFetch from "./useFetch";
import { Box, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Popover, Select, Switch } from '@mui/material';
import MissionDetails from "./MissionDetails";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { Paper } from "@mui/material";
import PointInfo from "./pointInfo";

const SendPoints = (props) => {
    const [openOne, setOpenOne] = useState(false);
    const [points, setPoints] = useState(null);
    const [sent, setSent] = useState('Send mission');
    const [fullWidth, setFullWidth] = useState(true);
    const [pointList, setPointList] = useState(true)

    const handleClose = () => {
        setOpenOne(false);
    };

    useEffect(() => {

        // console.log("hej");
        fetch('http://localhost:8000/points')
            .then(res => {
                return res.json();
            })
            .then(data => {
                setPoints(data);
            })
        // console.log(points);
    }, [sent, pointList]);

    const DeleteClickHandel = (url) => {
        fetch(url, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json"
            }
        })
    }

    const SendClickHandel = () => {
        var payload = {
            "position": {
                "x": 11,
                "y": 15
            }
        }
            ;
        // console.log(points)
        var pointsObj = { "points": points }
        var data = JSON.stringify(pointsObj);
        
       // props.sub.publish("mcpoints", data)

        setSent('Send mission')
        fetch('https://localhost:7071/todo/mcpoints',
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        setOpenOne(false)
        points.map((point) => (

            DeleteClickHandel('http://localhost:8000/points/' + point.id)
        ))
    }
    const handlePointList = () => {
        if (pointList)
            setPointList(false)
        else
            setPointList(true)
    }
    
    const handleButton = (e) => {
        // console.log(e)
    }

    const handleDelete=(id) =>{
        fetch('http://localhost:8000/points/' + id, {
            method: 'DELETE'
        })
    }

    return (
        <>
        <Box sx={{ textAlign: 'center'}}>
            <Paper elevation={2} sx= {{padding: "20px"}} >
            <Typography variant="h6" sx= {{padding: "10px"}}>
                List of added points
            </Typography>
            <Button onClick={() => {
                    if (sent === 'Send mission') {
                        setSent('Send mission');
                        setOpenOne(true);
                    }
                    else {
                        setSent('Send mission');
                    }
                } }>{sent}
                </Button>
                <Button onClick={handlePointList}> Update list</Button>
                    <List>
                        {points && points.map((point) => (
                            <div className="point-list" key={point.id}>
                            <ListItem sx={{width: "100%"}}>
                                <PointInfo sx={{width: "100%"}} point={point} handleDelete={handleDelete}/>
                            </ListItem>
                            </div>
                            ))} 
                    </List>
                    </Paper>
        </Box>
        <Dialog
                    fullWidth={fullWidth}
                    maxWidth={'sm'}
                    open={openOne}
                    onClose={handleClose}
                >

                    <DialogTitle>Point</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {"Do you want to use these points: "}
                            <List>
                        {points && points.map((point) => (
                            <div className="point-list" key={point.id}>
                            <ListItem sx={{width: "100%"}}>
                                <PointInfo sx={{width: "100%"}} point={point} handleDelete={handleDelete}/>
                            </ListItem>
                            </div>
                            ))} 
                    </List>

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
                </Dialog></>

    );
}

export default SendPoints;