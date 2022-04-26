import { Button, IconButton } from "@mui/material";
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';

const MissionDetails = (props) => {
    const handleDelete=() =>{
        fetch('http://localhost:8000/points/' + props.spot.id, {
            method: 'DELETE'
        })
    }

    return ( 
        <div>
            <p>Command: {props.spot.command}, Pos: ({props.spot.x}, {props.spot.y})</p>
            <IconButton>
                <DeleteForeverSharpIcon onClick={handleDelete}/>
            </IconButton>
        </div>
     );
}
 
export default MissionDetails;