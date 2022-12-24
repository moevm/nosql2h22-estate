//React
import React, {useEffect, useState, useRef} from 'react'
import PropTypes from "prop-types"

//Components
import HouseAddressItem from './HouseAddressItem'

//Styles
import './../../../styles/Map/HouseAddressList.css'
import ButtonFilter from "../Common/ButtonFilter/ButtonFilter";
import {col_names, col_names_eng} from '../Common/data_info.js'

const HouseAddressList = (props) => {
  const [addresses, setAdresses] = useState({data: [], page: 1})
  const [filter, setFilter] = useState({})
  const [hasTotalCount, setHasTotalCount] = useState(false)
  const [totalRecords, setTotalRecords] = useState(0)
  const [fetching, setFetching] = useState(false)
  const [filterFirstTime, setFilterFirstTime] = useState(true)
  const [recordsAmount, setRecordsAmount] = useState(0)

  const getNewAddresses = () => {

    if(Object.keys(filter).length === 0) {
        let url = new URL('http://127.0.0.1:1337/houses')
        url.searchParams.append("page", addresses["page"])
        fetch(url)
            .then(res => res.json())
            .then( ( res ) => {
                let arr = [...addresses.data, ...res.message]
                setRecordsAmount(totalRecords)
                setAdresses({
                    data: arr,
                    page: addresses.page + 1
                })
            })
            .finally(()=>{setFetching(false)})
    } else {
        let url = new URL('http://127.0.0.1:1337/houses/filter')
        if(filterFirstTime){
            url.searchParams.append("page", 1)
        }else{
            url.searchParams.append("page", addresses["page"])
        }
        
        for (let k in filter) {
            url.searchParams.append(k, filter[k]);
        }
        fetch(url)
            .then(res => res.json())
            .then( ( res ) => {
                console.log(res)

                let arr = []
                if(filterFirstTime){
                    arr = res.message.houses
                }else{
                    arr = [...addresses.data, ...res.message.houses]
                }
                setFilterFirstTime(false)
                setAdresses({
                    data: arr,
                    page: addresses.page + 1
                })
                setRecordsAmount(res.message.count)
            })
            .finally(()=>{setFetching(false)})
    }
  };

  const getTotalCount = () => {
    let url = new URL('http://127.0.0.1:1337/houses/count')
    fetch(url)
        .then(res => res.json())
        .then( ( res ) => {
            setTotalRecords(res.message)
            setHasTotalCount(true)
            setRecordsAmount(res.message)
        });
  }

  useEffect(()=>{
      getNewAddresses()
  }, [filter])

  useEffect(()=>{
    if(fetching){
        getNewAddresses()
    }
  }, [fetching])

  useEffect(() => {
    getNewAddresses();
    const listOfAddresses = document.getElementById('list-of-addresses')
    listOfAddresses.addEventListener('scroll', scrollHandler)
    return function (){
        listOfAddresses.removeEventListener('scroll', scrollHandler)
    }

  }, []);

  useEffect(() => {
    if(!hasTotalCount){
        getTotalCount()
    }
  }, [hasTotalCount]);

  function Handler(value) {
      console.log(value)
      setFilter(value)
  }

  const scrollHandler = (e) => {
    if(e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight) < 100){
        setFetching(true)
    }
  }

  function DisplayAddresses(addresses) {
      return (
        <div className="house-address-items-container" id='list-of-addresses'>
            {
                addresses.data.map((item) => {
                    return <HouseAddressItem
                        key={item._id} 
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
      )
  }

  return (
    <div>
      <div className="map-panel">
        <div className="map-filter-panel">
            <ButtonFilter columns={col_names} columnsEng={col_names_eng} Handler={Handler}/>
        </div>
        <div>
            <span>{'Число найденных записей: ' + recordsAmount + ' шт.'}</span>
        </div>
      </div>
        {DisplayAddresses(addresses)}
    </div>
  )
}

HouseAddressList.propTypes = {
  handleItemClick: PropTypes.func
}

export default HouseAddressList;