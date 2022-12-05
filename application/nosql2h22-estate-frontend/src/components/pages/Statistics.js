import React from 'react'
import Navbar from "../../routes/Navbar/Navbar";
import StatisticsComponent from "./Statistics/StatisticsComponent";
//import './../../styles/Statistics.css'

const Statistics = () => {

    return (
        <div>
            <div className="navbar">
                <Navbar headerText={"Статистика жилищного фонда"} descText={"Ниже представлены графики со статистикой о жилых домах"}/>
            </div>
            <div className="statistics-component">
                <StatisticsComponent/>
            </div>
        </div>
    );

};

export default Statistics;