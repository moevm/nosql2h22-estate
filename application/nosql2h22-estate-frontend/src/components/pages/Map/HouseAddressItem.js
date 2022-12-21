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

  function MakeAddress() {
    let address = ''
    if(props.street) {
      address += props.street
    }
    address += ", "
    if(props.houseNumber) {
      if(props.houseNumber.length >= 1){
        address += props.houseNumber[0]
      }  
    }
    if(props.houseFractionNumber) {
      address += "/"
      address += props.houseFractionNumber
    }
    address += ", "
    if(props.character) {
      address += props.character
    }
    address += ", "
    if(props.district) {
      address += props.district
    }
    address += ' район'

    return address

  }

  return (
    <div>
      <div className="house-address-item">
        <div onClick={() => onClick(MakeAddress())}>
          <div className={"house-address-text-offset"}>
            <span className="house-address-text">
              {MakeAddress()}
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
  handleItemClick: PropTypes.func,
  street: PropTypes.string,
  houseNumber: PropTypes.array,
  houseFractionNumber: PropTypes.number,
  character: PropTypes.string,
  district: PropTypes.string
}

export default HouseAddressItem;