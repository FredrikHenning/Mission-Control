import SmartToySharpIcon from "@mui/icons-material/SmartToySharp";
import React,{ useEffect, useState } from "react";
import { positions } from "@mui/system";
import NavigationSharpIcon from '@mui/icons-material/NavigationSharp';


const Robot = (props) => {
    const [alerts, setAlerts] = useState([]);
    console.log(props)
    useEffect(() => {
        var message = "Position of the robot: x: " + props.pos.x.toFixed(2) + " y: " + props.pos.y.toFixed(2);
        console.log(message);

        if(message != alerts[0]){
            if(alerts.length < 7){
                setAlerts([message]);
            }
            else{
                setAlerts([message]);
            }
        }
    });

    const listItems = alerts.map((number) => 
        <div key={number}
            style= {{
                position: "absolute",
                left: `${props.pos.x}px`,
                top: `${props.pos.y}px`
            }}
        >
            <NavigationSharpIcon/>
        </div>
    );
    return ( 
        <div>
            
            {listItems}
        </div>
     );
}
 
export default Robot;