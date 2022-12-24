//React
import React, {useEffect, useState, useReducer} from 'react'


//Components
import HouseAddressList from './HouseAddressList';
import { YMaps, Map, Placemark } from "react-yandex-maps";

//Styles
import './../../../styles/Map/MapComponent.css'
import Navbar from "../../../routes/Navbar/Navbar";
import PropTypes from "prop-types";

function MapComponent(props){

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
    fetch(url)
        .then(res => res.json())
        .then( (res) => {
            let coordArr = res.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(" ")
            setCoords({coordinates: [parseFloat(coordArr[1]), parseFloat(coordArr[0])]})
        })
  }

  function getMark(geometry){
    return <Placemark geometry={geometry} options={{
        preset: 'islands#blueCircleDotIconWithCaption',
        iconColor: 'red',
      }}
    />
  }

  
  return(
      <div>
        <div className="map-component-container">
          <div className="map-houses-map">
            <YMaps query={{ns: "use-load-option", apikey: "368ea89a-29e6-4b8a-881f-b59a7bab8369"}}>
              <Map defaultState={{ center: coords.coordinates, zoom: 15 }}  style={{ width: "1210px", height: "970px"}}
              >
                {getMark(coords.coordinates)}
              </Map>
            </YMaps>
          </div>
          <div className="map-houses-list">
            <HouseAddressList handleItemClick={handleItemClick}/>
          </div>
        </div>
        <div id="navbarMap" className="navbar">
          <Navbar headerText={"Карта жилищного фонда"} descText={"Ниже представлена карта с информацией о жилых домах"} isAuthorized={props.isAuthorized}/>
        </div>
      </div>


  )
}

MapComponent.propTypes = {
  isAuthorized: PropTypes.string,
  token: PropTypes.string
}



export default MapComponent;