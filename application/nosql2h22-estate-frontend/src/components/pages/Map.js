//React
import React from 'react'
import PropTypes from 'prop-types'

//Components
import Navbar from './../../routes/Navbar/Navbar.js'
import MapComponent from './Map/MapComponent.js'

//Styles
import './../../styles/Map.css'


const Map = (props) => {
  
  return (
    <div>
      <div className="navbar">
        <Navbar headerText={"Карта жилищного фонда"} descText={"Ниже представлена карта с информацией о жилых домах"} isAuthorized={props.isAuthorized}/>
      </div>
      <div className="map-component">
        <MapComponent/>
      </div>
    </div>
  );

};

Map.propTypes = {
  isAuthorized: PropTypes.string  
}

export default Map;