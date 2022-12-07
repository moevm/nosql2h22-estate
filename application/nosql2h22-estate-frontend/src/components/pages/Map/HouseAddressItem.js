//React
import React from 'react'
import PropTypes from "prop-types";

//Styles
import './../../../styles/Map/HouseAddressItem.css'
import ButtonHouseProfile from "./ButtonHouseProfile";



const HouseAddressItem = (props) => {

  const onClick = (value) => {
    props.handleItemClick('Санкт-Петербург, ' + value)
  }

  return (
    <div>
      <div className="house-address-item">
        <div onClick={() => onClick(props.address)}>
          <div className={"house-address-text-offset"}>
            <span className="house-address-text">
              {props.address}
            </span>
          </div>
        </div>
        <div>
          <ButtonHouseProfile id={props.id}/>
        </div>
      </div>
    </div>  
  )
}

HouseAddressItem.propTypes = {
  id: PropTypes.string,
  address: PropTypes.string,
  handleItemClick: PropTypes.func
}

export default HouseAddressItem;