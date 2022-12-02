import React, { useState } from 'react'
//components

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

//styles
import './../../styles/Authorization.css'

const Authorization = () => {
  
  const [errorWithAuthorization, setErrorWithAuthorization] = useState(false)

  const handleAuthorizationForm = (e) => {
    e.preventDefault();

    console.log('authorization')
    setErrorWithAuthorization(!errorWithAuthorization)
  }

  function formBody() {
    console.log(errorWithAuthorization)
    if (errorWithAuthorization){
      return (
        <div className="authorization-card-form">
          <div className="authorization-card-form-header-container">
            <span className="authorization-card-form-header-text-error">
              Ключ администратора
            </span>
          </div>
          <div className="authorization-card-form-input-container">
            <input className="authorization-card-form-input-error" type="password"/>
          </div>
          <div className="authorization-card-form-err-msg-container">
            <FontAwesomeIcon icon={faExclamationTriangle} className="authoriation-card-form-icon"/>
            <span className="authorization-card-form-err-msg">
              Неверный ключ администратора
            </span>
          </div>
          <div className="authorization-div-line"></div>
          <button className="authorization-card-form-button" type="submit">
            <span className="authorization-card-form-button-text">
              Вход
            </span>
          </button>
        </div>
      ) 
    }else{
      return (
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
      )
    }
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
        { formBody() }
      </form>  
    </div>
  );

};

export default Authorization;