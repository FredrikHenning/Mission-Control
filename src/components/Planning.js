import React from "react";
import { Box, Card, Slider, Typography, CardActionArea, CardMedia, CardContent, LinearProgress, List, ListItemText, ListItem, ListItemIcon, ListItemAvatar, Avatar} from "@mui/material";
import { maxHeight } from "@mui/system";
import Collapse from '@mui/material/Collapse';
import { TransitionGroup } from 'react-transition-group';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

function convertToPlans(losPlans){
    var PlansList = [];
    var oldPlans = losPlans;
    if(losPlans == null){console.log("Plan är nulli"); oldPlans={};}
    for(var i = 0; i<oldPlans.length; i++){
        var titleN = oldPlans[i].command;
        if(titleN == "goto" || titleN == "capture"){
        var bodyN = "x =" + oldPlans[i].x + ", y=" + oldPlans[i].y; 
        }
        else{
            var bodyN = "Sensor " + oldPlans[i].id;
        }
        var keyN = oldPlans[i].id;
        var plan = {title:titleN, body: bodyN, progress:0, key: keyN, visible:true}
        PlansList[i] = plan;
    }
    console.log(PlansList);
    return PlansList;
}

export default function PlanningComponent(props) {
    const obj1 = {title:"Pick-up", body:"x=5, y=8"};
   var PlansObjListFirst = [
       {title:"Goto", body:"x=12, y=9",progress:100, key:"100", visible:true},
        {title:"Pick-up", body:"Sensor 5",progress:0, key:"3", visible:true},
        //{title:"Goto", body:"x=19, y=9",progress:0, key:"4", visible:true },
        //{title:"Put", body:"Sensor 7",progress:0, key:"5", visible:true},
        //{title:"Goto", body:"x=44, y=12",progress:0, key:"6",visible:true}, 
        //{title:"Take picture", body:"Stone",progress:0, key:"7",visible:true}, 
        //{title:"Goto", body:"x=100, y=213",progress:0, key:"8", visible:true},
]


var planen = convertToPlans(props.plans);
console.log(planen);
const [PlansObjList, setPlansObjList] = React.useState(PlansObjListFirst);//convertToPlans(props.plans)
const [checked, setChecked] = React.useState(true);
const [direction, setDirection] = React.useState("right");
const [planscounter, setPlanscounter] = React.useState(0);
const [PlansObj, setPlansObj] = React.useState(PlansObjList.slice(0,3));

const [ProgressbarValue, setProgressbarValue] = React.useState(25);

    const handlePlansObj = () => {
        PlansObjList[planscounter].visible = false;
        setPlansObj(PlansObjList.slice(planscounter, planscounter+3));
        setTimeout(() => {
            setDirection("left")
            setPlansObj(PlansObjList.slice(planscounter+1, planscounter+4));    
        }, 250);
        setDirection("right")
        setPlanscounter(planscounter + 1);    
    }
    
    const handleProgressBar = () => {
        PlansObjList[planscounter+1].progress = PlansObjList[planscounter+1].progress + 5;
        setPlansObjList(PlansObjList);
        setPlansObj(PlansObjList.slice(planscounter, planscounter+3));
        if(PlansObjList[planscounter+1].progress >= 100)
            handlePlansObj();
        
    }
    
    const Plans = PlansObj.map((Plan) =>
        <div key={Plan.key} style={{ display: "inline-block", padding: 2}}>
        <PlanningCard title={Plan.title} body={Plan.body} color={Plan.color} progress={Plan.progress} callback={handleProgressBar} checked={Plan.visible} direction={direction}/>   
        </div>
        );

    return(
        <Box mr={10} ml={2} pt={3}> 
        <TransitionGroup>
            <div key={"2"} style={{ display: "inline-block", padding: 2}}>
                <PlanningStartCard progress={ProgressbarValue} callback={handleProgressBar} planscounter={planscounter} totalnrplans ={PlansObjList.length} name={"finished"} list={PlansObjList}/>   
            </div>
            {Plans}
            <div key={"1"} style={{ display: "inline-block", padding: 2}}>
                <PlanningStartCard progress={ProgressbarValue} callback={handleProgressBar} planscounter={planscounter} totalnrplans ={PlansObjList.length} name={"more"} list={PlansObjList}/>   
            </div>
        </TransitionGroup>  
        </Box>
        
    );
}

function PlanningCard(props){
    const handleClick = () => {
        props.callback();
        //handlePlansObj();

    }
    return(
        <Slide direction={props.direction}  in={props.checked} mountOnEnter unmountOnExit> 
        <Card sx={{ width: 150, height: 80 }} onClick={handleClick}>
        <CardActionArea>
        <CardContent style={{backgroundColor: props.color}}>
        <LinearProgress variant="determinate" value={props.progress} />
        <Typography gutterBottom variant="h6" component="div">
             {props.title}
        </Typography>

        
        <Typography variant="body2" color="text.secondary">
            {props.body}
        </Typography>
        
        </CardContent>
        </CardActionArea>
    </Card>
    </Slide> 
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
        var size;
        if(props.name == "more")
            size = props.totalnrplans - props.planscounter - 3;
        else
            size = props.planscounter;
        if(size >= 0)
        return size;
        else
        return 0;
    };

    var lista;
    if(props.name == "more")
        lista = props.list.slice(props.planscounter+3, props.totalnrplans);
    else
        lista = props.list.slice(0,props.planscounter);




    const Plans = lista.map((Plan) =>
    <ListItem>
        <ListItemAvatar><Avatar><DirectionsRunIcon/></Avatar></ListItemAvatar>
        <ListItemText primary={Plan.title} secondary={Plan.body}/>
    </ListItem>
    );
    return(
        <div>
        <Card sx={{ width: 150, height: 80 }} onClick={handleClick}>
        <CardActionArea>
        <CardContent style={{backgroundColor: "white"}}>
        <Typography gutterTop variant="h6" component="div">
             {handlePlansCount()}{" "}{props.name}{" tasks planned"}
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
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {Plans}
        </List>
      </Popover>
      </div>
    )
};