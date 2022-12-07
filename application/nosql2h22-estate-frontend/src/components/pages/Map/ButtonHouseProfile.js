import {faEye, faFilter} from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './../../../styles/Map/ButtonHouseProfile.css'




function ButtonHouseProfile(props) {
    return (
        <div className={"OffsetButtonHouseProfile"}>
            <Link to={"/map/"+props.id}>
                <FontAwesomeIcon icon={faEye} className={"ButtonHouseProfile"}/>
            </Link>
        </div>

    )
}


ButtonHouseProfile.propTypes = {
    id: PropTypes.string
}

export default ButtonHouseProfile;
