import React from 'react'
import Navbar from "../../routes/Navbar/Navbar";
import HouseProfileComponent from "./HouseProfile/HouseProfileComponent";
//import './../../styles/HouseProfile.css'

const HouseProfile = () => {

    return (
        <div>
            <div className="navbar">
                <Navbar headerText={"Информация об объекте жилого фонда"} descText={"Ниже представлена подробная информация о выбранном объекте жилого фонда"}/>
            </div>
            <div className="HouseProfile-component">
                <HouseProfileComponent/>
            </div>
        </div>
    );

};

export default HouseProfile;