import React, { createRef, useCallback, useEffect } from 'react';
import { createContext } from 'react';
import { useState } from 'react';
import { Container, Card, InputGroup, Form, Button, ButtonGroup, Dropdown } from 'react-bootstrap'


function ip_input(){
    const [ip, setIP] = useState(null);
    const [cameras, setCameras] = useState(null);
    const readVal = createRef();
    const [selCam, setSelCam] = useState(null);
    const connectButton = useCallback(()=>{setIP(readVal.current.value)});

    useEffect(()=>{
        fetch(`http://${ip}`)
            .then(()=>response.text())
            .then((data)=>{
                setCameras(data.split("\n"));
            })
            .catch((err)=>{console.error('ERROR',err)});
    },[ip,]);

    
    return(
        <>
        <Card>
            <Card.Header>Enter IP</Card.Header>
            <Card.Body>
                <InputGroup>
                    <Form.Control name='Ip' type='text' ref={readVal}></Form.Control>
                    <Button onClick={connectButton}>Connect to IP</Button>
                </InputGroup>
                <Form.Select onChange={(val)=>{setSelCam(val.target.value)}}>
                    {cameras?.map((val,idx)=>{
                        return(
                            <option key ={idx} value={idx}>Camera {idx+1}</option>
                        );
                    })}
                </Form.Select>     
            </Card.Body>
        </Card>
        <Card style={{width:'100%'}}>
            <Card.Header>Video Stream</Card.Header>
            <Card.Body>
                    <video src={`http://${ip}/${selCam}`} type="video/mp4"></video>
            </Card.Body>
        </Card>
        </>
    );
}


function CameraControl(){
   

    return(
        <Container className='p-4'>
            <div className='card-deck'>
                {ip_input()}
            </div>
        </Container>
    )

}

export default CameraControl;