//React
import React from 'react'
import PropTypes from 'prop-types'

//Components
import Navbar from "../../routes/Navbar/Navbar";
import StatisticsComponent from "./Statistics/StatisticsComponent";

//Styles
//import './../../styles/Statistics.css'

const Statistics = (props) => {

    return (
        <div>
            <div className="navbar">
                <Navbar headerText={"Статистика жилищного фонда"} descText={"Ниже представлены графики со статистикой о жилых домах"} isAuthorized={props.isAuthorized}/>
            </div>
            <div className="statistics-component">
                <StatisticsComponent/>
            </div>
        </div>
    );

};

Statistics.propTypes = {
    isAuthorized: PropTypes.string,
    token: PropTypes.string
}

export default Statistics;