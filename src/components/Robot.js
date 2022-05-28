import React,{ useEffect, useState } from "react";
import NavigationSharpIcon from '@mui/icons-material/NavigationSharp';



const Robot = (props) => {
    var rotationen = Math.round(((props.rotation.rotation)*(180/Math.PI)+90)*-1)
    var rot = 'rotate(' + rotationen.toString() + 'deg)'
    //console.log(rot)
    const [alerts, setAlerts] = useState([]);
    // console.log(props)
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
                left: `${-12 + props.pos.x/0.133}px`,
                top: `${props.pos.map_size_y - 18 - props.pos.y/0.133}px`
            }}
        >
            <img src="./robot.png" alt="robot" width={"30px"} height={"auto"} transform={rot}/>
        </div>
    );
    return ( 
        <div>
            
            {listItems}
        </div>
     );
}
 
export default Robot;