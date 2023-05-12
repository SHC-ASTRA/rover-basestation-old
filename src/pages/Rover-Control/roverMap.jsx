import { MapContainer,TileLayer,useMap,Marker,Popup, ScaleControl, useMapEvents } from 'react-leaflet';
import L, { marker } from "leaflet";
import React, { useContext, useEffect, useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { RosContext } from '../../utilities/ROS/RosContext';
import { rosNode } from '../../utilities/ROS/ROS';
import { useNavigate } from 'react-router-dom';


function RoverMap() {
  const {rosState} = useContext(RosContext);
  const [markers, setMarkers] = useState([null]);
  const [clickSpot, setClickSpot] = useState(null);
  const nav = useNavigate();
  if(rosState === 'Connected'){
    rosNode.gps_sub.subscribe((newCord)=>{
      if(markers!=null){
        setMarkers(prevMarkers=>[...prevMarkers.slice(-1), [newCord.latitude, newCord.longitude]]);//TEST THIS
      }
      else {
        setMarkers([[newCord.latitude, newCord.longitude]]);
      }
    });
  }
  const locateClick = (e) => {
    setClickSpot(e.latlng);
  }

  return (
    <>
      <MapContainer center={[38.4063,-110.7918]} zoom={13} scrollWheelZoom={false} style={{height:'95%',width:'100%'}} maxZoom={18} minZoom={13} onClick={locateClick}>
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
              <Button variant="primary" onClick={() => { console.log(clickSpot); nav(`/Autonomous-Control?lat=${clickSpot.lat}&lng=${clickSpot.lng}`); }}>Yes</Button>{/*Fix this to send a ROS autonomous command */}
              <Button variant="secondary" onClick={() => setClickSpot(null)}>No</Button>
            </Popup>
          </Marker>
        )}
        <MapClickHandler onMapClick={(e)=>setClickSpot(e.latlng)} />
      </MapContainer>
      <ButtonGroup>  
        <Button style={{height:'9%',width:'100%'}} onClick={()=>setMarkers([null])}>Reset Rover Path</Button> 
        {/*<Button style={{height:'9%',width:'100%'}} onClick={testCallback}>Force Add</Button> */}
        <Button style={{height:'9%',width:'100%', borderLeftColor: 'black'}} onClick={() => setClickSpot(null)}>Cancel Select</Button> 
      </ButtonGroup>
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