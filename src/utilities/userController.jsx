import React, {useContext, useEffect, useState} from "react";
import { RosContext } from "./ROS/RosContext";

function useController(val){
    console.log("here!");
    const [leftInput, setLeftInput] = useState(0);
    const [rightINput, setRightInput] = useState(0);
    const [rosState] = useContext(RosContext);

    useEffect(()=>{
        if(val){
            const interval = setInterval(()=>{
                const controller = navigator.getGamepads()[val];
                setLeftInput(controller.axes[0]);
                setRightInput(controller.axes[1]);
            },50);
        }
        console.log(leftInput);
        console.log(rightINput);
    },[]);    
}




export default useController;