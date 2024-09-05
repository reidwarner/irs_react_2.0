import './App.css';
import * as React from 'react';
import Map, {Marker, Popup} from 'react-map-gl';
import { useState, useEffect } from 'react';
import BlogFeed from './components/BlogFeed';

const BASE_URL = 'https://irs-rest-service.onrender.com';

function App() {
  const [lngLat, setLngLat] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapSize, setMapSize] = useState(["95vw", "75vh"]);
  const [locations, setLocations] = useState([]);
  
  const addNewLocation = async () => {
    const response = await fetch(
        BASE_URL + '/locations', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({lat: lngLat.lat, long: lngLat.lng})
      }
    );
    if(response.status === 201){
      alert("Succesfully added the location");
      setSelectedLocation(await response.json())
      loadLocations();
    }else {
        alert("Failed to add location, status code = " + response.status);
    }
    setLngLat(null);
  }

  const loadLocations = async () => {
    const response = await fetch(BASE_URL + "/locations");
    const location_data = await response.json();
    setLocations(location_data)
  }

  useEffect( () => {
   loadLocations();
  }, []);
  
  return (
    <>
      <header>
        <h1>Indian River Social</h1>
        <h4>Discover and share Indian River boating hangouts</h4>
        <h6>Click on a <img className='icon' src="/island-with-two-trees-svgrepo-com.svg"/> to see activity. Double click the map to add a new location.</h6>
      </header>
      <body className='map-container'>
        <Map
          mapboxAccessToken='pk.eyJ1IjoicmVpZG9zaW5nbGV0b24iLCJhIjoiY20wMTZtcGp4MGdtYjJtcHpxY3hmbzFxZiJ9.U5bWS_-9Y23T_qCyUKaK_A'
          maxBounds={[-80.7, 27.3, -80.2, 29]}
          style={{width: mapSize[0], height: mapSize[1]}}
          mapStyle="mapbox://styles/mapbox/standard-satellite"
          onDblClick={e => {
            setMapSize(["95vw", "75vh"])
            setLngLat(e.lngLat)
          }}>
          {locations.map((coord) => (
            <Marker 
              latitude={coord.lat}
              longitude={coord.long}
              key={coord._id}>
              <button className="marker-btn" onClick={(e) => {
                e.preventDefault();
                setSelectedLocation(coord);
                setMapSize(["45vw", "75vh"]);
              }}
              >
                <img src="/island-with-two-trees-svgrepo-com.svg" alt="island icon"/>
              </button>
            </Marker>
          ))}
          {(lngLat !== null) && (
            <Popup latitude={lngLat.lat} 
              longitude={lngLat.lng}
              onClose={() => setLngLat(null)}
              className='popup'>
                <button onClick={(e) => {
                  e.preventDefault()
                  addNewLocation()
                }}>
                  Start New Location</button>
            </Popup>
          )}
        </Map>
        {selectedLocation && (
        <div className='blog-container'>
          <BlogFeed 
          location={selectedLocation} 
          setSelectedLocation={setSelectedLocation}
          setMapSize={setMapSize}
          BASE_URL={BASE_URL}/>
        </div>
        )}
      </body>
      <footer>© 2024 Reid Singleton</footer>
    </>
  )
}

export default App;