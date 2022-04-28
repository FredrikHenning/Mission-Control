import { Button, IconButton } from "@mui/material";
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import { useState } from "react";

const MissionDetails = (props) => {
    
    const [x, setX] = useState(props.spot.x)
    const [y, setY] = useState(props.spot.y)


    return ( 
        <div>
            <p>Command: {props.spot.command}, Pos: ({parseFloat(x).toFixed(2)}, {parseFloat(y).toFixed(2)})</p>
        </div>
     );
}
 
export default MissionDetails;