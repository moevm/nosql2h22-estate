import React, { useState } from 'react'
import PropTypes from 'prop-types'
//components

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

//styles
import './../../styles/Authorization.css'

const Authorization = (props) => {
  
  const [errorWithAuthorization, setErrorWithAuthorization] = useState(false)
  const [adminKey, setAdminKey] = useState("")

  const handleKeyChange = (e) => {
    setAdminKey(e.target.value)
  }

  const handleAuthorizationForm = (e) => {
    e.preventDefault();

    fetch('http://localhost:1337/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({key: adminKey})
    })
	        .then(res => res.json())
	        .then( (res) => {
            if(!localStorage.getItem('isAuthorized')){
              if(res.status === "done"){
                localStorage.setItem('isAuthorized', true)
                props.setIsAuthorized(true)
                props.setToken(res.message)
                setErrorWithAuthorization(false)
                window.location.href = 'http://localhost:3000/'
              }else{
                setErrorWithAuthorization(true)
              }
            }else{
              console.log('already authorized')
              window.location.href = 'http://localhost:3000/'
            }
	        });
    setAdminKey('')     
  }

  function formBody() {
    if (errorWithAuthorization){
      return (
        <div className="authorization-card-form">
          <div className="authorization-card-form-header-container">
            <span className="authorization-card-form-header-text-error">
              Ключ администратора
            </span>
          </div>
          <div className="authorization-card-form-input-container">
            <input className="authorization-card-form-input-error" type="password" onChange={handleKeyChange} value={adminKey}/>
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
            <input className="authorization-card-form-input" type="password" onChange={handleKeyChange} value={adminKey}/>
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

Authorization.propTypes = {
  setIsAuthorized: PropTypes.func,
  setToken: PropTypes.func
}

export default Authorization;
