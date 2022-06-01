import React from "react";
import { Box, Card, Slider, Typography, CardActionArea, CardMedia, CardContent, LinearProgress, List, ListItemText, ListItem, ListItemIcon, ListItemAvatar, Avatar} from "@mui/material";
import { maxHeight } from "@mui/system";
import Collapse from '@mui/material/Collapse';
import { TransitionGroup } from 'react-transition-group';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';



export default function PlanningComponent(props) {
//     const obj1 = {title:"Pick-up", body:"x=5, y=8"};
//    var PlansObjListFirst = [
//        {title:"Goto", body:"x=12, y=9",progress:100, key:"100", visible:true},
//         {title:"Pick-up", body:"Sensor 5",progress:0, key:"3", visible:true},
//         {title:"Goto", body:"x=19, y=9",progress:0, key:"4", visible:true },
//         //{title:"Put", body:"Sensor 7",progress:0, key:"5", visible:true},
//         //{title:"Goto", body:"x=44, y=12",progress:0, key:"6",visible:true}, 
//         //{title:"Take picture", body:"Stone",progress:0, key:"7",visible:true}, 
//         //{title:"Goto", body:"x=100, y=213",progress:0, key:"8", visible:true},
// ]

// //console.log(props.plans)
// //var planen = convertToPlans(props.plans);
// //console.log("detta är planen");
// //console.log(planen);
// const [PlansObjList, setPlansObjList] = React.useState(planen);//convertToPlans(props.plans)
// const [checked, setChecked] = React.useState(true);
// const [direction, setDirection] = React.useState("right");
// const [planscounter, setPlanscounter] = React.useState(0);
// const [PlansObj, setPlansObj] = React.useState(PlansObjList.slice(0,3));

// const [ProgressbarValue, setProgressbarValue] = React.useState(25);

//     const handlePlansObj = () => {
//         PlansObjList[planscounter].visible = false;
//         setPlansObj(PlansObjList.slice(planscounter, planscounter+3));
//         setTimeout(() => {
//             setDirection("left")
//             setPlansObj(PlansObjList.slice(planscounter+1, planscounter+4));    
//         }, 250);
//         setDirection("right")
//         setPlanscounter(planscounter + 1);    
//     }
    
//     const handleProgressBar = () => {
//         PlansObjList[planscounter+1].progress = PlansObjList[planscounter+1].progress + 5;
//         setPlansObjList(PlansObjList);
//         setPlansObj(PlansObjList.slice(planscounter, planscounter+3));
//         if(PlansObjList[planscounter+1].progress >= 100)
//             handlePlansObj();
        
//     }
    
    const Plans = props.plans.map((Plan, index) =>
        <div key={index} style={{ display: "inline-block", width: "100%"}}>
        <PlanningCard title={Plan.title} body={Plan.body} color={Plan.color} />   
        </div>
        );

    return(
        <Box > 
        {/* <TransitionGroup > */}
            <div key={"2"} style={{ display: "inline-block", width: "100%"}}>
                <PlanningStartCard name={"finished"} list={props.plans}/>   
            </div>
            {Plans}
            {/* <div key={"1"} style={{ display: "inline-block", width: "100%"}}>
                <PlanningStartCard name={"more"} list={props.plans}/>   
            </div> */}
        {/* </TransitionGroup>   */}
        </Box>
        
    );
}

function PlanningCard(props){
    
    return(
        //<Slide direction={"down"}  in={true} mountOnEnter unmountOnExit> 
        <Card sx={{ height: 80 }} >
        <CardActionArea>
        <CardContent style={{backgroundColor: props.color}}>
        <LinearProgress variant="determinate" value={100} />
        <Typography gutterBottom variant="h6" component="div">
             {props.title}
        </Typography>

        
        <Typography variant="body2" color="text.secondary">
            {props.body}
        </Typography>
        
        </CardContent>
        </CardActionArea>
    </Card>
    //</Slide> 
    )
};

function PlanningStartCard(props){
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const handlePlansCount = () =>{
        return props.list.length;
    };




    const Plans = props.list.map((Plan, index) =>
    <ListItem key={index}>
        <ListItemAvatar><Avatar><DirectionsRunIcon/></Avatar></ListItemAvatar>
        <ListItemText primary={Plan.title} secondary={Plan.body}/>
    </ListItem>
    );


    return(
        <div>
    <Card sx={{ height: 80, padding: "5px"}} onClick={handleClick}>
        <CardActionArea>
        <CardContent style={{backgroundColor: "white"}}>
        <Typography variant="h6" component="div">
             {"Planned tasks"}
        </Typography>
        </CardContent>
        </CardActionArea>
    </Card>
    <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <List sx={{bgcolor: 'background.paper' }}>
        {Plans}
        </List>
      </Popover>
      </div>
    )
};