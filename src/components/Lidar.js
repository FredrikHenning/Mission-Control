import { Box } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from "@mui/material";

const Lidar = (props) => {

    const AreAliens = () =>{
        
        for(let i = 0; i < props.lid.length; i++){
            if(props.lid[i] != -1){
                return(
                    <div >
                        <Card sx={{ display: 'flex', justifyContent: "space-evenly", px:"20px"}}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent:"center", alignItems:"center"  }}>
                                <CardContent >
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Alien, at distance:           
                                    </Typography>
                                    <Typography variant="h6" component="div">
                                        {(parseFloat(props.lid[i].toFixed(3)))}
                                    </Typography>
                                </CardContent>
                            </Box>
                            <CardContent >
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent:"center", alignItems:"center" }}>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    SEGMENT           
                                </Typography>
                                <Typography variant="h5">
                                    {i}
                                </Typography>
                            </Box>
                            </CardContent>
                        </Card>
                    </div>
                    
                )
            }
            else if(i === 119){
                return(
                    <Card sx={{ display: 'flex', justifyContent: "space-evenly", px:"20px"}}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent:"center", alignItems:"center"  }}>
                            <CardContent >
                                <Typography variant="h6" color="text.secondary" gutterBottom>
                                    No threat detected           
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card>
                )
            }
        }
    }
    //console.log(props.lid[2])
    return ( 
        <div> 
            {AreAliens()}
        </div>
     );
}
 
export default Lidar;