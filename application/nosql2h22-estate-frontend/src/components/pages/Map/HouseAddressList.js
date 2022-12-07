//React
import React, {useEffect, useState, useReducer} from 'react'
import PropTypes from "prop-types"

//Components
import HouseAddressItem from './HouseAddressItem'

//Styles
import './../../../styles/Map/HouseAddressList.css'
import ButtonFilter from "../Common/ButtonFilter/ButtonFilter";
import {col_names, col_names_eng} from '../Common/data_info.js'

const HouseAddressList = (props) => {

  const dt = [
    {address: "Минская, 8/30, Красный молот"},
    {address: "Брестская, 7/30, Красный молот"},
    {address: "Люблинская, 6/30, Красный молот"},
    {address: "Варшавская, 5/30, Красный молот"},
    {address: "Брянская, 4/30, Красный молот"}
  ]

  const [addresses, setAdresses] = useState({data: [], page: 0})

  const getNewAddresses = () => {
    let url = new URL('http://127.0.0.1:1337/houses')
    url.searchParams.append("page", addresses["page"])
    fetch(url)
	        .then(res => res.json())
	        .then( ( res ) => {
              let arr = [...addresses.data, ...res.message]
              setAdresses({
                data: arr,
                page: addresses.page + 1
              });
	        });
  };

  useEffect(() => {
    getNewAddresses();
  }, []);

  function Handler(value) {

  }

  return (
    <div>
      <div className="map-filter-panel">
        <ButtonFilter columns={col_names} columnsEng={col_names_eng} Handler={Handler}/>
      </div>
      <div className="house-address-items-container">
        {
          addresses.data.map((item) => {
            return <HouseAddressItem 
              id={item._id}
              address={item.street + ', ' + item.houseNumber[0] + '/' + item.houseFractionNumber + ', ' + item.character + ', ' + item.district + ' район'} 
              handleItemClick={props.handleItemClick}
              />;
          })
        }
      </div>
    </div>
  )
}

HouseAddressList.propTypes = {
  handleItemClick: PropTypes.func
}

export default HouseAddressList;