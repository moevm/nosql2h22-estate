//React
import React from 'react'

//Components
import Navbar from './../../routes/Navbar/Navbar.js'
import MapComponent from './Map/MapComponent.js'

//Styles
import './../../styles/Map.css'


const Map = () => {
  
  return (
    <div>
      <div className="navbar">
        <Navbar headerText={"Карта жилищного фонда"} descText={"Ниже представлена карта с информацией о жилых домах"}/>
      </div>
      <div className="map-component">
        <MapComponent/>
      </div>
    </div>
  );

};

export default Map;