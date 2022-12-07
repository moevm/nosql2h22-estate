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
  const [filter, setFilter] = useState({})

  const getNewAddresses = () => {

    if(Object.keys(filter).length === 0) {
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
    } else {
        let url = new URL('http://127.0.0.1:1337/houses/filter')
        url.searchParams.append("page", addresses["page"])
        for (let k in filter) {
            url.searchParams.append(k, filter[k]);
        }
        fetch(url)
            .then(res => res.json())
            .then( ( res ) => {
                alert(JSON.stringify(res.message))
                let arr = [...addresses.data, ...res.message]
                setAdresses({
                    data: res.message,
                    page: addresses.page + 1
                });
            });
    }

  };

  useEffect(()=>{
      getNewAddresses()
  }, [filter])

  useEffect(() => {
    getNewAddresses();
  }, []);

  function Handler(value) {
      setFilter(value)
  }

  function DisplayAddresses(addresses) {
      return (
          <>
              <div className="house-address-items-container">
                  {
                      addresses.data.map((item) => {
                          return <HouseAddressItem
                              id={item._id}
                              street={item.street}
                              houseNumber={item.houseNumber}
                              houseFractionNumber={item.houseFractionNumber}
                              character={item.character}
                              district={item.district}
                              handleItemClick={props.handleItemClick}
                          />;
                      })
                  }
              </div>
          </>
      )
  }

  return (
    <div>
      <div className="map-filter-panel">
        <ButtonFilter columns={col_names} columnsEng={col_names_eng} Handler={Handler}/>
      </div>
        {DisplayAddresses(addresses)}
    </div>
  )
}

HouseAddressList.propTypes = {
  handleItemClick: PropTypes.func
}

export default HouseAddressList;