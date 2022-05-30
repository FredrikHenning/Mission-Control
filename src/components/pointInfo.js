import { Button, IconButton, Paper, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


export default function PointInfo({point, handleDelete}){
    return ( 
        <Box sx={{width: "100%"}}>
            <Paper>
                <Box>
                    <Card sx={{ display: 'flex', justifyContent: "space-evenly" }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Command: {point.command}             
                                </Typography>
                                <Typography variant="h6" component="div">
                                    ({parseFloat(point.x).toFixed(2)}, {parseFloat(point.y).toFixed(2)}) 
                                </Typography>
                            </CardContent>
                        </Box>
                            <IconButton onClick={() => handleDelete(point.id)}>
                                <DeleteIcon/>
                            </IconButton>
                        
                    </Card>
                </Box>
            </Paper>
        </Box>
     );
}
 
