import React,{ useEffect, useState } from "react";
import robotImage from "./robot.png";

const Robot = (props) => {
    var robosizey = 2 / props.pos.robotScale;
    var robosizex = 3 / props.pos.robotScale;
    var rot = 'rotate(' + Math.round((props.rotation.rotation)*(180/Math.PI)*-1).toString() + 'deg)'
    //console.log(rot)
    const [alerts, setAlerts] = useState([]);
    //console.log(props)
    useEffect(() => {
        var message = "Position of the robot: x: " + props.pos.x.toFixed(2) + " y: " + props.pos.y.toFixed(2);

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
                left: `${-12 + (props.pos.x/props.pos.robotScale)*props.pos.pix_scale_x}px`,
                top: `${props.pos.map_size_y - 18 - (props.pos.y/props.pos.robotScale)*props.pos.pix_scale_y}px`
            }}
        >
            <img
                width= {robosizex}
                height= {robosizey}
                style={{transform: rot}}   
                src={robotImage}
             />
        </div>
    );
    return ( 
        <div>
            
            {listItems}
        </div>
     );
}
 
export default Robot;