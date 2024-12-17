import './App.css';
import * as React from 'react';
import Map, {Marker, Popup} from 'react-map-gl';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogFeed from './components/BlogFeed';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';

//const BASE_URL = 'https://irs-rest-service.onrender.com';
const BASE_URL = 'http://localhost:5000'

function App() {
  const [lngLat, setLngLat] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapSize, setMapSize] = useState(["75vw", "60vh"]);
  const [locations, setLocations] = useState([]);

  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);
  const [token, setToken] = useState('');
  const [userName, setUserName] = useState(null);

  const loadLocations = async () => {
    const response = await fetch(BASE_URL + "/locations");
    const location_data = await response.json();
    setLocations(location_data)
  }

  const logOut = () => {
      // Clear authentication data
      localStorage.removeItem('jwt');
      localStorage.removeItem('currentUserID');
      localStorage.removeItem('currentUserName');
      setToken(null);
      setUserName(null);
      window.location.href = '/';
  };

  useEffect( () => {
    if (localStorage.jwt){
      let storedToken = localStorage.getItem('jwt');
      let storedUserName = localStorage.getItem('currentUserName');
      setToken(storedToken);
      setUserName(storedUserName);
    }
    loadLocations();
  }, []);
  
  if (token){
    return (
      <>
        <header>
        <div class="absolute top-0 right-0 mt-4 mr-4 text-white inline-block">
          <p class="inline">Hello, {userName} | </p>
          <button class="inline px-3 py-3 h-18 rounded-full bg-black text-white text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={(e) => {
              e.preventDefault();
              logOut();}}
              >Log Out</button>
        </div>
          <h1 class="text-7xl font-extrabold text-transparent bg-cyan-200 bg-clip-text mb-6 mt-12 shadow-lg shadow-gray-900">Indian River Social</h1>
          <h4 class="text-2xl font-bold text-blue-250 mb-12">Discover and share Indian River boating hangouts</h4>
          <h6 class="text-lg text-blue-250 mb-0">Click on a <img src="/island-with-two-trees-svgrepo-com.svg" className="w-12 h-auto inline-block icon"/> to see activity. Double click the map suggest a new location.</h6>
        </header>
        <body className='map-container' class="flex justify-center mt-2">
          <div class="w-75 border-4 border-gray-300 shadow-lg">
            <Map
              class="w-40 h-96 bg-gray-200"
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
                  latitude={Number(coord.lat)}
                  longitude={Number(coord.long)}
                  key={coord._id}>
                  <button className="marker-btn" onClick={(e) => {
                    e.preventDefault();
                    setSelectedLocation(coord);
                    //setMapSize(["45vw", "75vh"]);
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
                    <p>Suggest a New Location</p>
                    <textarea
                      placeholder='Tell us about this location'
                      class="w-32 h-28 self-center">
                    </textarea>
                    <br></br>
                    <button 
                    class="self-center w-15 h-8 px-3 py-1 mb-2 bg-white text-black font-semibold rounded shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300"
                    onClick={(e) => {
                      e.preventDefault()
                      setLngLat(null)
                    }}>
                      Submit</button>
                </Popup>
              )}
              {selectedLocation && (
              <div class="absolute inset-0 z-10 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                <div className="bg-cyan-50 p-6 rounded-lg shadow-lg w-4/5 h-4/5">
                <BlogFeed 
                token={token}
                location={selectedLocation} 
                setSelectedLocation={setSelectedLocation}
                //setMapSize={setMapSize}
                BASE_URL={BASE_URL}/>
                </div>
              </div>
              )}
            </Map>
          </div>
        </body>
        <footer>© 2024 Reid Singleton</footer>
      </>
    )
  }
  else{
    return (
      <>
        <header>
          <div class="absolute top-0 right-0 mt-2 mr-4 text-white inline-block">
            <button className="log-in-btn" class="inline m-1 px-3 py-3 h-18 rounded-full bg-black text-white text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={(e) => {
              e.preventDefault();
              setShowSignUp(false);
              setShowLogIn(!showLogIn)}}>Log In</button>
              <p class="inline">|</p>
            <button className="sign-up-btn" class="inline m-1 px-3 py-3 h-18 rounded-full bg-black text-white text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={(e) => {
              e.preventDefault();
              setShowLogIn(false);
              setShowSignUp(!showSignUp)}}>Sign Up</button>
          </div>
          <h1 class="text-7xl font-bold text-blue-250 mb-4 mt-16">Indian River Social</h1>
          <h4 class="text-2xl font-bold text-blue-250 mb-12">Discover and share Indian River boating hangouts</h4>
          <h6>Log in or sign up to see what other boaters are up to on the Indian River.</h6>
        </header>
        <body className='map-container' class="flex justify-center mt-2">
          <div class="w-75 border-4 border-gray-300 shadow-lg">
            <Map
              mapboxAccessToken='pk.eyJ1IjoicmVpZG9zaW5nbGV0b24iLCJhIjoiY20wMTZtcGp4MGdtYjJtcHpxY3hmbzFxZiJ9.U5bWS_-9Y23T_qCyUKaK_A'
              maxBounds={[-80.7, 27.3, -80.2, 29]}
              style={{width: mapSize[0], height: mapSize[1]}}
              mapStyle="mapbox://styles/mapbox/standard-satellite"
            >
            {showLogIn && (
            <div class="absolute inset-0 z-10 bg-gray-900 bg-opacity-50 flex justify-center items-center">
              <LogIn
              setMapSize={setMapSize}
              setShowLogIn={setShowLogIn}
              setToken={setToken}
              BASE_URL={BASE_URL}/>
            </div>
            )}
            {showSignUp && (
            <div class="absolute inset-0 z-10 bg-gray-900 bg-opacity-50 flex justify-center items-center">
              <SignUp
              setMapSize={setMapSize}
              setShowSignUp={setShowSignUp}
              setShowLogIn={setShowLogIn}
              BASE_URL={BASE_URL}/>
            </div>
            )}
            </Map>
          </div>
        </body>
        <footer>© 2024 Reid Singleton</footer>
      </>
    )
  }
}

export default App;