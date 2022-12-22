import React from 'react'
import Navbar from "../../routes/Navbar/Navbar";
import AdminProfileComponent from "./AdminProfile/AdminProfileComponent";
//import './../../styles/AdminProfile.css'

const AdminProfile = () => {

    return (
        <div>
            <div className="navbar">
                <Navbar headerText={"Профиль администратора"} descText={"Ниже представлен ваш профиль"} isAuthorized={"hidden"}/>
            </div>
            <div className="AdminProfile-component">
                <AdminProfileComponent/>
            </div>
        </div>
    );

};

export default AdminProfile;