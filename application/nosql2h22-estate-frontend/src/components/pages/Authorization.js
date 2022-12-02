import React from 'react'
//components

//styles
import './../../styles/Authorization.css'

const Authorization = () => {
  
  const handleAuthorizationForm = (e) => {
    e.preventDefault();

    console.log('authorization')

  }

  return (
    <div className="authorization-layout">

      <div className="authorization-header">
        <div className="authorization-header-text-container">
          <span className="authorization-header-text">
            Авторизация
          </span>
        </div>
      </div>

      <form className="authorization-card" onSubmit={handleAuthorizationForm}>
        <div className="authorization-card-header-container">
          <span className="authorization-card-header-text">
            Вход
          </span>
        </div>
        <div className="authorization-card-form">
          <div className="authorization-card-form-header-container">
            <span className="authorization-card-form-header-text">
              Ключ администратора
            </span>
          </div>
          <div className="authorization-card-form-input-container">
            <input className="authorization-card-form-input" type="password"/>
          </div>
          <div className="authorization-div-line"></div>
          <button className="authorization-card-form-button" type="submit">
            <span className="authorization-card-form-button-text">
              Вход
            </span>
          </button>
        </div>
      </form>  
    </div>
  );

};

export default Authorization;