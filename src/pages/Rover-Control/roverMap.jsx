import { MapContainer,TileLayer,useMap,Marker,Popup, ScaleControl, useMapEvents } from 'react-leaflet';
import L, { marker } from "leaflet";
import React, { useContext, useEffect, useState } from 'react';
import { Button, ButtonGroup, InputGroup, FormControl,Form} from 'react-bootstrap';
import { RosContext } from '../../utilities/ROS/RosContext';
import { rosNode } from '../../utilities/ROS/ROS';
import { useNavigate } from 'react-router-dom';
import { createRef } from 'react';
import { useCallback } from 'react';


function RoverMap() {
  
  const {rosState} = useContext(RosContext);
  const [markers, setMarkers] = useState([null]);
  const [clickSpot, setClickSpot] = useState(null);
  const nav = useNavigate();
  const [waypoint,setWaypoint] =  useState([null]);
  const wayLat = createRef();
  const wayLng = createRef();
  if(rosState === 'Connected'){
    rosNode.gps_sub.subscribe((newCord)=>{
      if(markers!=null){
        setMarkers(prevMarkers=>[...prevMarkers, [newCord.latitude, newCord.longitude]]);
      }
      else {
        setMarkers([[newCord.latitude, newCord.longitude]]);
      }
    });
  }
  const locateClick = (e) => {
    setClickSpot(e.latlng);
  }
  const updateWaypoints = useCallback(()=>{
    console.log(wayLat.current.value)
    let waypoints = [...waypoint];
    
    if(wayLat.current && wayLng.current){
      waypoints.push([wayLat.current.value,wayLng.current.value]);
      wayLat.current.value = "";
      wayLng.current.value="";
    }
    setWaypoint(waypoints);
  });
    //MDRC: [38.4063,-110.7918]
    //Behind optics: [34.722063,-86.638750]
  return (
    <>
      <MapContainer center={[38.4063,-110.7918]} zoom={13} scrollWheelZoom={false} style={{height:'95%',width:'100%'}} maxZoom={18} minZoom={12} onClick={locateClick}>
        <ScaleControl position='bottomright' />
        <TileLayer  url="./map2/{z}/{x}/{y}.png"/>
        {markers?.map((val,idx,positions)=>{
          if(val!= null){
            var makerIcon = (idx === positions.length-1) ? createRoverIcon(21) : prevIcon(21);
            return(
              <Marker position={val} icon={makerIcon} key={idx}>
                <Popup>
                  Rover position: {(idx=== positions.length-1 )? "Current" : idx }
                </Popup>
              </Marker>
            );
          }
        })}
        {clickSpot && (
          <Marker position={clickSpot} icon={L.icon({ iconUrl: './target.png', iconSize: [150] })}>
            <Popup>
              Do you want to navigate to these coordinates?<br />
              Latitude: {clickSpot.lat}<br />
              Longitude: {clickSpot.lng}<br />
              <Button variant="primary" onClick={() => { console.log(clickSpot); nav(`/Autonomous-Control?lat=${clickSpot.lat}&lng=${clickSpot.lng}`); }}>Yes</Button>
              <Button variant="secondary" onClick={() => setClickSpot(null)}>No</Button>
            </Popup>
          </Marker>
        )}
        {waypoint?.map((val,idx)=>{
          if(val){
            return(
                <Marker position={val} >
                  <Popup>Waypoint {idx}</Popup>
                </Marker>
              );
          }
        })}
        <MapClickHandler onMapClick={(e)=>setClickSpot(e.latlng)} />
      </MapContainer>
      <ButtonGroup>  
        <Button style={{height:'9%',width:'100%', borderRightColor:'black'}} onClick={()=>{setMarkers([null]);setWaypoint([null]);}}>Reset Rover Path</Button> 
        {/*<Button style={{height:'9%',width:'100%'}} onClick={testCallback}>Force Add</Button> */}
        <Button style={{height:'9%',width:'100%', borderLeftColor: 'black',borderRightColor:'black'}} onClick={() => setClickSpot(null)}>Cancel Select</Button>
        <Button style={{height:'9%',width:'100%', borderLeftColor: 'black'}} onClick={updateWaypoints}>Add Waypoint</Button>
      </ButtonGroup>
      <InputGroup>
          Lat:
          <Form.Control name="lat" type="number" ref={wayLat}/>
          Lng:
          <Form.Control name="lng" type="number" ref={wayLng}/>
      </InputGroup>
    </>
  );  
}


function prevIcon(_iconSize){
    return L.icon({
        iconUrl: "./prevPos.png",
        iconSize: [_iconSize]
    })
}

function createRoverIcon(_iconSize){
    //Creates the icon since png isn't compatible with leaflet
    return L.icon({
        iconUrl: "./RoverTop.png",
        iconSize: [_iconSize],
    })
}

function MapClickHandler(props) {
    const map = useMapEvents({
      click: (e) => {
        props.onMapClick(e);
      }
    })}

export default RoverMap;