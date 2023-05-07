import { MapContainer,TileLayer,useMap,Marker,Popup, ScaleControl, useMapEvents } from 'react-leaflet';
import L, { marker } from "leaflet";
import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import ros from '../../utilities/ROS/ROS';

class RoverMap extends React.Component{
    constructor(){
        super();
        this.state = {markers: [null], clickSpot : null};
        const listener = new ROSLIB.Topic({ros:ros,name: "/teensy/gps", messageType: "embedded_controller_relay/NavSatReport"});
        listener.subscribe(this.addMarker);
    }
    
    addMarker = (newCord)=>{
        if(this.state.markers !=null){
            this.setState({markers: [...this.state.markers, [newCord.latitude,newCord.longitude]]});
        }
        else{
            this.setState({markers: [[newCord.latitude,newCord.longitude]]})
        }
    }
  
  

    render(){

        return(
            <>
            <MapContainer center={[38.4063,-110.7918]} zoom={13} scrollWheelZoom={false} style={{height:'95%',width:'100%'}} maxZoom={18} minZoom={13} onClick={this.locateClick}>
                <ScaleControl position='bottomright' />
                <TileLayer  url="./map2/{z}/{x}/{y}.png"/>
                {this.state.markers.map((val,idx,positions)=>{
                    if(val!= null){
                    var makerIcon = (idx === positions.length-1) ? createRoverIcon(21) : prevIcon(21);
                    return(
                        <Marker position={val} icon={makerIcon} key={idx}>
                            <Popup>
                                Rover position: {(idx=== positions.length-1 )? "Current" : idx }
                            </Popup>
                        </Marker>
                    );}
                })}
                  {this.state.clickSpot && (
            <Marker position={this.state.clickSpot} icon={L.icon({ iconUrl: './target.png', iconSize: [150] })}>
              <Popup>
                Do you want to navigate to these coordinates?<br />
                Latitude: {this.state.clickSpot.lat}<br />
                Longitude: {this.state.clickSpot.lng}<br />
                <Button variant="primary" onClick={() => console.log('Navigating...')}>Yes</Button>{/*Fix this to send a ROS autonomous command */}
                <Button variant="secondary" onClick={() => this.setState({ clickSpot: null })}>No</Button>
              </Popup>
            </Marker>
          )}
          <MapClickHandler onMapClick={(e)=>this.setState({clickSpot: e.latlng})} />
            </MapContainer>
            <ButtonGroup>  
            <Button style={{height:'9%',width:'100%'}} onClick={()=>this.setState({markers: [null]})}>Reset Rover Path</Button> 
            {/*<Button style={{height:'9%',width:'100%'}} onClick={this.testCallback  }>Force Add</Button> */}
            <Button style={{height:'9%',width:'100%', borderLeftColor: 'black'}} onClick={()=>this.setState({clickSpot: null})}>Cancel Select</Button> 
            
            </ButtonGroup>
            </>
        );  
    }
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