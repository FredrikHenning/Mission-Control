import { Button, IconButton, Paper, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from "@mui/material";


export default function PointInfo({point, handleDelete}){
    return ( 
        <Box sx={{width: "100%", textAlign: "center"}}>
            <Paper>
                <Box>
                    <Typography variant="body2">
                        Command: {point.command},  
                        Pos: ({parseFloat(point.x).toFixed(2)}, {parseFloat(point.y).toFixed(2)}) 
                    
                    <IconButton onClick={() => handleDelete(point.id)}>
                        <DeleteIcon/>
                    </IconButton>
                    </Typography>
                </Box>
            </Paper>
        </Box>
     );
}
 
