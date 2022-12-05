import React, {useEffect, useState, useReducer} from 'react'
import '../../../styles/HouseProfile/HouseProfileComponent.css'
import PropTypes from "prop-types";
import {col_names, col_names_eng} from '../Common/data_info.js'


function DisplayAttribute(nameAttribute, valueAttribute) {
    return (
        <div className={"fieldAttributeHouse"}>
            <p className={"paragraph-250"}>{nameAttribute}</p>
            <div className={"rectangle-280"}>{valueAttribute}</div>
        </div>
    )
}

function DisplayAttributes() {
    return col_names.map((value, index) => {
        return (
            <>
                {DisplayAttribute(value, "123")}
            </>
        )
    })
}

function DisplayMap() {
    return (
        <div className={"fieldMap"}>

        </div>
    )
}

function HouseProfileComponent(props) {

    return (
        <div>
            <div className={"rectangle-260"}>
                {DisplayMap()}
                <div className={"fieldAttributes"}>
                    {DisplayAttributes()}
                </div>


            </div>
        </div>
    )

}


HouseProfileComponent.propTypes = {
}

export default HouseProfileComponent;
