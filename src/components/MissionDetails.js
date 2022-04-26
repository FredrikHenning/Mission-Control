import { Button, IconButton } from "@mui/material";
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import { useState } from "react";

const MissionDetails = (props) => {
    const handleDelete=() =>{
        fetch('http://localhost:8000/points/' + props.spot.id, {
            method: 'DELETE'
        })
    }
    const [x, setX] = useState(props.spot.x)
    const [y, setY] = useState(props.spot.y)


    return ( 
        <div>
            <p>Command: {props.spot.command}, Pos: ({parseFloat(x).toFixed(2)}, {parseFloat(y).toFixed(2)})</p>
            <IconButton>
                <DeleteForeverSharpIcon onClick={handleDelete}/>
            </IconButton>
        </div>
     );
}
 
export default MissionDetails;