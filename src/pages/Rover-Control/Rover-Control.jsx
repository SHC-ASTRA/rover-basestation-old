import { Container } from 'react-bootstrap';
import { MapContainer,TileLayer,useMap,Marker,Popup } from 'react-leaflet';
function RoverControl() {
    return (<>
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{height:300,width:500}}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
</MapContainer>  
    </>
    );
}

export default RoverControl;
