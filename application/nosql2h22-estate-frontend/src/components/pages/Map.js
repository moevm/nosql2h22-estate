//React
import React from 'react'
import PropTypes from 'prop-types'

//Components
import MapComponent from './Map/MapComponent.js'

//Styles
import './../../styles/Map.css'


const Map = (props) => {
  
  return (
    <div>
      <div className="map-component">
        <MapComponent isAuthorized={props.isAuthorized} token={props.token}/>
      </div>
    </div>
  );

};

Map.propTypes = {
  isAuthorized: PropTypes.string,
  token: PropTypes.string
}

export default Map;