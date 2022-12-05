//React
import React, {useEffect, useState, useReducer} from 'react'

//Components
import HouseAddressList from './HouseAddressList';
import { YMaps, Map } from "react-yandex-maps";

//Styles
import './../../../styles/Map/MapComponent.css'

function MapComponent(){

  const [currentAddress, setCurrentAddress] = useState('')
  const [coords, setCoords] = useState({coordinates: [59.942436, 30.342032]})
  const [isNewCoord, setIsNewCoord] = useState(false)

  const handleItemClick = (value) => {
    setCurrentAddress(value)
    setIsNewCoord(true)
  }

  useEffect(() => {
    if(isNewCoord){
      geocode()
      setIsNewCoord(false)
    }
  }, [isNewCoord]);

  const geocode = () => {
    console.log('geocoding')
    console.log('currentAddress:', currentAddress)

    let url = new URL('https://geocode-maps.yandex.ru/1.x/')
	  url.searchParams.append("geocode", currentAddress)
    url.searchParams.append("apikey", "368ea89a-29e6-4b8a-881f-b59a7bab8369")
    console.log(url)
    /*fetch(url)
        .then(res => res.json())
        .then( (res) => {
            console.log(res)
        });*/
    /*if(currentAddress){
      ymaps.geocode(currentAddress)
        .then(result => {
          console.log(result.geoObjects.get(0).geometry.getCoordinates())
          setCoords({ coordinates: result.geoObjects.get(0).geometry.getCoordinates() })
        })
    }*/
  }
  console.log(coords)
  
  return(
    <div className="map-component-container">
      <div className="map-houses-list">
        <HouseAddressList handleItemClick={handleItemClick}/>
      </div>
      <div className="map-houses-map">
        <YMaps query={{ns: "use-load-option", apikey: "368ea89a-29e6-4b8a-881f-b59a7bab8369"}}>
          <Map defaultState={{ center: coords.coordinates, zoom: 11 }}  style={{height: "800px", width: "1060px"}}
          />
        </YMaps>
      </div>
    </div>    
  )
}

export default MapComponent;