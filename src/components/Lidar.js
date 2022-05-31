

const Lidar = (props) => {
    
    const AreAliens = () =>{
        
        for(let i = 0; i < props.lid.length; i++){
            if(props.lid[i] != -1){
                return(<div>{"Aliens detected at segment: " + i + " position: " + parseFloat(props.lid[i].toFixed(3)) }</div>)
            }
            else if(i === 119){
                return( <div>{"No threat detected"}</div>)
            }
        }
    }
    // console.log(props.lid[2])
    return ( 
        <div> {AreAliens()}
        {/* {props.lidar && props.lidar.map((lid) => {
            for(let i=0; i < lid.segments.lenght; i++){
                if(lid.segments[i] !== -1){
                
                    return (
                        <div key={lid.id}> {"Alien detected at segment: " + lid.id }</div>
                    )
                }
                else{
                    return (
                        <div key={lid.id}> 
                        {console.log(i)}
                        </div>
                    )
                }
            }
        })} */}
    </div>
     );
}
 
export default Lidar;