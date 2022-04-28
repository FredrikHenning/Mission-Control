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
        var payload2 = JSON.stringify(payload);
        setSent('Use Points')
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

    return (
        <><Box>
            <Paper elevation={2} >
            <Button onClick={() => {
                    if (sent === 'Use Points') {
                        setSent('New points waiting to be sent');
                        setOpenOne(true);
                    }
                    else {
                        setSent('Use Points');
                    }
                } }>{sent}
                </Button>
                    <List>
                        {points && points.map((point) => (
                            <ListItem
                                secondaryAction={<IconButton edge="end" aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>}
                            >
                            
                                <ListItemText
                                    primary={<MissionDetails spot={point} />}
                                />
                            </ListItem>
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
        <div>
                
                <Button onClick={handlePointList}> See Point List</Button>
                
            </div></>

    );
}

export default SendPoints;