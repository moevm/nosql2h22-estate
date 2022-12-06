//React
import React, {useEffect, useState, useReducer} from 'react'

//Components
import HouseAddressList from './HouseAddressList';
import { YMaps, Map, Placemark } from "react-yandex-maps";

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
    let url = new URL('https://geocode-maps.yandex.ru/1.x/')
	  url.searchParams.append("apikey", "368ea89a-29e6-4b8a-881f-b59a7bab8369")
    url.searchParams.append("geocode", currentAddress)
    url.searchParams.append("format", "json")
    /*fetch(url)
        .then(res => res.json())
        .then( (res) => {
            //console.log(res)
            //console.log(res.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos)
            let coordArr = res.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(" ")
            setCoords({coordinates: [parseFloat(coordArr[1]), parseFloat(coordArr[0])]})
        })*/
  }

  function getMark(geometry){
    return <Placemark geometry={geometry} options={{
        preset: 'islands#circleIcon',
        iconColor: 'green',
      }}
    />
  }

  
  return(
    <div className="map-component-container">
      <div className="map-houses-list">
        <HouseAddressList handleItemClick={handleItemClick}/>
      </div>
      <div className="map-houses-map">
        <YMaps query={{ns: "use-load-option", apikey: "368ea89a-29e6-4b8a-881f-b59a7bab8369"}}>
          <Map defaultState={{ center: coords.coordinates, zoom: 11 }}  style={{height: "800px", width: "1060px"}}
          >
            {getMark(coords.coordinates)}
          </Map>  
        </YMaps>
      </div>
    </div>    
  )
}

export default MapComponent;