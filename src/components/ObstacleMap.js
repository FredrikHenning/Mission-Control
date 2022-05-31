import { Paper } from "@mui/material";
import SensorsSharpIcon from '@mui/icons-material/SensorsSharp';
import { useState } from "react";


const ObstacleMape = (props) => {
    const [a, setA] = useState(0)
    var b = 0;
    return ( 
        <div>
            <Paper>
                <img src="mars1.png" alt="test" />
                {/* {props.obstacleMap && a != 500 && props.obstacleMap.image.map((ob, i) =>{
                                                return(
                                                    <div key={i}>
                                                        
                                                        <ul>
                                                            {ob.map((pixeObs, j) =>{
                                                                b = b +1;
                                                                if(pixeObs != 0){
                                                                    return(
                                                                        <div key={j}
                                                                            style={{
                                                                                position: "absolute",
                                                                                left: `${i*0.6}px`,
                                                                                top: `${(700 - j)*0.8}px`,
                                                                            }}
                                                                        >
                                                                            
                                                                            *
                                                                        </div>
                                                                        
                                                                    )
                                                                }
                                                            })}
                                                        </ul>
                                                    </div>
                                                )
                                        })} */}
                                        {() => {if(a != 500 ) {setA(b); console.log("its at 500")}}}{/* <SensorsSharpIcon sx={{width: '1px', height: '1px'}} style={{ color: "blue" }} /> */}
            </Paper>
        </div>
     );
}
 
export default ObstacleMape;