//React
import React from 'react'
import PropTypes from "prop-types";

//Styles
import './../../../styles/Map/HouseAddressItem.css'



const HouseAddressItem = (props) => {

  const onClick = (value) => {
    props.handleItemClick(value)
  }

  return (
    <div>
      <div className="house-address-item">
        <div onClick={() => onClick(props.address)}>
          <span className="house-address-text">
            {props.address}
          </span>
        </div>
        <div>
          e
        </div>
      </div>
    </div>  
  )
}

HouseAddressItem.propTypes = {
  address: PropTypes.string,
  handleItemClick: PropTypes.func
}

export default HouseAddressItem;