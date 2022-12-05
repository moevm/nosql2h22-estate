//React
import React, {useEffect, useState, useReducer} from 'react'

//Styles
import './../../../styles/Map/MapComponent.css'

function MapComponent(){

  return(
    <div className="map-component-container">
      <div className="map-houses-list">
        Список
      </div>
      <div className="map-houses-map">
        Карта
      </div>
    </div>    
  )
}

export default MapComponent;