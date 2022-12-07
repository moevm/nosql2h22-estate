import React, {useEffect, useState, useReducer} from 'react'
import '../../../styles/AdminProfile/AdminProfileComponent.css'
import PropTypes from "prop-types";


function DisplayAttribute(nameAttribute, valueAttribute) {
    return (
        <div className={"fieldAttribute"}>
            <p className={"paragraph-250"}>{nameAttribute}</p>
            <div className={"rectangle-280"}>{valueAttribute}</div>
        </div>
    )
}

function AdminProfileComponent(props) {
    let [name, setName] = useState("ADMIN RSOTM")
    let [role, setRole] = useState("Администратор")

    return (
        <div>
            <div className={"rectangle-260"}>
                <p className={"paragraph-190"}> Мой профиль </p>
                {DisplayAttribute("Имя", name)}
                {DisplayAttribute("Роль", role)}

            </div>
        </div>
    )

}


AdminProfileComponent.propTypes = {
    name: PropTypes.string,
    role: PropTypes.string
}

export default AdminProfileComponent;
