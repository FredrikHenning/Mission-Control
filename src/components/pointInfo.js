import { Button, IconButton, Paper } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';


export default function PointInfo({point, handleDelete}){
    return ( 
        <div>
            <Paper>
                <p>
                    Command: {point.command}, Pos: ({parseFloat(point.x).toFixed(2)}, {parseFloat(point.y).toFixed(2)})
                    <IconButton onClick={() => handleDelete(point.id)}>
                        <DeleteIcon/>
                    </IconButton>
                </p>
            </Paper>
        </div>
     );
}
 
