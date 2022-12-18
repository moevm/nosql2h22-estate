import React, {useEffect} from 'react'
import Navbar from "../../routes/Navbar/Navbar";
import HouseProfileComponent from "./HouseProfile/HouseProfileComponent";
import PropTypes from "prop-types";
import {useParams} from "react-router-dom";
//import './../../styles/HouseProfile.css'

const HouseProfile = (props) => {

    const {id} = useParams()

    return (
        <div>
            <div className="navbar">
                <Navbar headerText={"Информация об объекте жилого фонда"} descText={"Ниже представлена подробная информация о выбранном объекте жилого фонда"}/>
            </div>
            <div className="HouseProfile-component">
                <HouseProfileComponent id={id}/>
            </div>
        </div>
    );

};

HouseProfile.propTypes = {

}
export default HouseProfile;