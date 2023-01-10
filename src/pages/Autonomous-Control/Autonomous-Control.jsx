import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


// function modeButtons(){
//     const [mode, setMode] = useState("Manual");//replace with current rover mode 

//     let styleBool = false;

//     switch(mode){
//         case "Auto":
//             console.log("Auto");
//             styleBool = true;
//             break;
//         case "Manual":
//             console.log("Manual");
//             styleBool = false;
//             break;
//         default:
//             console.log("No option");
//             break;
//     }
    
//     return(
//         <div className='card' style={{width: '21rem'}}>
//             <h5 className="card-title text-center">Current Mode: {mode}</h5>
//             <div className='card-body'>
//                 <div className='modeButtons'>
//                     <button onClick={()=>setMode("Auto")} style={{backgroundColor: styleBool ? "green" : '#696e69'}} className='selector'>Auto</button>
//                     <button onClick={()=>setMode("Manual")} style={{backgroundColor: styleBool ? '#696e69' : "green"}} className='selector'>Manual</button>
//                 </div>
//             </div>
//         </div>
//     );
// }


function AutonomousControl() {
    return (
        <Container className = "p-2">
            Autonomous
        </Container>
    );
}

export default AutonomousControl;
