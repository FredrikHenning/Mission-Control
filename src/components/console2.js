
import {Component} from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { ConstructionOutlined, DriveEtaOutlined } from '@mui/icons-material';
import { positions } from '@mui/system';
import SmartToySharpIcon from '@mui/icons-material/SmartToySharp';
import './console.css'
import Collapse from '@mui/material/Collapse';
import { TransitionGroup } from 'react-transition-group';
import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Box } from '@mui/system';
import { Paper } from '@mui/material';
import { Typography } from '@mui/material';

export default function Console2(props) {

  const [dt, setDt] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
      let secTimer = setInterval( () => {
        setDt(new Date().toLocaleTimeString())
      }, 1000)

      return () => clearInterval(secTimer);
  }, []);

const listItems2 = props.message.map( (number) => 
  <div key={number}>
    <Collapse in={true}>
    <ListItem>
      <Alert severity={number.severity}>
          {number.message}
      </Alert>
      {/* <Typography sx={{pl:"10px"}} variant="overline">
        {dt} 
      </Typography> */}
    </ListItem>
    </Collapse>        
  </div>);


    return(
      <Box>
        <Paper elevation={2} sx={{padding: "10px", height: "300px"}}>
          <Typography variant="h6" sx= {{padding: "10px"}}>
                Console
          </Typography>
          <List className='console-root' sx={{maxHeight:'225px', overflow: 'auto'}}>
            {/* {listItems} */}
            <TransitionGroup>
              <Stack>
                {listItems2}
              </Stack>
            </TransitionGroup>
          </List>
        </Paper>
      </Box>
    );
}